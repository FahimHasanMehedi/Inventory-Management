import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addSale } from "./salesAPI";

const initialState = {
    sales: [],

    isLoading: false,
    isError: false,
    error: "",
};

export const addSaleAsync = createAsyncThunk("sales/addSale", async (sale) => {
    const data = await addSale(sale);

    return data;
});

const salesSlice = createSlice({
    name: "sales",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(addSaleAsync.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(addSaleAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.categories = action.payload;
                state.isError = false;
            })
            .addCase(addSaleAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.categories = [];
                state.isError = true;
                state.error = action.error;
            });
    },
});

export default salesSlice.reducer;
export const {} = salesSlice.actions;
