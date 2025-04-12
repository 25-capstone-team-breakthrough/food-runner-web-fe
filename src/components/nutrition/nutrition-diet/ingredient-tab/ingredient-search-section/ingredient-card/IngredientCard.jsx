import React from "react";
import "./IngredientCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../../utils";

const IngredientCard = ({ ingredient, onAdd, isAdded }) => {
    return (
        <div className="ingredient-card">
            <div className="ingredient-card__image">
                <img src={ingredient.image} alt={ingredient.name} />
            </div>
            <div className="ingredient-card__info">
                <div className="ingredient-card__info-upper">
                    <span className="ingredient-card__name">{ingredient.name}</span>
                    <FontAwesomeIcon
                        icon={icons.faCirclePlus}
                        className={`ingredient-card__add-icon ${isAdded ? "disabled" : ""}`}
                        onClick={() => {
                            if (!isAdded) onAdd();
                        }}
                    />
                </div>
                <div className="ingredient-card__info-lower">
                    <div className="ingredient-card__calories">
                        {ingredient.calories} kcal (100g)
                    </div>
                    <div className="ingredient-card__nutrients">{ingredient.nutrients}</div>
                </div>
            </div>
        </div>
    );
};

export default IngredientCard;