import { UploadFile } from 'antd';

export interface CustomUploadFile extends UploadFile {
  imageId?: string;
}

export interface IFile {
  id: string;
  restaurantId: string;
  name: string;
  mineType: string;
}
