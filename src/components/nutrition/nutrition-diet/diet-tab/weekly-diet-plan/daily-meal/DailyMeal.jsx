import React from "react";
import "./DailyMeal.css";
import MealItem from "./meal-item/MealItem";
import CustomCheckbox from "../../../../../common/custom-checkbox/CustomCheckbox";
import EmptyState from "../../../../../common/empty-state/EmptyState";
import { icons } from "../../../../../../utils";

const DailyMeal = ({ meal, dayIndex, mealIndex, onCheckToggle }) => {
    const handleChange = () => {
        onCheckToggle(dayIndex, mealIndex);
    };

    return (
        <div className="daily-meal">
            <div className="daily-meal__header">
                <span className="daily-meal__type">{meal.type}</span>
                <CustomCheckbox
                    checked={meal.checked}
                    onChange={handleChange}
                />
            </div>
            <div className="daily-meal__items">
                {meal?.foods?.length > 0 ? (
                    meal.foods.map((food, idx) => (
                        <MealItem
                            key={idx}
                            food={food}
                            checked={meal.checked}
                            dayIndex={dayIndex}
                            mealIndex={mealIndex}
                            isLast={idx === meal.foods.length - 1}
                        />
                    ))
                ) : (
                    <EmptyState icon={icons.faPlateUtensils} />
                )}
            </div>
        </div>
    );
};

export default DailyMeal;