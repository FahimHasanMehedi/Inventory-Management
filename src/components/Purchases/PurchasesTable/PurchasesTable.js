import React, { useContext, useEffect } from "react";
import ModalContext from "../../../store/modal-context";
import ProductContext from "../../../store/product-context";
import CategoryContext from "../../../store/category-context";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./PurchasesTable.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPurchasesAsync } from "../../../features/purchases/purchasesSlice";
import { handleModal } from "../../../features/modal/modalSlice";

const NoPurchases = (props) => {
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

const renderItemsTable = (items) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Product Code</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {items?.map((item) => {
                    return (
                        <tr key={item.productCode}>
                            <td>{item.productCode}</td>
                            <td>{item.productName}</td>
                            <td>{item.quantity}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const PurchasesTable = () => {
    const { purchases, purchaseIds } = useSelector((state) => state.purchases);
    const dispatch = useDispatch();

    console.log(purchaseIds);
    console.log(purchases);

    useEffect(() => {
        dispatch(fetchPurchasesAsync());
    }, []);

    if (purchaseIds.length === 0) {
        return (
            <div className="products-table no-products">
                <NoPurchases onClick={() => dispatch(handleModal())} />
            </div>
        );
    }
    let content = [];
    for (let item of purchaseIds) {
        content.push(
            <div className="purchase-card">
                <h3 className="purchase-card-header">
                    Date: <span>{purchases[item]?.[0]?.purchaseDate}</span>
                </h3>
                <h3 className="purchase-card-header">
                    Supplier: <span>{purchases[item]?.[0]?.supplier}</span>
                </h3>
                <div>
                    <h4 className="purchase-card-header">Items:</h4>
                    {renderItemsTable(purchases[item])}
                </div>
            </div>
        );
    }

    return <div className="purchases-container">{content}</div>;
};

export default PurchasesTable;
