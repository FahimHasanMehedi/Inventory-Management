import React, { useContext, useReducer, useState, useEffect } from "react";
import FormModal from "../UI/FormModal/FormModal";
import Input from "../UI/Input/Input";
import DropdownProducts from "../UI/DropdownProducts/DropdownProducts";
import ModalContext from "../../store/modal-context";
import ProductContext from "../../store/product-context";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import "./SalesForm.css";
import { useDispatch, useSelector } from "react-redux";
import { handleModal } from "../../features/modal/modalSlice";
import { addSaleAsync } from "../../features/sales/salesSlice";
import { fetchProductsAsync } from "../../features/products/productsSlice";
import { setProductsOpen, setSelectedCategory } from "../../features/categories/categoriesSlice";

const initialState = {
    customer: "",
    customerIsValid: false,
    customerIsTouched: false,
    allSelectedProducts: [],
    productIsListed: false,
    selectedProduct: {},
    selectedQuantity: 0,
    date: "",
    dateIsValid: false,
    totalAmount: -1,
    amountIsValid: false,
    amountIsTouched: false,
};

const reducer = (currentState, action) => {
    switch (action.type) {
        case "CUSTOMER_INPUT":
            return { ...currentState, customer: action.value, customerIsValid: action.value.length > 0 ? true : false };

        case "CUSTOMER_IS_TOUCHED":
            return { ...currentState, customerIsTouched: true };

        case "PRODUCT_SELECT":
            return { ...currentState, selectedProduct: action.value };

        case "QUANTITY_INPUT":
            return { ...currentState, selectedQuantity: action.value };

        case "ADD_TO_ALL_PRODUCTS":
            let found = false;
            const copiedArray = currentState.allSelectedProducts.map((product) => {
                if (product.productCode === currentState.selectedProduct.productCode) {
                    found = true;
                    return {
                        ...product,
                        quantity: currentState.selectedQuantity + product.quantity,
                    };
                }
                return { ...product };
            });

            if (!found) {
                copiedArray.push({ ...currentState.selectedProduct, quantity: currentState.selectedQuantity });
            }

            return {
                ...currentState,
                productIsListed: true,
                allSelectedProducts: copiedArray,
            };

        case "REMOVE_FROM_ALL_PRODUCTS":
            return {
                ...currentState,
                productIsListed: currentState.length <= 1 ? false : true,
                allSelectedProducts: currentState.allSelectedProducts.filter((item, index) => index !== action.value),
            };

        case "DATE_INPUT":
            return { ...currentState, date: action.value, dateIsValid: action.value ? true : false };

        case "AMOUNT_INPUT":
            return { ...currentState, totalAmount: action.value, amountIsValid: action.value > 0 ? true : false };

        case "AMOUNT_IS_TOUCHED":
            return { ...currentState, amountIsTouched: true };

        default:
            return { ...currentState };
    }
};

const SalesForm = () => {
    const [salesFormState, dispatch] = useReducer(reducer, initialState);
    const [formIsValid, setFormIsValid] = useState(false);

    const { products } = useSelector((state) => state.products);

    const dispatchRedux = useDispatch();

    //destructures the essential values from the reducer
    const { customerIsValid, dateIsValid, productIsListed, amountIsValid } = salesFormState;

    //useEffect hook to set the form validity
    useEffect(() => {
        if (customerIsValid && dateIsValid && productIsListed && amountIsValid) {
            setFormIsValid(true);
        } else {
            setFormIsValid(false);
        }
    }, [customerIsValid, dateIsValid, productIsListed, amountIsValid]);

    //Event handlers for listening to the input fields changes
    const customerChangeHandler = (e) => {
        dispatch({
            type: "CUSTOMER_INPUT",
            value: e.target.value,
        });
    };
    const dateChangeHandler = (e) => {
        dispatch({
            type: "DATE_INPUT",
            value: e.target.value,
        });
    };

    const amountChangeHandler = (e) => {
        dispatch({
            type: "AMOUNT_INPUT",
            value: parseInt(e.target.value),
        });
    };

    //Event handlers for selecting products, products quantity and add them to the list
    const productSelectHandler = (selectedProduct) => {
        console.log(selectedProduct);
        dispatch({ type: "PRODUCT_SELECT", value: selectedProduct });
    };

    const quantChangeHandler = (e) => {
        let value;
        if (!e.target.value) {
            value = "";
        } else {
            value = parseInt(e.target.value);
        }
        dispatch({ type: "QUANTITY_INPUT", value });
    };

    const buttonClickHandler = (e) => {
        e.preventDefault();
        dispatch({ type: "ADD_TO_ALL_PRODUCTS" });
    };
    //Event handler for removing item from the list
    const removeSelectedProductHandler = (e) => {
        e.preventDefault();
        const id = parseInt(e.currentTarget.getAttribute("id"));
        console.log(id);
        dispatch({ type: "REMOVE_FROM_ALL_PRODUCTS", value: id });
    };

    //Event handlers for when input field lose focuses
    const customerBlurHandler = () => {
        dispatch({
            type: "CUSTOMER_IS_TOUCHED",
        });
    };

    const amountBlurHandler = () => {
        dispatch({
            type: "AMOUNT_IS_TOUCHED",
        });
    };

    //Handles the form submit
    const formSubmitHandler = (e) => {
        e.preventDefault();

        //Object contains info about purchase
        const sale = {
            allSelectedProducts: salesFormState.allSelectedProducts,
            customer: salesFormState.customer,
            date: salesFormState.date,
            totalAmount: salesFormState.totalAmount,
        };

        //Uses the addPurchase() api from preload scripts
        dispatchRedux(addSaleAsync(sale));
        dispatchRedux(setSelectedCategory(-1));
        dispatchRedux(setProductsOpen(true));
        dispatchRedux(fetchProductsAsync(-1));

        //closes the modal
        dispatchRedux(handleModal());
    };

    //Maps the all selected products to an jsx array
    //Later it is rendered in the UI
    const allSelectedProducts = salesFormState.allSelectedProducts.map((product, index) => (
        <div key={index} className="selected-product">
            <div className="selected-product-data">
                <span>{product.productName}</span>,<span>{product.quantity}</span>
            </div>
            <button className="remove-selected-product-button" id={index} onClick={removeSelectedProductHandler}>
                <CloseOutlinedIcon style={{ fontSize: "20px" }} />
            </button>
        </div>
    ));
    return (
        <FormModal>
            <h2 className="form-title">New Sale</h2>
            <form className="new-product-form" onSubmit={formSubmitHandler}>
                <Input
                    id="customer-name"
                    label="Customer name"
                    type="text"
                    value={salesFormState.customer}
                    onChange={customerChangeHandler}
                    onBlur={customerBlurHandler}
                    invalid={!salesFormState.customerIsValid && salesFormState.customerIsTouched}
                />
                <div>
                    <label className="dropdown-label">Products</label>

                    <DropdownProducts
                        label="Products"
                        options={products}
                        onProductSelect={productSelectHandler}
                        value={salesFormState.selectedProduct.productName}
                        onButtonClick={buttonClickHandler}
                        onQuantChange={quantChangeHandler}
                        quantityValue={salesFormState.selectedQuantity}
                    />
                    {salesFormState.allSelectedProducts.length > 0 && (
                        <div className="selected-products-container">{allSelectedProducts}</div>
                    )}
                </div>

                <Input id="purchase-date" label="Date" type="date" onChange={dateChangeHandler} />
                <Input
                    id="total-amount"
                    label="Total amount"
                    type="number"
                    value={salesFormState.totalAmount === -1 ? "" : salesFormState.totalAmount}
                    onChange={amountChangeHandler}
                    onBlur={amountBlurHandler}
                    invalid={!salesFormState.amountIsValid && salesFormState.amountIsTouched}
                />

                <input className="form-button submit-button" type="submit" value="Save" disabled={formIsValid ? false : true} />
                <input
                    type="button"
                    className="form-button cancel-button"
                    value="Cancel"
                    onClick={() => dispatch(handleModal())}
                />
            </form>
        </FormModal>
    );
};

export default SalesForm;
