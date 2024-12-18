'use client';

import './index.scss';
import TableApi from '@/services/tables';
import WithAuth from '@/components/WithAuth';
import {
  PlusOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Table,
  Modal,
  Form,
  Input,
  InputNumber,
  notification,
} from 'antd';
import { Download, Trash } from 'lucide-react';
import useSWR, { mutate } from 'swr';
import { Loading } from '@/components/Loading';
import QRCode from 'react-qr-code';
import { useState } from 'react';
import { ITable } from '@/types/table';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { IRestaurant } from '@/types/restaurant';
import useSWRMutation from 'swr/mutation';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { generateUrlQRcode } from '@/utils';

const { confirm } = Modal;

const Tables = () => {
  const restaurant = useSelector(
    (state: RootState) => state.app.restaurant as IRestaurant,
  );
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTable, setEditingTable] = useState<ITable>();
  const [isDownloadingAllQRcodes, setIsDownloadingAllQRcodes] = useState(false);

  const { data: tables = [], isLoading } = useSWR('tables', TableApi.getTables);

  const { trigger: triggerCreateTable } = useSWRMutation(
    'create-table',
    async (
      _: string,
      {
        arg,
      }: {
        arg: {
          name: string;
          seats?: number;
        };
      },
    ) => TableApi.createTable(arg),
    {
      onSuccess: () => {
        notification.success({
          message: 'Create table successfully!',
        });
        mutate('tables');
        form.resetFields();
        setIsModalVisible(false);
      },
      onError: (error) => {
        console.error('Error create table:', error);
        notification.error({
          message: 'Create table failed!',
        });
      },
    },
  );

  const { trigger: triggerUpdateTable } = useSWRMutation(
    'update-table',
    async (
      _: string,
      {
        arg,
      }: {
        arg: {
          id: number;
          name: string;
          seats?: number;
        };
      },
    ) => TableApi.updateTable(arg),
    {
      onSuccess: () => {
        notification.success({
          message: 'Update table successfully!',
        });
        mutate('tables');
        setIsModalVisible(false);
        setEditingTable(undefined);
        form.resetFields();
      },
      onError: (error) => {
        console.error('Error update table:', error);
        notification.error({
          message: 'Update table failed!',
        });
      },
    },
  );

  const { trigger: triggerRemoveTable, isMutating: isRemoving } =
    useSWRMutation(
      'remove-table',
      async (
        _: string,
        {
          arg,
        }: {
          arg: {
            id: number;
          };
        },
      ) => TableApi.removeTable(arg),
      {
        onSuccess: () => {
          notification.success({
            message: 'Remove table successfully!',
          });
          mutate('tables');
        },
        onError: (error) => {
          console.error('Error remove table:', error);
          notification.error({
            message: 'Remove table failed!',
          });
        },
      },
    );

  if (isLoading) {
    return <Loading />;
  }

  const handleEdit = (record: ITable) => {
    setEditingTable(record);
    form.setFieldsValue({
      name: record.name,
      seats: record.seats,
    });
    setIsModalVisible(true);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (editingTable) {
      triggerUpdateTable({
        id: editingTable.id,
        ...values,
      });
    } else {
      triggerCreateTable(values);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Seats',
      dataIndex: 'seats',
      key: 'seats',
    },
    {
      title: 'QR Code',
      dataIndex: 'id',
      key: 'qrCode',
      render: (id: number) => (
        <div id={`qr-code-${id}`} className="qr-code">
          <QRCode
            value={`${process.env.NEXT_PUBLIC_ORIGIN_URL}/restaurants/${restaurant.id}?tableId=${id.toString()}`}
            size={50}
          />
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 300,
      render: (_: any, record: ITable) => (
        <div className="actions">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<Download width={16} height={16} />}
            onClick={() => downloadQRCode(record.id, record.name)}
          >
            Download QR code
          </Button>
          <Button
            icon={<Trash width={16} height={16} />}
            color="danger"
            variant="outlined"
            onClick={() => {
              handleRemoveTable(record.id);
            }}
          >
            Remove
          </Button>
        </div>
      ),
    },
  ];

  const handleRemoveTable = (id: number) => {
    confirm({
      title: 'Are you sure you want to remove this table?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: isRemoving ? 'Removing...' : 'Remove',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => triggerRemoveTable({ id }),
    });
  };

  const downloadURI = (uri: string, filename: string) => {
    const link = document.createElement('a');
    link.href = uri;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadQRCode = async (id: number, name: string) => {
    const url = await generateUrlQRcode(id);
    if (url) {
      downloadURI(url, name);
    }
  };

  const downloadAllQRCodes = async () => {
    const zip = new JSZip();
    const folder = zip.folder('QR-Codes');

    for (const table of tables) {
      const url = await generateUrlQRcode(table.id);
      if (!url) {
        continue;
      }

      const response = await fetch(url);
      const blob = await response.blob();
      folder?.file(`${table.name}.png`, blob);
    }

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'QR-Codes.zip');
    });

    setIsDownloadingAllQRcodes(false);
  };

  return (
    <div className="table-container">
      <div className="header">
        <div className="title">Tables</div>
        <div className="group-button">
          <Button
            color="primary"
            icon={<Download width={16} height={16} />}
            variant="outlined"
            onClick={() => {
              downloadAllQRCodes();
              setIsDownloadingAllQRcodes(true);
            }}
            loading={isDownloadingAllQRcodes}
          >
            Download all QR codes
          </Button>
          <Button
            color="primary"
            icon={<PlusOutlined />}
            variant="outlined"
            onClick={() => {
              setIsModalVisible(true);
            }}
          >
            Add table
          </Button>
        </div>
      </div>
      <div className="table">
        <Table
          dataSource={tables}
          columns={columns}
          pagination={false}
          rowKey="id"
        />
      </div>

      <Modal
        title="Edit Table"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTable(undefined);
          form.resetFields();
        }}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              { required: true, message: 'Please input the table name!' },
            ]}
          >
            <Input placeholder="Table name" />
          </Form.Item>
          <Form.Item name="seats" label="Seats">
            <InputNumber
              placeholder="Number of seats"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default WithAuth(Tables);
