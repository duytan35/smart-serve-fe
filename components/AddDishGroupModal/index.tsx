import React, { useState } from 'react';
import './styles.scss';
import { Button, Input, Modal, Typography, Upload } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

interface AddDishGroupModalProps {
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const AddDishGroupModal: React.FC<AddDishGroupModalProps> = ({
  visible,
  onSubmit,
  onCancel,
}) => {
  const [dishGroupName, setDishGroupName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDishGroupName(e.target.value);
  };

  const hanldeSudmit = async () => {
    console.log(dishGroupName);
    onSubmit();
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
      <Typography.Title level={5}>Tên món ăn</Typography.Title>
      <Input value={dishGroupName} onChange={handleChange} />
    </Modal>
  );
};

export default AddDishGroupModal;
