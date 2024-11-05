import { login } from '@/api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loginThunk = createAsyncThunk(
  'auth/fetch_user',
  async ({ mail, password }) => {
    try {
      const response = await login(mail, password);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ message: error.message });
    }
  },
);
