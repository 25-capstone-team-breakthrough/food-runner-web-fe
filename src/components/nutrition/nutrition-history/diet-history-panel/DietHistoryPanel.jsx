import React, { useState } from "react";
import "./DietHistoryPanel.css";
import MealLogItem from "./meal-log-item/MealLogItem";

const DietHistoryPanel = ({ dietData, selectedDate }) => {
    const times = ["아침", "점심", "저녁"];
    const [selectedTime, setSelectedTime] = useState("아침");

    const formattedDate = selectedDate.toISOString().split("T")[0];
    const dayData = dietData.find(d => d.date === formattedDate);
    const currentMeal = dayData?.meals?.[selectedTime] ?? [];

    const foods = currentMeal.filter(item => item.type === "식사");
    const supplements = currentMeal.filter(item => item.type === "영양제");

    return (
        <div className="diet-history-panel">
            <div className="diet-history-panel__tabs">
                {times.map(time => (
                    <div
                        key={time}
                        className={`diet-history-panel__tab ${selectedTime === time ? "active" : ""}`}
                        onClick={() => setSelectedTime(time)}
                    >
                        {time}
                    </div>
                ))}
            </div>

            {foods.length > 0 && (
                <div className="diet-history-panel__section">
                    <div className="diet-history-panel__section-label">식사</div>
                    <div className="diet-history-panel__list">
                        {foods.map((food, idx) => (
                            <MealLogItem key={idx} food={food} />
                        ))}
                    </div>
                </div>
            )}

            {supplements.length > 0 && (
                <div className="diet-history-panel__section">
                    <div className="diet-history-panel__section-label">영양제</div>
                    <div className="diet-history-panel__list">
                        {supplements.map((food, idx) => (
                            <MealLogItem key={idx} food={food} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DietHistoryPanel;