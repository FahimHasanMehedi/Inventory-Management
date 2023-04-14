import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, saveProduct } from "./productsAPI";

const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    error: "",
};

export const fetchProductsAsync = createAsyncThunk("products/fetchProducts", async (selectedCategoryId) => {
    const products = await fetchProducts(selectedCategoryId);

    return products;
});
export const saveProductAsync = createAsyncThunk("products/saveProduct", async (product) => {
    const productInfo = await saveProduct(product);

    return product;
});

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductsAsync.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchProductsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
                state.isError = false;
            })
            .addCase(fetchProductsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.products = [];
                state.isError = true;
                state.error = action.error;
            })
            .addCase(saveProductAsync.fulfilled, (state, action) => {
                console.log(action.payload);
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(saveProductAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.products = [];
                state.isError = true;
                state.error = action.error;
            });
    },
});

export default productsSlice.reducer;
export const { addProduct } = productsSlice.actions;
