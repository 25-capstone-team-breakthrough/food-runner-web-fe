import React from "react";
import "./IngredientTab.css";
import PreferredIngredientList from "./preferred-ingredient-list/PreferredIngredientList";
import IngredientSearchSection from "./ingredient-search-section/IngredientSearchSection";

const IngredientTab = ({ preferredIngredients, setPreferredIngredients }) => {
    // 선택했던 선호 식재료 제거
    const handleRemove = (name) => {
        setPreferredIngredients(prev =>
            prev.filter((ingredient) => ingredient.name !== name)
        );
    };

    return (
        <div className="ingredient-tab">
            <PreferredIngredientList
                ingredients={preferredIngredients}
                onRemove={handleRemove}
            />
            <IngredientSearchSection
                preferredIngredients={preferredIngredients}
                setPreferredIngredients={setPreferredIngredients}
            />
        </div>
    );
};

export default IngredientTab;