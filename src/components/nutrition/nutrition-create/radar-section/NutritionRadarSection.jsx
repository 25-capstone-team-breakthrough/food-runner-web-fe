import React from "react";
import "./NutritionRadarSection.css";
import RadarChart from "./RadarChart";
import CalorieBar from "./CalorieBar";
import DateSelector from "../../../common/date-selector/DateSelector";

const NutritionRadarSection = () => {
    const data = {
        carbs: 150,
        protein: 34,
        fat: 14,
        fiber: 6,
        vitamin: 2000,
    };

    return (
        <div className="nutrition-radar-section">
            <DateSelector />
            <RadarChart data={data} />
            <CalorieBar />
        </div>
    );
};

export default NutritionRadarSection;