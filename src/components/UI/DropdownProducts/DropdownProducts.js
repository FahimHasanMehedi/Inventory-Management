import React, { useState, useEffect } from "react";

import DropdownInitial from "../DropdownInitial/DropdownInitial";

import AddIcon from "@mui/icons-material/Add";

import "./DropdownProducts.css";

const DropdownProducts = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const handler = () => setShowDropdown(false);

        window.addEventListener("click", handler);

        return () => window.removeEventListener("click", handler);
    });

    const clickHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDropdown((prevState) => !prevState);
    };
    return (
        <div>
            <div className="products-dropdown-with-quantity">
                <div className="dropdown-container">
                    <DropdownInitial value={props.value} onClick={clickHandler} showDropdown={showDropdown} />

                    {showDropdown && props.options.length > 0 && (
                        <div className="dropdown-menu">
                            {showDropdown &&
                                props.options.map((option) => {
                                    return (
                                        <div
                                            key={option.productCode}
                                            className="dropdown-item"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                props.onProductSelect(option);
                                            }}
                                        >
                                            {option.productName}
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
                <input type="number" min="0" onChange={props.onQuantChange} value={props.quantityValue} />
                <button className="products-add-button" onClick={props.onButtonClick}>
                    <AddIcon style={{ fontSize: "28px" }} />
                </button>
            </div>
        </div>
    );
};

export default DropdownProducts;
