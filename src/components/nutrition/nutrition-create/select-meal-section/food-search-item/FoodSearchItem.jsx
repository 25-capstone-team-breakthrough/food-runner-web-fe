import React from "react";
import "./FoodSearchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";
import starFilled from "../../../../../assets/icons/star-filled.png";
import starOutline from "../../../../../assets/icons/star-outline.png";
import fallbackFood from "../../../../../assets/images/fallback-food.png";

const FoodSearchItem = ({ item, isSelected, onFavoriteToggle, onAdd, onRemove }) => {
    return (
        <div
            className={`food-search-item ${isSelected ? "food-search-item--selected" : ""}`}
            onClick={isSelected ? undefined : onAdd}
        >
            <img
                src={item.image || fallbackFood}
                alt={item.name}
                className="food-search-item__image"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackFood;
                }}
            />

            <img
                src={item.isFavorite ? starFilled : starOutline}
                alt={item.isFavorite ? "Favorited" : "Not favorited"}
                className="food-search-item__favorite"
                onClick={(e) => {
                    e.stopPropagation(); // 카드 클릭 이벤트 방지
                    onFavoriteToggle(item);
                }}
            />

            <div className="food-search-item__info">
                <div
                    className="food-search-item__name"
                    data-tooltip-id="global-tooltip"
                    data-tooltip-content={item.name}
                >
                    {item.name}
                </div>
                <div className="food-search-item__nutrition">
                    {item.type === "meal" ? `${item.kcal} kcal` : item.mainNutrition}
                </div>
            </div>
            <div className="food-search-item__brand">
                {item.brand === "해당없음" ? "" : item.brand}
            </div>

            <FontAwesomeIcon
                icon={isSelected ? icons.faCircleXmark : icons.faCirclePlus}
                className={`food-search-item__add ${isSelected ? "food-search-item__add--selected" : ""}`}
                onClick={isSelected ? () => onRemove(item.id) : undefined}
            />
        </div>
    );
};

export default React.memo(FoodSearchItem);