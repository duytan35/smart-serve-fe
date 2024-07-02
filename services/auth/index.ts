import axiosClient from '../axiosClient';

const authApi = {
  signIn: async (data: any): Promise<any> => {
    const response = await axiosClient.post('auth/sign-in', data);

    return response;
  },
};

export default authApi;
