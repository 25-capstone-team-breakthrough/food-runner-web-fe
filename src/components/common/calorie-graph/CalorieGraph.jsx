import React from "react";
import "./CalorieGraph.css";
import { isSameDay } from "../../../utils";

const CalorieGraph = ({ referenceDate, weeklyCalories }) => {
    const maxCalorie = 3000;
    const maxHeightRem = 22.25;

    return (
        <div className="calorie-graph-container">
            <div className="calorie-graph-label">
                calorie<br />GRAPH
            </div>
            <div className="calorie-graph-content">
                <div className="y-axis">
                    {[3000, 2500, 2000, 1500, 1000, 500, ""].map((label, i) => (
                        <div className="y-tick" key={i}>
                            <span className="y-label">{label.toLocaleString()}</span>
                            <div className="y-line" />
                        </div>
                    ))}
                </div>
                <div className="bar-grid">
                    {weeklyCalories.map(({ date, calorie }, i) => {
                        const cal = Math.min(calorie, maxCalorie);
                        const barHeightRem = (cal / maxCalorie) * maxHeightRem;
                        const isTarget = isSameDay(date, referenceDate);

                        return (
                            <div className="graph-bar-wrapper" key={i}>
                                <div className="bar-value">{cal}</div>
                                <div
                                    className={`bar ${isTarget ? "highlight" : ""}`}
                                    style={{ height: `${barHeightRem}rem` }}
                                />
                                <div className="bar-date">
                                    {String(date.getMonth() + 1).padStart(2, "0")}.
                                    {String(date.getDate()).padStart(2, "0")}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default CalorieGraph;