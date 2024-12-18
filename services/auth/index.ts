import { ISignin, ISigninResponse, ISignup } from '@/types/auth';
import axiosClient from '../axiosClient';
import { IRestaurant } from '@/types/restaurant';

class AuthApi {
  static async signin(data: ISignin): Promise<ISigninResponse> {
    const response = await axiosClient.post('/auth/sign-in', data);
    return response.data.data;
  }

  static async signup(data: ISignup): Promise<IRestaurant> {
    const response = await axiosClient.post('/restaurants', data);
    return response.data.data;
  }

  static async getMe(): Promise<IRestaurant> {
    const response = await axiosClient.get('/auth/me');
    return response.data.data;
  }
}

export default AuthApi;
