import api from './api';

export const login = async (mail, password) => {
  const data = {
    email: mail,
    password: password,
  };

  try {
    console.log(data);
    const response = await api.post('/auth/sign-in', data);
    return response;
  } catch (error) {
    // console.log('error in login api/auth : ', error);
    console.log(error?.response.data);

    return error;
  }
};
