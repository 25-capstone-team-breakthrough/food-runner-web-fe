import React, { useEffect, useState } from "react";
import "./DietTab.css";
import WeeklyDietPlan from "./weekly-diet-plan/WeeklyDietPlan";
import DietRegenerateBox from "./diet-regenerate-box/DietRegenerateBox";

const DietTab = ({ preferredIngredients, recommendedMeals, onPartialRegenerate, isLoading }) => {
    const today = new Date();
    const todayIndex = (today.getDay() + 6) % 7;

    const [selectedDayIndex, setSelectedDayIndex] = useState(todayIndex);
    const [localRecommendedMeals, setLocalRecommendedMeals] = useState([]);

    // 외부 props를 내부 state 동기화
    useEffect(() => {
        setLocalRecommendedMeals(recommendedMeals);
    }, [recommendedMeals]);

    // 개별 체크 toggle
    const handleCheckToggle = (dayIndex, mealIndex) => {
        const newData = [...localRecommendedMeals];
        newData[dayIndex] = {
            ...newData[dayIndex],
            meals: [...newData[dayIndex].meals]
        };
        newData[dayIndex].meals[mealIndex] = {
            ...newData[dayIndex].meals[mealIndex],
            checked: !newData[dayIndex].meals[mealIndex].checked
        };
        setLocalRecommendedMeals(newData);
    };

    // 전체 체크 toggle
    const handleCheckAllToggle = () => {
        const currentDayMeals = localRecommendedMeals[selectedDayIndex]?.meals || [];
        const allChecked = currentDayMeals.every((meal) => meal.checked);

        const newData = [...localRecommendedMeals];
        newData[selectedDayIndex] = {
            ...newData[selectedDayIndex],
            meals: currentDayMeals.map((meal) => ({
                ...meal,
                checked: !allChecked
            }))
        };
        setLocalRecommendedMeals(newData);
    };

    return (
        <div className="diet-tab">
            <WeeklyDietPlan
                selectedDayIndex={selectedDayIndex}
                setSelectedDayIndex={setSelectedDayIndex}
                meals={localRecommendedMeals[selectedDayIndex]?.meals ?? []}
                onCheckToggle={handleCheckToggle}
                onCheckAllToggle={handleCheckAllToggle}
                isLoading={isLoading}
            />
            <DietRegenerateBox
                onRegenerateClick={() => onPartialRegenerate(localRecommendedMeals)}
                preferredIngredients={preferredIngredients}
                isLoading={isLoading}
            />
        </div>
    );
};

export default DietTab;