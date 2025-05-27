import React from "react";
import "./DietRegenerateBox.css";
import RectButton from "../../../../common/rect-button/RectButton";
import PreferredIngredientList from "../../ingredient-tab/preferred-ingredient-list/PreferredIngredientList";

const DietRegenerateBox = ({ onRegenerateClick, preferredIngredients }) => {
    return (
        <div className="diet-regenerate-box">
            <RectButton text={"재추천"} type={"default"} onClick={onRegenerateClick} />
            <PreferredIngredientList
                preferredIngredients={preferredIngredients}
                viewOnly={true}
            />
        </div>
    );
};

export default DietRegenerateBox;