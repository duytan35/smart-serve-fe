import React, { useState } from 'react';
import './styles.scss';
import { Button, Input, Modal, Typography, Upload, Flex, message } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';

interface AddDishModalProps {
  dishGroupData: any;
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const AddDishModal: React.FC<AddDishModalProps> = ({
  visible,
  onSubmit,
  onCancel,
}) => {
  const [dishGroupName, setDishGroupName] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDishGroupName(e.target.value);
  };

  const handleChangeImage: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

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
      <Typography.Title level={5}>description</Typography.Title>
      <Input />
      <Typography.Title level={5}>giá</Typography.Title>
      <Input />
      <Typography.Title level={5}>Tải ảnh</Typography.Title>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        beforeUpload={beforeUpload}
        onChange={handleChangeImage}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </Modal>
  );
};

export default AddDishModal;
