import { getUser, login } from '@/services/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Define the argument type for loginThunk
interface LoginArgs {
  mail: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  'auth/fetch_user',
  async ({ mail, password }: LoginArgs, thunkAPI) => {
    try {
      const response = await login(mail, password);
      return response.data?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  },
);

export const getMeThunk = createAsyncThunk(
  'auth/get_me',
  async (_, thunkAPI) => {
    try {
      const response = await getUser();
      console.log(response.data?.data);
      return response.data?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  },
);
