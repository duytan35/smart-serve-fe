import { IRestaurant } from './restaurant';

export interface ISignin {
  email: string;
  password: string;
}

export interface ISignup {
  email: string;
  address: string;
  password: string;
  name: string;
  phone: string;
}

export interface ISigninResponse extends IRestaurant {
  accessToken: string;
}
