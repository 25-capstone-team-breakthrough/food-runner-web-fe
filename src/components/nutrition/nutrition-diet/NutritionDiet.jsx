import React, { useCallback, useEffect, useState } from "react";
import "./NutritionDiet.css";
import nutritionDietTitle from "../../../assets/images/nutrition-diet-title.png";
import IngredientTab from "./ingredient-tab/IngredientTab";
import DietTab from "./diet-tab/DietTab";
import { useNutritionState, useNutritionDispatch } from "../../../contexts/NutritionContext";
import { useAuthState } from "../../../contexts/AuthContext";
import PageHeader from "../../common/page-header/PageHeader";
import { showCustomAlert } from "../../../custom-alert/customAlert";

const NutritionDiet = () => {
    const [activeTab, setActiveTab] = useState("diet");

    const {
        ingredientList,
        preferredIngredients,
        recommendedMeals,
        loading
    } = useNutritionState();

    const {
        fetchIngredients,
        fetchPreferredIngredients,
        fetchRecommendedMeals,
        savePreferredIngredient,
        deletePreferredIngredient,
        regenerateOneRecommendedMeal
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

    // 선택 식단 재추천
    const handlePartialRegenerate = async (selectedMeals) => {
        const dayMap = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        const typeMap = ["breakfast", "lunch", "dinner"];
    
        const targets = [];
    
        selectedMeals.forEach((dayData, dayIndex) => {
            dayData.meals.forEach((meal, mealIndex) => {
                if (meal.checked) {
                    targets.push({
                        dayOfWeek: dayMap[dayIndex],
                        dietType: typeMap[mealIndex]
                    });
                }
            });
        });
    
        if (targets.length === 0) {
            await showCustomAlert({
                title: "알림",
                text: "재생성할 식단을 선택해주세요.",
                icon: "warning"
            });
            return;
        }
    
        try {
            // 병렬 요청
            await Promise.all(
                targets.map(({ dayOfWeek, dietType }) =>
                    regenerateOneRecommendedMeal(user.token, dayOfWeek, dietType)
                )
            );
    
            await showCustomAlert({
                title: "성공",
                text: "선택한 식단을 재추천 하였습니다",
                icon: "success"
            });
    
            await fetchRecommendedMeals(user.token);
        } catch (e) {
            console.error("부분 재생성 실패:", e);
            await showCustomAlert({
                title: "오류",
                text: "재추천 중 일부 항목에서 문제가 발생했습니다",
                icon: "error"
            });
        }
    };

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
                        onPartialRegenerate={handlePartialRegenerate}
                        isLoading={loading.recommendedMeals}
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