import axiosClient from '../axiosClient';
import { ICreateDish, IDish, IDishGroup } from '@/types/dish';

class DishApi {
  static async getDishesByDishGroupId(data: {
    dishGroupId: number;
  }): Promise<IDishGroup> {
    const response = await axiosClient.get(
      `/dishes?dishGroupId=${data.dishGroupId}`,
    );
    return response.data.data;
  }

  static async createDish(data: ICreateDish): Promise<IDishGroup> {
    const response = await axiosClient.post('/dishes', data);
    return response.data.data;
  }

  static async updateDish(
    data: ICreateDish & { id: string },
  ): Promise<IDishGroup> {
    const response = await axiosClient.put(`/dishes/${data.id}`, data);
    return response.data.data;
  }

  static async removeDish(data: { id: number }): Promise<IDish> {
    const response = await axiosClient.delete(`/dishes/${data.id}`);
    return response.data.data;
  }

  static async getDishGroups(): Promise<IDishGroup[]> {
    const response = await axiosClient.get('/dish-groups');
    return response.data.data;
  }

  static async createDishGroup(data: { name: string }): Promise<IDishGroup> {
    const response = await axiosClient.post('/dish-groups', data);
    return response.data.data;
  }

  static async updateDishGroup(data: {
    id: string;
    name: string;
  }): Promise<IDishGroup> {
    const response = await axiosClient.put(`/dish-groups/${data.id}`, {
      name: data.name,
    });
    return response.data.data;
  }

  static async deleteDishGroup(data: { id: number }): Promise<IDishGroup> {
    const response = await axiosClient.delete(`/dish-groups/${data.id}`);
    return response.data.data;
  }
}

export default DishApi;
