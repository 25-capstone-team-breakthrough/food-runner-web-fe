import React from "react";
import "./IngredientTab.css";
import PreferredIngredientList from "./preferred-ingredient-list/PreferredIngredientList";
import IngredientSearchSection from "./ingredient-search-section/IngredientSearchSection";

const IngredientTab = ({ ingredientList, preferredIngredients, onAdd, onRemove }) => {
    return (
        <div className="ingredient-tab">
            <PreferredIngredientList
                preferredIngredients={preferredIngredients}
                onRemove={onRemove}
            />
            <IngredientSearchSection
                ingredientList={ingredientList}
                preferredIngredients={preferredIngredients}
                onAdd={onAdd}
            />
        </div>
    );
};

export default IngredientTab;