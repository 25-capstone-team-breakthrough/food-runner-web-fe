import React, { useState } from "react";
import "./DietTab.css";
import WeeklyDietPlan from "./weekly-diet-plan/WeeklyDietPlan";
import DietRegenerateBox from "./diet-regenerate-box/DietRegenerateBox";
import { mockMeals } from "../../../../utils";

const DietTab = ({ preferredIngredients }) => {
    const today = new Date();
    const todayIndex = (today.getDay() + 6) % 7; // 월~일 기준 맞춤

    const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex);
    const [dietData, setDietData] = useState(
        Array.from({ length: 7 }, () => ({
            meals: JSON.parse(JSON.stringify(mockMeals))
        }))
    );

    const handleCheckToggle = (dayIndex, mealIndex) => {
        const newData = [...dietData];
        newData[dayIndex].meals[mealIndex].checked = !newData[dayIndex].meals[mealIndex].checked;
        setDietData(newData);
    };

    const handleCheckAllToggle = () => {
        const currentDayMeals = dietData[selectedDayIndex].meals;
        const allChecked = currentDayMeals.every((meal) => meal.checked);
        const newData = [...dietData];
        newData[selectedDayIndex].meals = currentDayMeals.map((meal) => ({
            ...meal,
            checked: !allChecked
        }));
        setDietData(newData);
    };

    const handleRegenerateClick = () => {
        alert("식단 재생성");
    };

    return (
        <div className="diet-tab">
            <WeeklyDietPlan
                selectedDayIndex={selectedDayIndex}
                setSelectedDayIndex={setSelectedDayIndex}
                meals={dietData[selectedDayIndex].meals}
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