import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addPurchase, fetchPurchases } from "./purchasesAPI";

const initialState = {
    purchases: {},
    purchaseIds: [],

    isLoading: false,
    isError: false,
    error: "",
};

export const fetchPurchasesAsync = createAsyncThunk("purchases/fetchPurchases", async () => {
    const purchases = await fetchPurchases();
    return purchases;
});

export const addPurchaseAsync = createAsyncThunk("purchases/addPurchase", async (purchase) => {
    const data = await addPurchase(purchase);

    return data;
});

const purchasesSlice = createSlice({
    name: "purchases",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(addPurchaseAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.categories = action.payload;
                state.isError = false;
            })
            .addCase(addPurchaseAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.categories = [];
                state.isError = true;
                state.error = action.error;
            })
            .addCase(fetchPurchasesAsync.pending, (state, action) => {
                state.isLoading = false;
                state.categories = [];
                state.isError = true;
                state.error = action.error;
            })
            .addCase(fetchPurchasesAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                // let groupedPurchases ={};
                // if (action.payload.length > 0) {
                //     groupedPurchases = action.payload?.reduce((acc, obj) => {
                //         if (!acc[obj.id]) {
                //             acc[obj.id] = { purchases: [] };
                //             acc[obj.id].supplier = obj.supplier;
                //             acc[obj.id].totalAmount = obj.totalAmount;
                //             acc[obj.id].purchaseDate = obj.purchaseDate;
                //         }
                //         acc[obj.id].purchases.push({
                //             productCode: obj.productCode,
                //             productName: obj.productName,
                //             quantity: obj.quantity,
                //         });

                //         return acc;
                //     });
                // }
                // console.log(groupedPurchases)
                console.log(action.payload);
                const purchaseIds = [];
                let purchases = {};

                action.payload.forEach((item, idx) => {
                    let value = purchases[item?.id];
                    console.log(value);
                    if (!value) {
                        purchases = {
                            ...purchases,
                            [item.id]: [],
                        };
                    }
                    purchases[item?.id].push(item);
                    console.log(purchases);

                    if (purchaseIds?.[purchaseIds.length - 1] !== item?.id) {
                        purchaseIds.push(item?.id);
                    }
                });
                state.purchases = purchases;
                state.purchaseIds = purchaseIds;
                state.isError = true;
                state.error = action.error;
            })
            .addCase(fetchPurchasesAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.categories = [];
                state.isError = true;
                state.error = action.error;
            });
    },
});

export default purchasesSlice.reducer;
export const {} = purchasesSlice.actions;
