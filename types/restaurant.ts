import { Step } from './menu';

export interface IRestaurant {
  id: string;
  name: string;
  email: string;
  address: string;
  phone: string;
  avatar: string;

  steps: Step[];
}
