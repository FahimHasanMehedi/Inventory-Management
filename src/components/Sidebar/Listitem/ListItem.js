import React from "react";
import { NavLink } from "react-router-dom";

import "./ListItem.css";

const ListItem = (props) => {
    const activeClassname = "list-item-link active";
    const className = "list-item-link";
    return (
        <li className="list-item">
            <NavLink className={(navData) => (navData.isActive ? activeClassname : className)} to={props.path}>
                {props.icon}
                {props.name}
            </NavLink>
        </li>
    );
};

export default ListItem;
