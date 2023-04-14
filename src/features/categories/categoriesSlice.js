import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteCategory, fetchCategories, saveCategory } from "./categoriesAPI";

const initialState = {
    categories: [],
    productsOpen: false,
    selectedCategory: -1,
    isLoading: false,
    isError: false,
    error: "",
};

export const fetchCategoriesAsync = createAsyncThunk("categories/fetchCategories", async () => {
    const categories = await fetchCategories();

    return categories;
});

export const saveCategoryAsync = createAsyncThunk("categories/saveCategory", async (categoryName) => {
    const categoryInfo = await saveCategory(categoryName);
    console.log(categoryInfo);
    return { name: categoryName, id: categoryInfo.lastInsertRowid };
});
export const deleteCategoryAsync = createAsyncThunk("categories/deleteCategory", async (categoryId) => {
    const categoryInfo = await deleteCategory(categoryId);
    console.log(categoryInfo);
    return categoryId;
});

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setProductsOpen: (state, action) => {
            if (action.payload !== undefined) {
                state.productsOpen = action.payload;
            } else {
                state.productsOpen = !state.productsOpen;
            }
        },
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesAsync.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
            })
            .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories = action.payload;
                state.isError = false;
            })
            .addCase(fetchCategoriesAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.categories = [];
                state.isError = true;
                state.error = action.error;
            })
            .addCase(saveCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.categories.push(action.payload);
                state.isError = false;
            })
            .addCase(saveCategoryAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.categories = [];
                state.isError = true;
                state.error = action.error;
            })
            .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.categories.findIndex((category) => category.id === action.payload);
                state.categories.splice(index, 1);

                state.selectedCategory = -1;
                state.isError = false;
            })
            .addCase(deleteCategoryAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.categories = [];
                state.isError = true;
                state.error = action.error;
            });
    },
});

export default categoriesSlice.reducer;
export const { setProductsOpen, setSelectedCategory } = categoriesSlice.actions;
