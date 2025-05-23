import React from "react";
import "./FoodSearchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";
import starFilled from "../../../../../assets/icons/star-filled.png";
import starOutline from "../../../../../assets/icons/star-outline.png";

const FoodSearchItem = ({ item, onFavoriteToggle, onAdd }) => {
    return (
        <div className="food-search-item">
            <img
                src={item.image || ""}
                alt={item.name}
                className="food-search-item__image"
            />

            <img
                src={item.isFavorite ? starFilled : starOutline}
                alt={item.isFavorite ? "즐겨찾기됨" : "즐겨찾기 아님"}
                className="food-search-item__favorite"
                onClick={() => onFavoriteToggle(item)}
            />

            <div className="food-search-item__info">
                <div className="food-search-item__name">{item.name}</div>
                <div className="food-search-item__kcal">{item.kcal} Kcal</div>
            </div>

            <div className="food-search-item__brand">{item.brand}</div>

            <FontAwesomeIcon
                icon={icons.faPlus}
                className="food-search-item__add"
                onClick={onAdd}
            />
        </div>
    );
};

export default React.memo(FoodSearchItem);