import React, { useContext, useEffect, useState } from "react";
import ProductContext from "../../../store/product-context";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./ProductsTable.css";
import ModalContext from "../../../store/modal-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync } from "../../../features/products/productsSlice";
import CategoryContext from "../../../store/category-context";
import { handleModal } from "../../../features/modal/modalSlice";

const NoProducts = (props) => {
    return (
        <React.Fragment>
            <VisibilityOffIcon style={{ fontSize: "112px", color: "var(--mid)" }} />
            <div className="no-products-texts">
                <h3>Selected group contains no products</h3>
                <p>
                    <button onClick={props.onClick} id="product">
                        Add new product
                    </button>{" "}
                    or{" "}
                    <button onClick={props.onClick} id="group">
                        new product group
                    </button>
                </p>
            </div>
        </React.Fragment>
    );
};

const ProductsTable = () => {
    // const productCtx = useContext(ProductContext);
    // const modalCtx = useContext(ModalContext);
    const {selectedCategory} = useSelector(state => state.categories);

    const { products, isLoading, isError, error } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductsAsync(selectedCategory));
    }, [selectedCategory]);

    if (products.length === 0) {
        return (
            <div className="products-table no-products">
                <NoProducts onClick={() => dispatch(handleModal())} />
            </div>
        );
    }

    return (
        <div className="products-table">
            <table>
                <thead>
                    <tr>
                        <th>Product Code</th>
                        <th>Product Name</th>
                        <th>Group</th>
                        <th>Total in Inventory</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return (
                            <tr key={product.productCode}>
                                <td>{product.productCode}</td>
                                <td>{product.productName}</td>
                                <td>{product.categoryName}</td>
                                {/* <td>{product.productStock === 0 ? "" : product.productStock}</td> */}
                                <td>{product.productStock}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ProductsTable;
