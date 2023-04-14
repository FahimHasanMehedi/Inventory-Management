import React  from "react";
// import ModalContext from "../../../store/modal-context";

import "./FormModal.css";

const FormModal = (props) => {
    // const modalCtx = useContext(ModalContext);
    // const modalHeight = modalCtx.windowHeight - modalCtx.mainHeaderHeight
    return (
        <div className="form-modal" >
            {props.children}
        </div>
    );
};

export default FormModal;
