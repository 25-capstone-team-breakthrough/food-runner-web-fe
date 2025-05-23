import React from "react";
import "./PreferredIngredientList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";

const PreferredIngredientList = ({ preferredIngredients = [], onRemove, viewOnly = false }) => {
    return (
        <div className="preferred-ingredients">
            <div className="preferred-ingredients__label">선호 식재료</div>
            <div className="preferred-ingredients__scroll">
                {preferredIngredients.length === 0 ? (
                    <div className="preferred-ingredients__empty">
                        아직 등록된 식재료가 없습니다.
                    </div>
                ) : (
                    preferredIngredients.map((item) =>
                        item ? (
                            <div className="preferred-ingredients__item" key={item.id}>
                                <div className="preferred-ingredients__image">
                                    <img src={item.ingredient.ingredientImage} alt={item.ingredient.ingredientName} />
                                </div>
                                {!viewOnly && (
                                    <FontAwesomeIcon
                                        icon={icons.faCircleXmark}
                                        className="preferred-ingredients__remove-icon"
                                        onClick={() => onRemove(item.id)}
                                    />
                                )}
                                <div className="preferred-ingredients__name">{item.ingredient.ingredientName}</div>
                            </div>
                        ) : null
                    )
                )}
            </div>
        </div>
    );
};

export default PreferredIngredientList;
