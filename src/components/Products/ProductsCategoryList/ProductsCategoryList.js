import React, { useContext, useEffect, useState } from "react";

import "./ProductsCategoryList.css";
import CategoryContext from "../../../store/category-context";
import ProductContext from "../../../store/product-context";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FolderIcon from "@mui/icons-material/Folder";
import { fetchCategoriesAsync, setProductsOpen, setSelectedCategory } from "../../../features/categories/categoriesSlice";

const ProductsCategory = (props) => {
    const className = "category-button " + props.className;

    return (
        <button id={props.id} className={className} onClick={props.onClick}>
            <FolderIcon style={{ fontSize: 18 }} /> <span>{props.name}</span>
        </button>
    );
};

const ProductsCategoryList = (props) => {
    const { categories, isLoading, isError, error, productsOpen, selectedCategory } = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, []);

    const openHandler = (e) => {
        dispatch(setProductsOpen());
        dispatch(setSelectedCategory(-1));
        
    };

    const categoryClickHandler = (categoryId) => {
        dispatch(setSelectedCategory(categoryId));
    };
    return (
        <div className="products-list-container">
            <div className="category-products">
                {productsOpen ? (
                    <RemoveIcon
                        style={{
                            fontSize: 20,
                        }}
                    />
                ) : (
                    <AddIcon
                        style={{
                            fontSize: 20,
                        }}
                    />
                )}

                <ProductsCategory
                    className={productsOpen && selectedCategory === -1 ? "active" : ""}
                    name="Products"
                    onClick={openHandler}
                />
            </div>
            <ul className="products-list">
                {productsOpen &&
                    categories.map((category) => {
                        return (
                            <li key={category.id}>
                                <ProductsCategory
                                    className={selectedCategory === category.id ? "active" : ""}
                                    id={category.id}
                                    name={category.name}
                                    onClick={() => categoryClickHandler(category.id)}
                                />
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default ProductsCategoryList;
