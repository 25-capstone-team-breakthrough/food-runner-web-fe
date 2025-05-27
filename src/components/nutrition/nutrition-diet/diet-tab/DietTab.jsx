import React, { useState } from "react";
import "./DietTab.css";
import WeeklyDietPlan from "./weekly-diet-plan/WeeklyDietPlan";
import DietRegenerateBox from "./diet-regenerate-box/DietRegenerateBox";

const DietTab = ({ preferredIngredients, recommendedMeals }) => {
    const today = new Date();
    const todayIndex = (today.getDay() + 6) % 7;

    const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex);

    const handleCheckToggle = (dayIndex, mealIndex) => {
        const newData = [...recommendedMeals];
        newData[dayIndex].meals[mealIndex].checked = !newData[dayIndex].meals[mealIndex].checked;
    };

    const handleCheckAllToggle = () => {
        const currentDayMeals = recommendedMeals[selectedDayIndex]?.meals || [];
        const allChecked = currentDayMeals.every((meal) => meal.checked);
        const newData = [...recommendedMeals];
        newData[selectedDayIndex].meals = currentDayMeals.map((meal) => ({
            ...meal,
            checked: !allChecked,
        }));
    };

    const handleRegenerateClick = () => {
        alert("식단 재생성");
        // regenerateRecommendedMeals(token) 연결
    };

    return (
        <div className="diet-tab">
            <WeeklyDietPlan
                selectedDayIndex={selectedDayIndex}
                setSelectedDayIndex={setSelectedDayIndex}
                meals={recommendedMeals[selectedDayIndex]?.meals ?? []}
                onCheckToggle={handleCheckToggle}
                onCheckAllToggle={handleCheckAllToggle}
            />
            <DietRegenerateBox
                onRegenerateClick={handleRegenerateClick}
                preferredIngredients={preferredIngredients}
            />
        </div>
    );
};

export default DietTab;