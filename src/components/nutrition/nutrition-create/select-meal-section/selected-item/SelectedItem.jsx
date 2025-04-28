import React from "react";
import "./SelectedItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";

const SelectedItem = ({ item, onRemove }) => {
    return (
        <div className="selected-item">
            <img src={item.image} alt={item.name} className="selected-item__image" />
            <FontAwesomeIcon
                icon={icons.faMinus}
                className="selected-item__remove"
                onClick={() => onRemove(item.id)}
            />
        </div>
    );
};

export default SelectedItem;