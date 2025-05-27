import React from "react";
import "./SelectedItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";
import fallbackFood from "../../../../../assets/images/fallback-food.png"

const SelectedItem = ({ item, onRemove }) => {
    return (
        <div
            className="selected-item"
            data-tooltip-id="global-tooltip"
            data-tooltip-content={item.name}
        >
            <img src={item.image || fallbackFood} alt={item.name} className="selected-item__image" />
            <FontAwesomeIcon
                icon={icons.faMinus}
                className="selected-item__remove"
                onClick={() => onRemove(item.id)}
            />
        </div>
    );
};

export default React.memo(SelectedItem);