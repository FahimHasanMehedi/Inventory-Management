import React, { useState, useEffect } from "react";

import "./DropdownCategory.css";
import DropdownInitial from "../DropdownInitial/DropdownInitial";

const Dropdown = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedValue, setSelectedValue] = useState({});

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
        <div className="dropdown-container">
            <label className="dropdown-label">{props.label}</label>
            <DropdownInitial value={props.value} onClick={clickHandler} showDropdown={showDropdown} />

            {showDropdown && props.options.length > 0 && (
                <div className="dropdown-menu">
                    {showDropdown &&
                        props.options.map((option) => {
                            return (
                                <div
                                    key={option.id}
                                    className="dropdown-item"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        props.onCategorySelect(option);
                                    }}
                                >
                                    {option.name}
                                </div>
                            );
                        })}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
