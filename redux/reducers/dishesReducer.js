import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dishes: [],
  loading: false,
  error: null,
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState: initialState,
  reducers: {
    updateDishes: (state, action) => {
      state.dishes = action.payload;
    },
    removeDishes: (state, action) => {
      state.dishes = null;
    },
  },
});

export const { updateDishes, removeDishes } = dishesSlice.actions;

export default dishesSlice.reducer;
