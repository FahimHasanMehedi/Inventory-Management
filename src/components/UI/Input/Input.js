import React from "react";

import "./Input.css";

const Input = (props) => {
    return (
        <div className={`input ${props.invalid || props.valueIsUsed ? "invalid-input" : ""}`}>
            <label htmlFor={props.id}>{props.label}</label>
            <input
                id={props.id}
                type={props.type}
                onChange={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
                spellCheck="false"
            />
            {props.valueIsUsed && <div className="error-message">Value is already used!</div>}
        </div>
    );
};

export default Input;
