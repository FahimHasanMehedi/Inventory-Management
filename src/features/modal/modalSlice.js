import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    activeForm: "",
    showPrompt: false,
};

const modalSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        handleModal: (state, action) => {
            console.log('hi')
            state.showModal = !state.showModal;
        },
        setActiveForm: (state, action) => {
            state.activeForm = action.payload;
        },
        handlePrompt: (state, action) => {
            state.showPrompt = !state.showPrompt;
        },
    },
});

export default modalSlice.reducer;
export const { handleModal, setActiveForm, handlePrompt } = modalSlice.actions;
