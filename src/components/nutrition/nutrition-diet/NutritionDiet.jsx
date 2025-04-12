import React, { useState } from "react";
import "./NutritionDiet.css";
import nutritionDietTitle from "../../../assets/images/nutrition-diet-title.png";
import IngredientTab from "./ingredient-tab/IngredientTab";
import DietTab from "./diet-tab/DietTab";
import { mockIngredients } from "../../../utils";

const NutritionDiet = () => {
    const [activeTab, setActiveTab] = useState("ingredient");
    const [preferredIngredients, setPreferredIngredients] = useState([
        mockIngredients[0],
        mockIngredients[3],
        mockIngredients[5]
    ]);

    return (
        <div className="nutrition-diet">
            <div className="nutrition-diet__title">|DIET|</div>
            <div className="nutrition-diet__title-img">
                <img src={nutritionDietTitle} alt="DIET title" />
            </div>

            <div className="nutrition-diet__tabs">
                <div
                    className={`nutrition-diet__tab ${activeTab === "diet" ? "active" : ""}`}
                    onClick={() => setActiveTab("diet")}
                >
                    식단
                </div>
                <div
                    className={`nutrition-diet__tab ${activeTab === "ingredient" ? "active" : ""}`}
                    onClick={() => setActiveTab("ingredient")}
                >
                    식재료
                </div>
            </div>

            <div className="nutrition-diet__content">
                {activeTab === "ingredient" ? (
                    <IngredientTab
                        preferredIngredients={preferredIngredients}
                        setPreferredIngredients={setPreferredIngredients}
                    />
                ) : (
                    <DietTab preferredIngredients={preferredIngredients} />
                )}
            </div>
        </div>
    );
};

export default NutritionDiet;