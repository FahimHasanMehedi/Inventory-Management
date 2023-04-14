import React, { useContext } from "react";
import HeaderButton from "../../UI/HeaderButton/HeaderButton";

import AddIcon from "@mui/icons-material/Add";

import "./PurchasesHeader.css";
import ModalContext from "../../../store/modal-context";
import { useDispatch } from "react-redux";
import { handleModal } from "../../../features/modal/modalSlice";

const PurchasesHeader = () => {
    const dispatch = useDispatch();
    return (
        <div className="purchases-header">
            <HeaderButton
                icon={<AddIcon style={{ fontSize: 34 }} />}
                name="New purchase"
                onClick={(e) => dispatch(handleModal())}
                id="purchases"
            />
        </div>
    );
};

export default PurchasesHeader;
