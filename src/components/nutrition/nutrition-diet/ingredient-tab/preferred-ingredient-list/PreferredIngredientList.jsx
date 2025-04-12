import React from "react";
import "./PreferredIngredientList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";

const PreferredIngredientList = ({ ingredients, onRemove, viewOnly = false }) => {
    return (
        <div className="preferred-ingredients">
            <div className="preferred-ingredients__label">선호 식재료</div>
            <div className="preferred-ingredients__scroll">
                {ingredients.map((item, index) => (
                    <div className="preferred-ingredients__item" key={index}>
                        <div className="preferred-ingredients__image">
                            <img src={item.image} alt={item.name} />
                        </div>
                        {!viewOnly && (
                            <FontAwesomeIcon
                                icon={icons.faCircleXmark}
                                className="preferred-ingredients__remove-icon"
                                onClick={() => onRemove(item.name)}
                            />
                        )}
                        <div className="preferred-ingredients__name">{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreferredIngredientList;