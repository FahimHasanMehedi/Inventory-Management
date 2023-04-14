import React, { useContext, useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCategoryAsync } from "../../features/categories/categoriesSlice";
import { handleModal } from "../../features/modal/modalSlice";
import CategoryContext from "../../store/category-context";
import ModalContext from "../../store/modal-context";
import FormModal from "../UI/FormModal/FormModal";
import Input from "../UI/Input/Input";

import "./GroupForm.css";
const initialState = {
    categoryName: "",
    categoryIsValid: false,
    categoryIsTouched: false,
    categoryIsUsed: false,
};

const reducer = (currentState, action) => {
    switch (action.type) {
        case "CATEGORY_INPUT":
            return { ...currentState, categoryName: action.value, categoryIsValid: action.value.length > 0 };

        case "CATEGORY_IS_TOUCHED":
            return { ...currentState, categoryIsTouched: true };

        case "CATEGORY_IS_USED":
            return { ...currentState, categoryIsUsed: action.value };
    }
};

const GroupForm = () => {
    const [categoryFormState, dispatch] = useReducer(reducer, initialState);
    const [formIsValid, setFormIsValid] = useState(false);

    // const modalCtx = useContext(ModalContext);
    const dispatchRedux = useDispatch();

    const { categoryName, categoryIsTouched, categoryIsValid, categoryIsUsed } = categoryFormState;
    useEffect(() => {
        if (categoryFormState.categoryIsValid && !categoryFormState.categoryIsUsed) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [categoryIsUsed, categoryIsValid]);

    useEffect(() => {
        setTimeout(() => {
            window.apis.checkCategory(categoryName).then((data) => {
                if (!data) {
                    return dispatch({ type: "CATEGORY_IS_USED", value: false });
                }

                dispatch({ type: "CATEGORY_IS_USED", value: true });
            });
        }, 400);
    }, [categoryName]);

    const categoryNameChangeHandler = (e) => {
        // setCategoryName(e.target.value);
        dispatch({ type: "CATEGORY_INPUT", value: e.target.value });
    };

    const categoryNameInputBlurHandler = (e) => {
        dispatch({ type: "CATEGORY_IS_TOUCHED" });
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatchRedux(saveCategoryAsync(categoryFormState.categoryName));
        dispatchRedux(handleModal());
        
    };

    return (
        <FormModal>
            <h2 className="form-title">New Group</h2>
            <form className="new-product-form" onSubmit={formSubmitHandler}>
                <Input
                    id="name"
                    label="Name"
                    type="text"
                    onChange={categoryNameChangeHandler}
                    onBlur={categoryNameInputBlurHandler}
                    invalid={!categoryFormState.categoryIsValid && categoryFormState.categoryIsTouched}
                    value={categoryFormState.categoryName}
                    valueIsUsed={categoryFormState.categoryIsUsed}
                />

                <input className="form-button submit-button" type="submit" value="Save" disabled={formIsValid ? false : true} />
                <input type="button" className="form-button cancel-button" value="Cancel" onClick={() => dispatch(handleModal())} />
            </form>
        </FormModal>
    );
};

export default GroupForm;
