import React from "react";
import "./SelectedItem.css" // 스타일 재사용
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";
import fallbackFood from "../../../../../assets/images/fallback-food.png"

const FavoriteItem = ({ item, onAdd, onUnfavorite }) => {
    return (
        <div
            className="selected-item selected-item--favorite"
            data-tooltip-id="global-tooltip"
            data-tooltip-content={item.name}
        >
            <img
                src={item.image || fallbackFood}
                alt={item.name}
                className="selected-item__image"
                onClick={() => onAdd(item)}
            />
            <FontAwesomeIcon
                icon={icons.faMinus}
                className="selected-item__remove"
                onClick={() => onUnfavorite(item)}
            />
        </div>
    );
};

export default React.memo(FavoriteItem);