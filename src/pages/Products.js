import React, { useContext } from "react";
import { createPortal } from "react-dom";
import GroupDeletePrompt from "../components/GroupDeletePrompt/GroupDeletePrompt";
import GroupForm from "../components/GroupForm/GroupForm";
import ProductsForm from "../components/Products/ProductsForm/ProductsForm";
import ProductsHeader from "../components/Products/ProductsHeader/ProductsHeader";
import ProductsList from "../components/Products/ProductsCategoryList/ProductsCategoryList";
import ProductsTable from "../components/Products/ProductsTable/ProductsTable";
import PurchaseForm from "../components/PurchaseForm/PurchaseForm";
import SalesForm from "../components/SalesForm/SalesForm";
import Backdrop from "../components/UI/Backdrop/Backdrop";
import { CategoryContextProvider } from "../store/category-context";
import ModalContext from "../store/modal-context";
import { ProductContextProvider } from "../store/product-context";

import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { handleModal } from "../features/modal/modalSlice";

const Products = () => {
    // const modalCtx = useContext(ModalContext);
    const { showModal, showPrompt, activeForm } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    const checkActiveForm = () => {
        // const result = Object.values(modalCtx.FORMS).includes(modalCtx.activeForm);
        // return result;
    };

    let content, backdrop;
    if (showModal && "product" === activeForm) {
        content = <ProductsForm />;
    }

    if (showModal && "group" === activeForm) {
        content = <GroupForm />;
    }

    if (showModal && "new-purchase" === activeForm) {
        content = <PurchaseForm />;
    }

    if (showModal && "new-sale" === activeForm) {
        content = <SalesForm />;
    }

    if (showPrompt) {
        content = createPortal(<GroupDeletePrompt />, document.getElementById("modal-root"));
        backdrop = createPortal(<Backdrop zIndex="20" />, document.getElementById("backdrop-root"));
    }

    if (showModal) {
        backdrop = createPortal(
            <Backdrop zIndex="10" onClick={() => dispatch(handleModal())} />,
            document.getElementById("backdrop-root")
        );
    }
    return (
        <div className="products">
            <ProductsHeader />
            <ProductsList />
            <ProductsTable />

            {content}
            {backdrop}
        </div>
    );
};

export default Products;
