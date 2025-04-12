import React from "react";
import "./CustomCheckbox.css";

const CustomCheckbox = ({ checked, onChange }) => {
    return (
        <label className="custom-checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="custom-checkbox__mark" />
        </label>
    );
};

export default CustomCheckbox;