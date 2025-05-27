import React from "react";
import "./PreferredIngredientList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";
import EmptyState from "../../../../common/empty-state/EmptyState";

const PreferredIngredientList = ({ preferredIngredients = [], onRemove, viewOnly = false }) => {
    return (
        <div className="preferred-ingredients">
            <div className="preferred-ingredients__label">선호 식재료</div>
            {preferredIngredients.length > 0 ? (
                <div className="preferred-ingredients__scroll">
                    {preferredIngredients.map((item) =>
                        item ? (
                            <div className="preferred-ingredients__item" key={item.id}>
                                <div className="preferred-ingredients__image">
                                    <img
                                        src={item.ingredient.ingredientImage}
                                        alt={item.ingredient.ingredientName}
                                    />
                                </div>
                                {!viewOnly && (
                                    <FontAwesomeIcon
                                        icon={icons.faCircleXmark}
                                        className="preferred-ingredients__remove-icon"
                                        onClick={() => onRemove(item.id)}
                                    />
                                )}
                                <div className="preferred-ingredients__name">
                                    {item.ingredient.ingredientName}
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            ) : (
                <EmptyState
                    icon={icons.faPlateUtensils}
                    message={"선호 식재료를 등록하고 맞춤 식단 추천을 받아보세요"}
                />
            )}
        </div>
    );
};

export default PreferredIngredientList;