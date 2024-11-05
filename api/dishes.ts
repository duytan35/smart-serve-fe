import api from './api';

export const getDishes = async () => {
  try {
    const response = await api.get('/dish-groups');
    return response;
  } catch (error) {
    console.log('error in getDishes api/dishes');
    return error;
  }
};
