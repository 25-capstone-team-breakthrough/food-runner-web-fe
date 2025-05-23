import React, { useEffect, useState } from "react";
import "./IntakeStatusItem.css";

const IntakeStatusItem = ({ name, status, value, minValue, maxValue }) => {
    const adequateValue = (minValue + maxValue) / 2;
    const maxGraphRange = maxValue * 1.5;
    const [percent, setPercent] = useState(0);

    const statusColorMap = {
        부족: "bar-deficient",
        적정: "bar-adequate",
        초과: "bar-excessive",
    };

    useEffect(() => {
        requestAnimationFrame(() => {
            setPercent(Math.min(value / maxGraphRange, 1) * 100);
        });
    }, [value, maxGraphRange]);

    return (
        <div className="intake-status__item">
            <span className="intake-status__nutrient">{name}</span>
            <span className={`intake-status__level intake-status__level--${statusColorMap[status]}`}>
                {status}
            </span>

            <div className="intake-status__bar-container">
                <div className="intake-status__bar-track">
                    <div
                        className={`intake-status__bar-fill ${statusColorMap[status]}`}
                        style={{ width: `${percent}%` }}
                    >
                        <div className="intake-status__bar-value-label">
                            {value.toFixed(1)}
                        </div>
                    </div>
                </div>

                <div className="intake-status__bar-labels">
                    <span>0</span>
                    <span className="intake-status__label-center">
                        적정<br />({adequateValue.toFixed(1)})
                    </span>
                    <span>{(maxGraphRange).toFixed(0)}</span>
                </div>
            </div>
        </div>
    );
};

export default IntakeStatusItem;