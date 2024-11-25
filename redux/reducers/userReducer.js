import { createSlice } from '@reduxjs/toolkit';
import { loginThunk } from '../actions/authThunk';

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      console.log(action.payload);

      localStorage.setItem('accesstoken', action.payload?.accessToken);
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.message;
    });
  },
});

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
