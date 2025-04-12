import React from "react";
import "./DietRegenerateBox.css";
import RectButton from "../../../../common/RectButton";
import PreferredIngredientList from "../../ingredient-tab/preferred-ingredient-list/PreferredIngredientList";

const DietRegenerateBox = ({ onRegenerateClick, preferredIngredients }) => {
    return (
        <div className="diet-regenerate-box">
            <RectButton text={"재생성하기"} type={"default"} onClick={onRegenerateClick} />
            <PreferredIngredientList
                ingredients={preferredIngredients}
                viewOnly={true}
            />
        </div>
    );
};

export default DietRegenerateBox;