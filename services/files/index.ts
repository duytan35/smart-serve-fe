import axiosClient from '../axiosClient';
import { IFile } from '@/types/file';

class FileApi {
  static async upload({ image }: { image: FormData }): Promise<IFile> {
    try {
      const response = await axiosClient.post('/files', image, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
      });
      return response.data.data;
    } catch (error: any) {
      console.error('Error in postImage API:', error);
      throw error;
    }
  }
}

export default FileApi;
