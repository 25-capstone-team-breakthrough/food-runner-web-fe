import React, { useCallback, useEffect, useState } from "react";
import "./NutritionDiet.css";
import nutritionDietTitle from "../../../assets/images/nutrition-diet-title.png";
import IngredientTab from "./ingredient-tab/IngredientTab";
import DietTab from "./diet-tab/DietTab";
import { useNutritionState, useNutritionDispatch } from "../../../contexts/NutritionContext";
import { useAuthState } from "../../../contexts/AuthContext";
import PageHeader from "../../common/page-header/PageHeader";

const NutritionDiet = () => {
    const [activeTab, setActiveTab] = useState("diet");

    const {
        ingredientList,
        preferredIngredients,
        recommendedMeals
    } = useNutritionState();

    const {
        fetchIngredients,
        fetchPreferredIngredients,
        fetchRecommendedMeals,
        savePreferredIngredient,
        deletePreferredIngredient
    } = useNutritionDispatch();

    const { user } = useAuthState();

    useEffect(() => {
        if (user?.token) {
            fetchIngredients(user.token);
            fetchPreferredIngredients(user.token);
            fetchRecommendedMeals(user.token);
        }
    }, [user]);

    // 선호 식재료 추가
    const handleAdd = useCallback((ingredient) => {
        if (!preferredIngredients.find((p) => p.ingredient.ingredientId === ingredient.ingredientId)) {
            savePreferredIngredient(user.token, ingredient.ingredientId);
        }
    }, [preferredIngredients, savePreferredIngredient, user]);

    // 선호 식재료 삭제
    const handleRemove = useCallback((ingredientId) => {
        deletePreferredIngredient(user.token, ingredientId);
    }, [deletePreferredIngredient, user]);

    console.log(ingredientList);
    console.log(preferredIngredients);
    console.log(recommendedMeals);

    return (
        <div className="nutrition-diet">
            <PageHeader text={"식단 추천"} image={nutritionDietTitle} />
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
                {activeTab === "diet" ? (
                    <DietTab
                    preferredIngredients={preferredIngredients}
                    recommendedMeals={recommendedMeals}
                />
                ) : (
                    <IngredientTab
                        ingredientList={ingredientList}
                        preferredIngredients={preferredIngredients}
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                    />
                )}
            </div>
        </div>
    );
};

export default NutritionDiet;