import React, { useContext } from "react";

import AddIcon from "@mui/icons-material/Add";
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import FolderDeleteOutlinedIcon from "@mui/icons-material/FolderDeleteOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";

import "./ProductsHeader.css";
import HeaderButton from "../../UI/HeaderButton/HeaderButton";
import ModalContext from "../../../store/modal-context";
import CategoryContext from "../../../store/category-context";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../../../features/categories/categoriesSlice";
import { handleModal, handlePrompt, setActiveForm } from "../../../features/modal/modalSlice";

const ProductsHeader = () => {
    // const modalCtx = useContext(ModalContext);
    const { selectedCategory } = useSelector((state) => state.categories);
    const dispatchRedux = useDispatch();
    return (
        <div className="products-header">
            <HeaderButton
                icon={<CreateNewFolderOutlinedIcon style={{ fontSize: 34 }} />}
                name="New group"
                onClick={() => {
                    dispatchRedux(handleModal());
                    dispatchRedux(setActiveForm("group"));
                }}
                id="group"
            />
            <HeaderButton
                icon={<FolderDeleteOutlinedIcon style={{ fontSize: 34 }} />}
                name="Delete group"
                onClick={() => dispatchRedux(handlePrompt())}
                id="group"
                disabled={selectedCategory === -1 ? true : false}
            />
            <HeaderButton
                icon={<AddIcon style={{ fontSize: 34 }} />}
                name="New product"
                onClick={() => {
                    dispatchRedux(handleModal());
                    dispatchRedux(setActiveForm("product"));
                }}
                id="product"
            />
            <HeaderButton
                icon={<SellOutlinedIcon style={{ fontSize: 34 }} />}
                name="New purchase"
                onClick={(e) => {
                    dispatchRedux(setSelectedCategory(-1));
                    dispatchRedux(handleModal());
                    dispatchRedux(setActiveForm("new-purchase"));
                }}
                id="new-purchase"
            />
            <HeaderButton
                icon={<ShoppingCartOutlinedIcon style={{ fontSize: 34 }} />}
                name="New sale"
                onClick={(e) => {
                    console.log("hello");
                    dispatchRedux(setSelectedCategory(-1));
                    dispatchRedux(handleModal());
                    dispatchRedux(setActiveForm("new-sale"));
                }}
                id="new-sale"
            />
        </div>
    );
};

export default ProductsHeader;
