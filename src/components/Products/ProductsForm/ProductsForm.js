import React, { useContext, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductsOpen, setSelectedCategory } from "../../../features/categories/categoriesSlice";
import { handleModal } from "../../../features/modal/modalSlice";
import { addProduct, saveProductAsync } from "../../../features/products/productsSlice";
import CategoryContext from "../../../store/category-context";
import ModalContext from "../../../store/modal-context";
import ProductContext from "../../../store/product-context";
import DropdownCategory from "../../UI/DropdownCategory/DropdownCategory";

import FormModal from "../../UI/FormModal/FormModal";
import Input from "../../UI/Input/Input";

import "./ProductsForm.css";
const initialState = {
    name: "",
    nameIsValid: false,
    nameIsTouched: false,
    nameIsUsed: false,
    code: "",
    codeIsValid: false,
    codeIsTouched: false,
    codeIsUsed: false,
    category: {},
    categoryIsValid: false,
};

const reducer = (currentState, action) => {
    switch (action.type) {
        case "NAME_INPUT":
            return { ...currentState, name: action.value, nameIsValid: action.value.length > 0 };
        case "NAME_IS_TOUCHED":
            return { ...currentState, nameIsTouched: true };
        case "NAME_IS_USED":
            return { ...currentState, nameIsUsed: action.value };
        case "CODE_INPUT":
            return { ...currentState, code: action.value, codeIsValid: action.value.length > 0 };
        case "CODE_IS_TOUCHED":
            return { ...currentState, codeIsTouched: true };
        case "CODE_IS_USED":
            return { ...currentState, codeIsUsed: action.value };
        case "CATEGORY_INPUT":
            return { ...currentState, category: action.value, categoryIsValid: action.value ? true : false };
    }
};

const ProductsForm = (props) => {
    const dispatchRedux = useDispatch();
    const [formState, dispatch] = useReducer(reducer, initialState);
    const [formIsValid, setFormIsValid] = useState(false);

    // const categoryCtx = useContext(CategoryContext);
    const { categories } = useSelector((state) => state.categories);
    // const modalCtx = useContext(ModalContext);
    // const productCtx = useContext(ProductContext);

    const { name, code, category, nameIsValid, codeIsValid, categoryIsValid, nameIsUsed, codeIsUsed } = formState;

    //useEffect hooks
    //hook to set validity of the form
    useEffect(() => {
        if (nameIsValid && codeIsValid && categoryIsValid && !formState.nameIsUsed && !formState.codeIsUsed) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [nameIsValid, codeIsValid, categoryIsValid, nameIsUsed, codeIsUsed]);

    //hook to check validity of name
    //Check the database if name already exists in the database
    useEffect(() => {
        const identifier = setTimeout(() => {
            window.apis.checkName(formState.name).then((data) => {
                if (!data) {
                    return dispatch({ type: "NAME_IS_USED", value: false });
                }

                dispatch({ type: "NAME_IS_USED", value: true });
            });
        }, 400);

        return () => {
            clearTimeout(identifier);
        };
    }, [name]);

    //Check the database if code already exists in the database
    useEffect(() => {
        const identifier = setTimeout(() => {
            window.apis.checkCode(formState.code).then((data) => {
                if (!data) {
                    return dispatch({ type: "CODE_IS_USED", value: false });
                }

                dispatch({ type: "CODE_IS_USED", value: true });
            });
        }, 400);

        return () => {
            clearTimeout(identifier);
        };
    }, [code]);

    //Event Handlers
    //Listen to the input fields changes
    const nameChangeHandler = (e) => {
        dispatch({ type: "NAME_INPUT", value: e.target.value });
    };
    const codeChangeHandler = (e) => {
        dispatch({ type: "CODE_INPUT", value: e.target.value });
    };

    const categorySelectHandler = (selectedCategory) => {
        dispatch({ type: "CATEGORY_INPUT", value: selectedCategory });
    };

    //Listens to the events of changing focus from the input fields
    const nameInputBlurHandler = (e) => {
        dispatch({ type: "NAME_IS_TOUCHED" });
        dispatch({ type: "NAME_INPUT", value: e.target.value });
    };
    const codeInputBlurHandler = (e) => {
        dispatch({ type: "CODE_IS_TOUCHED" });
        dispatch({ type: "CODE_INPUT", value: e.target.value });
    };
    const formSubmitHandler = async (e) => {
        e.preventDefault();

        //Uses saveProduct() api from preload scripts
        const product = {
            productName: formState.name,
            productCode: formState.code,
            categoryId: formState.category.id,
        };

        dispatchRedux(saveProductAsync(product)).then((data) => { 
            dispatchRedux(addProduct({ ...product, categoryName: formState.category.name, productStock: 0 }));

            console.log(formState.category.id)
            dispatchRedux(setSelectedCategory(formState.category.id));

            dispatchRedux(handleModal())

            dispatchRedux(setProductsOpen(true))

            dispatch({ type: "NAME_INPUT", value: "" });
            dispatch({ type: "CODE_INPUT", value: "" });
        });
    };

    return (
        <FormModal>
            <h2 className="form-title">New Product</h2>
            <form className="new-product-form" onSubmit={formSubmitHandler}>
                <Input
                    id="name"
                    label="Name"
                    type="text"
                    onChange={nameChangeHandler}
                    onBlur={nameInputBlurHandler}
                    value={formState.name}
                    invalid={!formState.nameIsValid && formState.nameIsTouched}
                    valueIsUsed={formState.nameIsUsed}
                />
                <Input
                    id="code"
                    label="Code"
                    type="text"
                    onChange={codeChangeHandler}
                    onBlur={codeInputBlurHandler}
                    value={formState.code}
                    invalid={!formState.codeIsValid && formState.codeIsTouched}
                    valueIsUsed={formState.codeIsUsed}
                />
                <DropdownCategory
                    options={categories}
                    label="Group"
                    onCategorySelect={categorySelectHandler}
                    value={formState.category.name}
                />
                <input className="form-button submit-button" type="submit" value="Save" disabled={formIsValid ? false : true} />
                <input type="button" className="form-button cancel-button" value="Cancel" onClick={() => dispatch(handleModal())} />
            </form>
        </FormModal>
    );
};

export default ProductsForm;
