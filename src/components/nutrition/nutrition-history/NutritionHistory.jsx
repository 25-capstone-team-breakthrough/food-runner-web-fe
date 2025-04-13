import React, { useState } from "react";
import "./NutritionHistory.css";
import nutritionHistoryTitle from "../../../assets/images/nutrition-diet-title.png";
import DietHistoryPanel from "./diet-history-panel/DietHistoryPanel";
import Calendar from "../../common/Calendar";
import CalorieGraph from "../../common/calorie-graph/CalorieGraph";
import { mockDietData } from "../../../utils";

const NutritionHistory = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div className="nutrition-history">
            <div className="nutrition-history__title">|DIET HISTORY|</div>
            <div className="nutrition-history__title-img">
                <img src={nutritionHistoryTitle} alt="HISTORY title" />
            </div>

            <Calendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />

            <DietHistoryPanel
                selectedDate={selectedDate}
                dietData={mockDietData}
            />

            <CalorieGraph
                referenceDate={selectedDate}
                calorie={mockDietData.reduce((sum, d) => sum + d.calorie, 0)}
            />
        </div>
    );
};

export default NutritionHistory;