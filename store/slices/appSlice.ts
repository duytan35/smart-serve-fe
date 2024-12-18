import { IRestaurant } from '@/types/restaurant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  restaurant?: IRestaurant | null;
}

const initialState: AppState = {
  restaurant: undefined,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRestaurant(state, action: PayloadAction<IRestaurant | null>) {
      state.restaurant = action.payload;
    },
  },
});

export const { setRestaurant } = appSlice.actions;
export default appSlice.reducer;
