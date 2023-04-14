import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categories/categoriesSlice";
import modalReducer from "../features/modal/modalSlice";
import productsReducer from "../features/products/productsSlice";
import purchasesReducer from "../features/purchases/purchasesSlice";
import salesReducer from "../features/sales/salesSlice";

const store = configureStore({
    reducer: {
        products: productsReducer,
        categories: categoriesReducer,
        modal: modalReducer,
        sales: salesReducer,
        purchases: purchasesReducer,
    },
});

export default store;
