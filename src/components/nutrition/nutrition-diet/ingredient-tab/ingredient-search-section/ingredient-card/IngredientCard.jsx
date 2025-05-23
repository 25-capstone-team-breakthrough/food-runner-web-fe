import React from "react";
import "./IngredientCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../../utils";

const IngredientCard = ({ ingredient, onAdd, isAdded }) => {
    const mainNutrients = [
        { label: "단백질", value: ingredient.protein },
        { label: "탄수화물", value: ingredient.carbohydrate },
        { label: "지방", value: ingredient.fat },
    ]
        .filter(n => n.value > 0)
        .map(n => `${n.label} ${n.value}g`)
        .join(" / ");
    
    return (
        <div className="ingredient-card">
            <div className="ingredient-card__image">
                <img src={ingredient.ingredientImage || null} alt={ingredient.ingredientName} />
            </div>
            <div className="ingredient-card__info">
                <div className="ingredient-card__info-upper">
                    <span className="ingredient-card__name">{ingredient.ingredientName}</span>
                    {!isAdded && (
                        <FontAwesomeIcon
                            icon={icons.faCirclePlus}
                            className={`ingredient-card__add-icon`}
                            onClick={() => onAdd()}
                        />
                    )}
                </div>
                <div className="ingredient-card__info-lower">
                    <div className="ingredient-card__calories">
                        {ingredient.calories} kcal (100g)
                    </div>
                    <div className="ingredient-card__nutrients">{mainNutrients}</div>
                </div>
            </div>
        </div>
    );
};

export default IngredientCard;