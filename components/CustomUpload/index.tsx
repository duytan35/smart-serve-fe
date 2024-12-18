import FileApi from '@/services/files';
import { CustomUploadFile } from '@/types/file';
import { getImage } from '@/utils';
import { PlusOutlined } from '@ant-design/icons';
import { message, Upload, UploadProps } from 'antd';
import { useState } from 'react';

const beforeUpload = (file: File) => {
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isLt2M;
};

interface CustomUploadProps {
  fileList: CustomUploadFile[];
  setFileList: React.Dispatch<React.SetStateAction<CustomUploadFile[]>>;
  maxCount?: number;
}

const CustomUpload = ({
  fileList,
  setFileList,
  maxCount,
}: CustomUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUploadChange: UploadProps['onChange'] = async (info) => {
    const { file } = info;

    if (!beforeUpload(file.originFileObj as File)) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('file', file.originFileObj as File);

      const fileResponse = await FileApi.upload({ image: formData });
      const imageId = fileResponse?.id;
      const imageUrl = getImage(imageId);

      setFileList((prevList) => {
        const updatedList = [...prevList];
        if (maxCount && updatedList.length >= maxCount) {
          updatedList.shift();
        }

        updatedList.push({
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: imageUrl,
          imageId: imageId,
        } as CustomUploadFile);
        return updatedList;
      });

      setIsUploading(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Image upload failed.');
      setIsUploading(false);
    }
  };

  const handleRemoveImage = (file: CustomUploadFile) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
  };

  return (
    <Upload
      name="images"
      listType="picture-card"
      className="avatar-uploader"
      multiple
      customRequest={() => {}}
      onChange={handleUploadChange}
      onRemove={handleRemoveImage}
      fileList={fileList}
      accept="image/*"
    >
      <button style={{ border: 0, background: 'none' }} type="button">
        {isUploading ? (
          'Uploading...'
        ) : (
          <>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </>
        )}
      </button>
    </Upload>
  );
};

export default CustomUpload;
