import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getMeThunk } from '../actions/authThunk';

interface UserState {
  user: { id: string; name: string; email: string } | null; // Adjust as needed
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserState['user']>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMeThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getMeThunk.fulfilled,
      (state, action: PayloadAction<UserState['user']>) => {
        state.loading = false;
        state.user = action.payload;
      },
    );
    builder.addCase(
      getMeThunk.rejected,
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch user';
      },
    );
  },
});

export const { updateUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
