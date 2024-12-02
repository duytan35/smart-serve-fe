import api from './api';

export const login = async (mail: string, password: string) => {
  const data = {
    email: mail,
    password: password,
  };

  try {
    console.log(data);
    const response = await api.post('/auth/sign-in', data);
    return response;
  } catch (error: any) {
    console.log('error in login api/auth : ', error);

    return error;
  }
};

export const getUser = async () => {
  try {
    const response = await api.get('/auth/me');
    console.log(response);

    return response;
  } catch (error: any) {
    console.log('error in getUser api/auth : ', error);

    return error;
  }
};
