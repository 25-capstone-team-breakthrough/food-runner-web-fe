import React from "react";
import "./MealItem.css";
import { useNavigate } from "react-router-dom";

const MealItem = ({ food }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/nutrition/recipe/${food.recipeId}`)
    };

    return (
        <div className="meal-item" onClick={handleClick}>
            <div className="meal-item__image">
                <img src={food.recipeImage} alt={food.recipeName} />
            </div>
            <div className="meal-item__info">
                <div className="meal-item__name">{food.recipeName}</div>
                <div className="meal-item__calories">
                    {food.calories ?? "?"} kcal (예상)
                </div>
                <div className="meal-item__nutrients">
                    탄수화물 {food.carbohydrate ?? 0}g | 단백질 {food.protein ?? 0}g | 지방 {food.fat ?? 0}g
                </div>
            </div>
        </div>
    );
};

export default MealItem;