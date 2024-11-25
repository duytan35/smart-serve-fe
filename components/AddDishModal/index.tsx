import React, { useState } from 'react';
import './styles.scss';
import { Button, Input, Modal, Typography, Upload, message } from 'antd';
import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { getImage, postImage } from '@/api/file';

interface AddDishModalProps {
  dishGroupData: any;
  visible: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (formDetail: any, imageIds: string[]) => void;
  onCancel: () => void;
}

type FileType = File;

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
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
  });
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUploadChange: UploadProps['onChange'] = async (info) => {
    const { file } = info;

    // Prevent duplicate uploads
    // if (file.status === 'uploading') return;

    if (!beforeUpload(file.originFileObj as FileType)) return;

    try {
      const formData = new FormData();
      formData.append('file', file.originFileObj as FileType);

      const response = await postImage({ image: formData });

      if (response.status === 201) {
        const imageId = response.data?.data?.id; // Adjust based on your API response
        const imageUrl = getImage({ imageId: imageId });
        setFileList((prevList) => [
          ...prevList,
          {
            uid: file.uid,
            name: file.name,
            status: 'done',
            url: imageUrl,
            imageId: imageId,
          },
        ]);
        message.success('Image uploaded successfully!');
      } else {
        message.error('Image upload failed.');
      }
      console.log(response);
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Image upload failed.');
    }
  };

  const handleRemoveImage = (file: UploadFile) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSubmit = async () => {
    console.log(formData);
    console.log('Uploaded Files:', fileList);
    onSubmit(
      formData,
      fileList?.map((item) => item?.imageId),
    );
  };

  return (
    <Modal
      title={'Thêm nhóm thực đơn'}
      footer={
        <Button onClick={handleSubmit} type="primary" icon={<CheckOutlined />}>
          Xác nhận
        </Button>
      }
      open={visible}
      onCancel={onCancel}
      centered
    >
      <Typography.Title level={5}>Tên món ăn</Typography.Title>
      <Input name="name" value={formData.name} onChange={handleChange} />
      <Typography.Title level={5}>Chi tiết</Typography.Title>
      <Input
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <Typography.Title level={5}>Giá</Typography.Title>
      <Input name="price" value={formData.price} onChange={handleChange} />
      <Typography.Title level={5}>Tải ảnh</Typography.Title>
      <Upload
        name="images"
        listType="picture-card"
        className="avatar-uploader"
        multiple
        customRequest={() => {}}
        onChange={handleUploadChange}
        onRemove={handleRemoveImage}
        fileList={fileList}
      >
        {uploadButton}
      </Upload>
    </Modal>
  );
};

export default AddDishModal;
