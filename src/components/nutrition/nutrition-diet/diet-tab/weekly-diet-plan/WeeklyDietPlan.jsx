import React from "react";
import "./WeeklyDietPlan.css";
import DailyMeal from "./daily-meal/DailyMeal";
import CustomCheckbox from "../../../../common/custom-checkbox/CustomCheckbox";
import Loading from "../../../../common/loading/Loading";

const WeeklyDietPlan = ({
    meals,
    selectedDayIndex,
    setSelectedDayIndex,
    onCheckToggle,
    onCheckAllToggle,
    isLoading
}) => {
    const days = ["월", "화", "수", "목", "금", "토", "일"];
    const isAllChecked = meals?.length > 0 && meals.every(meal => meal.checked);

    return (
        <div className="weekly-diet-plan">
            <div className="weekly-diet-plan__header">
                <div className="weekly-diet-plan__days">
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`weekly-diet-plan__day-label ${index === selectedDayIndex ? "active" : ""}`}
                            onClick={() => setSelectedDayIndex(index)}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                <div className="weekly-diet-plan__select-all">
                    전체선택
                    <CustomCheckbox
                        checked={isAllChecked}
                        onChange={onCheckAllToggle}
                    />
                </div>
            </div>
            {isLoading ? (
                <Loading size={"fit"} />
            ) : (
                <div className="weekly-diet-plan__meals">
                    {meals?.map((meal, idx) => (
                        <DailyMeal
                            key={idx}
                            meal={meal}
                            dayIndex={selectedDayIndex}
                            mealIndex={idx}
                            onCheckToggle={onCheckToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeeklyDietPlan;