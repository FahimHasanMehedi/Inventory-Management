import React from 'react'

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const DropdownInitial = (props) => {
    const getDisplay = () => {
        if (props.value) {
            return props.value;
        }
        return "Select....";
    };
  return (
      <div className={`dropdown-input-container ${props.showDropdown ? "dropdown-active": ""}`} onClick={props.onClick}>
          <div className="dropdown-input">{getDisplay()}</div>
          <button className="dropdown-button">
              <ExpandMoreIcon
                  style={{
                      fontSize: "22px",
                      color: "var(--light)",
                  }}
              />
          </button>
      </div>
  );
}

export default DropdownInitial