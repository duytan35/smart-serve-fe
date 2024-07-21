import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
    'auth/fetch_user',
    async () => {
        try {
            // const data = getCurrentUser()
            return data
        } catch (error) {
            return thunkAPI.rejectWithValue({ message: error.message });
        }
    }
)

const initialState = {
    user: {},
    loading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
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
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });

        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.message;
        });
    },
});

export const {
    updateUser,
    removeUser
} = userSlice.actions;

export default userSlice.reducer;
