import React from "react";
import "./MealLogItem.css";
import fallbackFood from "../../../../../assets/images/fallback-food.png";

const MealLogItem = ({ food }) => {
    return (
        <div className="meal-log-item">
            <img
                src={food.image || fallbackFood}
                alt={food.name}
                className="meal-log-item__img"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackFood;
                }}
            />
            <div className="meal-log-item__info">
                <div className="meal-log-item__name">
                    {food.name}
                </div>
                <div className="meal-log-item__calories">
                    {food.calories > 0 ? `${food.calories} kcal (100g)` : ""}
                </div>
                <div className="meal-log-item__nutrient">
                    {food.nutrients}
                </div>
            </div>
        </div>
    );
};

export default MealLogItem;