import React, { useEffect, useState } from "react";
import "./NutritionDiet.css";
import nutritionDietTitle from "../../../assets/images/nutrition-diet-title.png";
import IngredientTab from "./ingredient-tab/IngredientTab";
import DietTab from "./diet-tab/DietTab";
import { useNutritionState, useNutritionDispatch } from "../../../contexts/NutritionContext";
import { useAuthState } from "../../../contexts/AuthContext";

const NutritionDiet = () => {
    const [activeTab, setActiveTab] = useState("ingredient");
    const {
        ingredientList,
        preferredIngredients
    } = useNutritionState();
    const {
        fetchIngredients,
        fetchPreferredIngredients,
        savePreferredIngredient,
        deletePreferredIngredient
    } = useNutritionDispatch();
    const { user } = useAuthState();

    useEffect(() => {
        if (user?.token) {
            fetchIngredients(user.token);
            fetchPreferredIngredients(user.token);
        }
    }, [user]);

    // 선호 식재료 추가
    const handleAdd = (ingredient) => {
        if (!preferredIngredients.find((p) => p.ingredient.ingredientId === ingredient.ingredientId)) {
            savePreferredIngredient(user.token, ingredient.ingredientId);
        }
    };

    // 선호 식재료 삭제
    const handleRemove = (ingredientId) => {
        deletePreferredIngredient(user.token, ingredientId);
    };

    console.log(ingredientList);
    console.log(preferredIngredients);

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
                        ingredientList={ingredientList}
                        preferredIngredients={preferredIngredients}
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                    />
                ) : (
                    <DietTab preferredIngredients={preferredIngredients} />
                )}
            </div>
        </div>
    );
};

export default NutritionDiet;