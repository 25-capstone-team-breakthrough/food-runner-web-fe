import React from "react";
import "./NutritionRadarSection.css";
import DateSelector from "../../../common/date-selector/DateSelector";
import CalorieBar from "./CalorieBar";
import RadarChart from "./RadarChart";
import PageHeader from "../../../common/page-header/PageHeader";

const NutritionRadarSection = ({
    nutritionLogs,
    recommendedNutrients,
    selectedDate,
    setSelectedDate,
}) => {
    const selectedDateStr =
        selectedDate instanceof Date
        ? selectedDate.toLocaleDateString("sv-SE") // "2025-05-20"
        : selectedDate;

    const todayLog =
        nutritionLogs.find((log) => log.date.trim() === selectedDateStr.trim()) || {};

    // MIN/MAX 기준값 객체 추출
    const minObj = recommendedNutrients.find((item) => item.type === "MIN") || {};
    const maxObj = recommendedNutrients.find((item) => item.type === "MAX") || {};

    // 주요 5개 지표 및 vitamin은 vitaminC로만 구성
    const radarData = {
        carbs: todayLog.carbohydrate ?? 0,
        protein: todayLog.protein ?? 0,
        fat: todayLog.fat ?? 0,
        fiber: todayLog.dietaryFiber ?? 0,
        vitamin: todayLog.vitaminC ?? 0,
    };

    const minValues = {
        carbs: minObj.carbohydrate ?? 0,
        protein: minObj.protein ?? 0,
        fat: minObj.fat ?? 0,
        fiber: minObj.dietaryFiber ?? 0,
        vitamin: minObj.vitaminC ?? 0,
    };

    const maxValues = {
        carbs: maxObj.carbohydrate ?? 1,
        protein: maxObj.protein ?? 1,
        fat: maxObj.fat ?? 1,
        fiber: maxObj.dietaryFiber ?? 1,
        vitamin: maxObj.vitaminC ?? 1,
    };

    return (
        <div className="nutrition-radar-section">
            <DateSelector
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <PageHeader text={"NUTRITION ANALYSIS"} />
            <RadarChart data={radarData} minValues={minValues} maxValues={maxValues} />
            <CalorieBar
                calorieIntake={todayLog.calories}
                recommendedCalorie={minObj.calories}
            />
        </div>
    );
};

export default NutritionRadarSection;