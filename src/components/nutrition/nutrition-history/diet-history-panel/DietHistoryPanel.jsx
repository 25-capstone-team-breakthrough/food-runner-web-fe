import React from "react";
import "./DietHistoryPanel.css";
import MealLogItem from "./meal-log-item/MealLogItem";
import EmptyState from "../../../common/empty-state/EmptyState";
import { icons } from "../../../../utils";

const DietHistoryPanel = ({ dietData }) => {
    if (!dietData || dietData.length === 0) {
        return <EmptyState icon={icons.faPlateUtensils} message={"식사 기록이 없어요"} />;
    }

    const meals = dietData.filter(item => item.type === "meal");
    const supplements = dietData.filter(item => item.type === "supplement");

    return (
        <div className="diet-history-panel">
            {meals.length > 0 && (
                <div className="diet-history-panel__section">
                    <div className="diet-history-panel__section-label">식사</div>
                    <div className="diet-history-panel__list">
                        {meals.map((food, idx) => (
                            <MealLogItem key={`meal-${idx}`} food={food} />
                        ))}
                    </div>
                </div>
            )}

            {supplements.length > 0 && (
                <div className="diet-history-panel__section">
                    <div className="diet-history-panel__section-label">영양제</div>
                    <div className="diet-history-panel__list">
                        {supplements.map((sup, idx) => (
                            <MealLogItem key={`sup-${idx}`} food={sup} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DietHistoryPanel;