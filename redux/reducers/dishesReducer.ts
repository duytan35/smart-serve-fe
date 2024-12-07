import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Dish {
  id: string; // Replace with actual keys, e.g., `name`, `price`, etc.
  name: string;
  description: string;
  price: number;
}

interface DishesState {
  dishes: Dish[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: DishesState = {
  dishes: null,
  loading: false,
  error: null,
};

const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    updateDishes: (state, action: PayloadAction<Dish[]>) => {
      state.dishes = action.payload;
    },
    removeDishes: (state) => {
      state.dishes = null;
    },
  },
});

export const { updateDishes, removeDishes } = dishesSlice.actions;

export default dishesSlice.reducer;
