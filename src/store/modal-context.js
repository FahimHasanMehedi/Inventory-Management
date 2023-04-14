import React, { useState } from "react";

const ModalContext = React.createContext(null);

const FORMS = {
    product: "product",
    group: "group",
    newPurchase: "new-purchase",
    newSale: "new-sale"
};

const CLICK_LOCATION = {
    products: "products",
    purchases: "purchases",
};

export function ModalContextProvider(props) {
    const [showModal, setShowModal] = useState(false);
    const [clickLocation, setClickLocation] = useState("");
    const [activeForm, setActiveForm] = useState("");
    const [showPrompt, setShowPrompt] = useState(false);
    const openModal = (e) => {
        setShowModal((prevState) => !prevState);
        setActiveForm(e.currentTarget.getAttribute("id"));
    };
    const closeModal = () => {
        setShowModal((prevState) => !prevState);
    };
    const promptHandler = (e) => {
        setShowPrompt((prevState) => !prevState);
        // setActiveForm(e.currentTarget.getAttribute("id"));
    };
    const closePrompt = () => {
        setShowPrompt((prevState) => !prevState);
    };

    return (
        <ModalContext.Provider
            value={{ showModal, openModal, closeModal, FORMS, activeForm, setActiveForm, showPrompt, promptHandler, closePrompt }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalContext;
