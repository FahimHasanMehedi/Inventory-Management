import React from "react";

import "./HeaderButton.css";

const HeaderButton = (props) => {
    return (
        <button className="header-button" onClick={props.onClick} id={props.id} disabled={props.disabled}>
            {props.icon}
            <span>{props.name}</span>
        </button>
    );
};

export default HeaderButton;
