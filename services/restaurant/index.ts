import axiosClient from '../axiosClient';
import { IRestaurant, IUpdateRestaurant } from '@/types/restaurant';

class RestaurantApi {
  static async update(data: IUpdateRestaurant): Promise<IRestaurant> {
    const response = await axiosClient.patch('/restaurants', data);
    return response.data.data;
  }
}

export default RestaurantApi;
