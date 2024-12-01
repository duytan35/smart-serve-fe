import { AxiosResponse } from 'axios';
import api from './api';
const url = process.env.NEXT_PUBLIC_API_URL;

export const getImage = (imageId: string) => {
  return url + '/files/' + imageId;
};

export const postImage = async ({
  image,
}: {
  image: FormData;
}): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/files', image, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
      },
    });
    return response;
  } catch (error: any) {
    console.error('Error in postImage API:', error);
    throw error;
  }
};
