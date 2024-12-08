import { AxiosResponse } from 'axios';
import api from './api';

export const getDishesByDishGroupId = async ({
  dishGroupId,
}: {
  dishGroupId: string;
}): Promise<AxiosResponse> => {
  try {
    const response = await api.get(`/dishes?dishGroupId=${dishGroupId}`);
    return response;
  } catch (error: any) {
    console.log('error in getDishesByDishGroupId api/dishes');
    return error;
  }
};

// export const getDishesById = async ({
//   id,
// }: {
//   id: string;
// }): Promise<AxiosResponse> => {
//   try {
//     const response = await api.get(`/dishes?dishGroupId=${dishGroupId}`);
//     return response;
//   } catch (error: any) {
//     console.log('error in getDishesByDishGroupId api/dishes');
//     return error;
//   }
// };

export const createDishes = async ({
  data,
}: {
  data: any;
}): Promise<AxiosResponse> => {
  console.log(data);

  try {
    const response = await api.post('/dishes', { ...data });
    return response;
  } catch (error: any) {
    console.log('error in createDishes api/dishes');
    return error;
  }
};

export const getDishgroup = async (): Promise<AxiosResponse> => {
  try {
    const response = await api.get('/dish-groups');
    return response;
  } catch (error: any) {
    console.log('error in getDishes api/dishes');
    return error;
  }
};

export const createDishgroup = async ({
  name,
}: {
  name: string;
}): Promise<AxiosResponse> => {
  try {
    const response = await api.post('/dish-groups', { name: name });
    return response;
  } catch (error: any) {
    console.log('error in createDishgroup api/dishes');
    return error;
  }
};

export const updateDishgroup = async ({
  id,
  name,
}: {
  id: string;
  name: string;
}): Promise<AxiosResponse> => {
  try {
    const response = await api.put(`/dish-groups/${id}`, { name: name });
    return response;
  } catch (error: any) {
    console.log('error in updateDishgroup api/dishes');
    return error;
  }
};

export const deleteDishgroup = async ({
  id,
}: {
  id: string;
}): Promise<AxiosResponse> => {
  try {
    const response = await api.delete(`/dish-groups/${id}`);
    return response;
  } catch (error: any) {
    console.log('error in deleteDishgroup api/dishes');
    return error;
  }
};
