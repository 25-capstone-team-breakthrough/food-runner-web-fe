import React from "react";
import "./MealLogItem.css";

const MealLogItem = ({ food }) => {
    return (
        <div className="meal-log-item">
            <img src={food.image} alt={food.name} className="meal-log-item__img" />
            <div className="meal-log-item__info">
                <div className="meal-log-item__name">
                    {food.name}
                </div>
                <div className="meal-log-item__nutrient">
                    {food.calories}kcal (100g)
                </div>
                <div className="meal-log-item__calories">
                    {food.nutrients}
                </div>
            </div>
        </div>
    );
};

export default MealLogItem;