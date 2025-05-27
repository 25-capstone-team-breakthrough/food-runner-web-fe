import React from "react";
import "./DietRegenerateBox.css";
import RectButton from "../../../../common/rect-button/RectButton";
import PreferredIngredientList from "../../ingredient-tab/preferred-ingredient-list/PreferredIngredientList";

const DietRegenerateBox = ({ onRegenerateClick, preferredIngredients, isLoading }) => {
    return (
        <div className="diet-regenerate-box">
            <RectButton
                text={isLoading ? "재추천 중..." : "재추천"}
                type={"default"}
                disabled={isLoading}
                onClick={onRegenerateClick}
            />
            <PreferredIngredientList
                preferredIngredients={preferredIngredients}
                viewOnly={true}
            />
        </div>
    );
};

export default DietRegenerateBox;