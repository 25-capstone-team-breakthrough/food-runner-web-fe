import React from "react";
import "./IntakeStatusItem.css";

const IntakeStatusItem = ({ name, status, value }) => {
    const positionPercent = Math.min(Math.max(value, 0), 150) / 150 * 100;

    const statusClassMap = {
        부족: "deficient",
        적정: "adequate",
        초과: "excessive",
    };
    
    return (
        <div className="intake-status__item">
            <span className="intake-status__nutrient">{name}</span>
            <span
                className={`intake-status__level intake-status__level--${statusClassMap[status]}`}
            >
                {status}
            </span>

            <div className="intake-status__bar-container">
                <div className="intake-status__bar-track">
                    <div
                        className="intake-status__bar-indicator"
                        style={{ left: `${positionPercent}%` }}
                    />
                </div>
                <div className="intake-status__bar-labels">
                    <span>부족</span>
                    <span className="intake-status__label-center">
                        적정<br />({value.toFixed(1)})
                    </span>
                    <span>초과</span>
                </div>
            </div>
        </div>
    );
};

export default IntakeStatusItem;