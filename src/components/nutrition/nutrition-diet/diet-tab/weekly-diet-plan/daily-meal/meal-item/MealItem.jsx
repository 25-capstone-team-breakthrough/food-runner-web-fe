import React from "react";
import "./MealItem.css";

const MealItem = ({ food }) => {
    return (
        <div className="meal-item">
            <div className="meal-item__image">
                <img src={food.image} alt={food.name} />
            </div>
            <div className="meal-item__info">
                <div className="meal-item__name">{food.name}</div>
                <div className="meal-item__nutrients">{food.nutrients}</div>
                <div className="meal-item__calories">{food.calories} kcal (예상)</div>
            </div>
        </div>
    );
};

export default MealItem;