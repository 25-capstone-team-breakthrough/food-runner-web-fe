import React from "react";
import "./CalorieBar.css";

const CalorieBar = ({ calorieIntake = 0, recommendedCalorie = 2000 }) => {
    const ratio = Math.min(calorieIntake / recommendedCalorie, 1); // 100% 초과 방지

    return (
        <div className="calorie-bar">
            <div className="calorie-bar__info">
                <span className="calorie-bar__intake">
                    <span>{Math.round(calorieIntake).toLocaleString()}</span>
                </span>
                <span className="calorie-bar__divider">kcal /</span>
                <span className="calorie-bar__recommend">
                    <span>권장 </span>
                    {Math.round(recommendedCalorie).toLocaleString()} kcal
                </span>
            </div>
            <div className="calorie-bar__track">
                <div
                    className="calorie-bar__fill"
                    style={{ width: `${ratio * 100}%` }}
                />
            </div>
        </div>
    );
};

export default CalorieBar;