import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal, notification } from 'antd';
import type { UploadFile } from 'antd';
import CustomUpload from '@/components/CustomUpload';
import useSWRMutation from 'swr/mutation';
import DishApi from '@/services/dishes/index';
import { mutate } from 'swr';
import { ICreateDish, IDish } from '@/types/dish';
import { getImage } from '@/utils';

interface CustomUploadFile extends UploadFile {
  imageId?: string;
}

interface DishModalProps {
  dishGroupId: number;
  visible: boolean;
  onCancel: () => void;
  initialValues?: IDish;
}

const DishModal = ({
  dishGroupId,
  visible,
  onCancel,
  initialValues,
}: DishModalProps) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<CustomUploadFile[]>([]);

  useEffect(() => {
    setFileList(
      initialValues
        ? (initialValues?.imageIds.map((imageId) => ({
            uid: imageId,
            name: 'image',
            status: 'done',
            url: getImage(imageId),
            imageId,
          })) as CustomUploadFile[])
        : [],
    );
    form.setFieldsValue(initialValues);
  }, [form, initialValues]);

  const { trigger: triggerCreateDish, isMutating: isCreating } = useSWRMutation(
    'create-dish-group',
    async (
      _: string,
      {
        arg,
      }: {
        arg: ICreateDish;
      },
    ) => DishApi.createDish(arg),
    {
      onSuccess: () => {
        notification.success({
          message: 'Create dish successfully!',
        });
        setFileList([]);
        mutate('dish-groups');
        form.resetFields();
        onCancel();
      },
      onError: (error) => {
        console.error('Error create dish:', error);
        notification.error({
          message: 'Create dish failed!',
        });
      },
    },
  );

  const { trigger: triggerUpdateDish, isMutating: isUpdating } = useSWRMutation(
    'update-dish-group',
    async (
      _: string,
      {
        arg,
      }: {
        arg: IDish & { id: string };
      },
    ) => DishApi.updateDish(arg),
    {
      onSuccess: () => {
        notification.success({
          message: 'Update dish successfully!',
        });
        setFileList([]);
        mutate('dish-groups');
        form.resetFields();
        onCancel();
      },
      onError: (error) => {
        console.error('Error update dish:', error);
        notification.error({
          message: 'Update dish failed!',
        });
      },
    },
  );

  const { trigger: triggerRemoveDish, isMutating: isRemoving } = useSWRMutation(
    'remove-dish-group',
    async (
      _: string,
      {
        arg,
      }: {
        arg: { id: number };
      },
    ) => DishApi.removeDish(arg),
    {
      onSuccess: () => {
        notification.success({
          message: 'Remove dish successfully!',
        });
        mutate('dish-groups');
        form.resetFields();
        onCancel();
      },
      onError: (error) => {
        console.error('Error remove dish:', error);
        notification.error({
          message: 'Remove dish failed!',
        });
      },
    },
  );

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        ...values,
        dishGroupId: String(dishGroupId),
        price: Number(values.price),
        imageIds: fileList.map((file) => file.imageId),
      };

      if (initialValues) {
        triggerUpdateDish({ ...data, id: String(initialValues.id) });
      } else {
        triggerCreateDish(data);
      }
    } catch (error) {
      console.error('Validation Failed:', error);
    }
  };

  return (
    <Modal
      title={`${initialValues ? 'Update' : 'Add'} dish`}
      footer={
        <div className="footer-buttons">
          <Button
            onClick={() => {
              triggerRemoveDish({ id: Number(initialValues?.id) });
            }}
            type="primary"
            danger
            loading={isRemoving}
          >
            Remove
          </Button>
          <Button
            onClick={handleSubmit}
            type="primary"
            loading={isCreating || isUpdating}
          >
            Confirm
          </Button>
        </div>
      }
      open={visible}
      onCancel={() => {
        setFileList([]);
        form.resetFields();
        onCancel();
      }}
      centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter dish name!' }]}
        >
          <Input placeholder="Enter name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter description" rows={2} />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: 'Please enter price with only numbers!',
            },
          ]}
        >
          <Input type="number" placeholder="Enter price" />
        </Form.Item>
        <Form.Item
          label="Images"
          name="imageIds"
          rules={[
            {
              validator: () =>
                fileList.length > 0
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error('Please upload at least 1 image!'),
                    ),
            },
          ]}
        >
          <CustomUpload fileList={fileList} setFileList={setFileList} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DishModal;
