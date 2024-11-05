import fetchApi from './api.fetch';

export const fetchDishes = async () => {
  try {
    const response = await fetchApi('/dish-groups');
    return response;
  } catch (error) {
    console.log('error in getDishes api/dishes');
    return error;
  }
};
