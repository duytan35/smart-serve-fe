import React, { useState } from 'react';
import './styles.scss';
import { Button, Input, Modal, Row, Select, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

interface RemoveOrderModalProps {
  orderItemDetail: any;
  visible: boolean;
  onSubmit: (value: any) => any;
  onCancel: () => void;
}

const RemoveOrderModal: React.FC<RemoveOrderModalProps> = ({
  // orderItemDetail,
  visible,
  onSubmit,
  onCancel,
}) => {
  const [selectRejectReason, setSelectRejectReason] = useState('default');
  const [rejectReason, setRejectReason] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRejectReason(e.target.value);
  };

  const handleSelect = (value: string) => {
    setSelectRejectReason(value);
  };

  const hanldeSudmit = async () => {
    onSubmit(
      selectRejectReason !== 'custom' ? selectRejectReason : rejectReason,
    );
  };

  return (
    <Modal
      title={'Thêm nhóm thực đơn'}
      footer={
        <Button
          onClick={hanldeSudmit}
          type="primary"
          icon={<CheckOutlined />}
          iconPosition={'end'}
        >
          Xác nhận
        </Button>
      }
      open={visible}
      onCancel={onCancel}
      centered
    >
      <Typography.Title level={5}>Chọn lý do từ chôi</Typography.Title>
      {visible && (
        <Row>
          <Select onChange={handleSelect} defaultValue={'Chọn lý do từ chối'}>
            <Select.Option value="outOfMeterial">Hết nguyên liệu</Select.Option>
            <Select.Option value="custom">Khác</Select.Option>
          </Select>
        </Row>
      )}
      {selectRejectReason === 'custom' && (
        <>
          <Typography.Title level={5}>Lý do từ chối</Typography.Title>
          <Input value={rejectReason} onChange={handleChange} />
        </>
      )}
    </Modal>
  );
};

export default RemoveOrderModal;
