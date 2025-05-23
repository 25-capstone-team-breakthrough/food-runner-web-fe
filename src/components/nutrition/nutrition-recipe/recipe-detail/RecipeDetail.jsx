import React, { useEffect } from "react";
import "./RecipeDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { useNutritionState } from "../../../../contexts/NutritionContext";
import RecommendedCarousel from "./recommended-carousel/RecommendedCarousel";

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { recipeList } = useNutritionState();

    useEffect(() => {
        if (recipeList.length === 0) {
            navigate("/nutrition/recipe");
        }
    }, [recipeList, navigate]);

    const recipe = recipeList.find((r) => r.recipeId === Number(id));
    if (!recipe) {
        return null;
    }

    const relatedIds = [
        Number(recipe.relatedRecipe1),
        Number(recipe.relatedRecipe2),
        Number(recipe.relatedRecipe3),
    ].filter(Boolean);

    const relatedRecipes = recipeList.filter((r) => relatedIds.includes(r.recipeId));

    return (
        <div className="recipe-detail">
            <div className="recipe-detail__title">|RECIPE|</div>
            <div className="recipe-detail__header">
                <img src={recipe.recipeImage} alt={recipe.recipeName} className="recipe-detail__image" />
                <div className="recipe-detail__info">
                    <div className="recipe-detail__name">{recipe.recipeName}</div>
                    <div className="recipe-detail__serving">{`영양 성분 (${recipe.serving})`}</div>
                    <div className="recipe-detail__nutrients">
                        <div>칼로리: {recipe.calories} kcal</div>
                        <div>단백질: {recipe.protein} g</div>
                        <div>지방: {recipe.fat} g</div>
                        <div>탄수화물: {recipe.carbohydrate} g</div>
                    </div>
                </div>
            </div>

            <div className="recipe-detail__ingredients">
                <div className="recipe-detail__ingredients__left">재료</div>
                <div className="recipe-detail__ingredients__right">{recipe.ingredients}</div>
            </div>

            <div className="recipe-detail__step">
                <div className="recipe-detail__step__left">만드는 법</div>
                <div className="recipe-detail__step__right">
                    {recipe.recipe.split("\n").map((step, idx) => (
                        <div key={idx}>{`${idx + 1}. ${step}`}</div>
                    ))}
                </div>
            </div>

            <div className="recipe-detail__recommend">
                <div className="recipe-detail__recommend__title">
                    {recipe.recipeName}
                    <p>와 유사한 추천 레시피</p>
                </div>
                <div className="recipe-detail__carousel-wrapper">
                    <RecommendedCarousel recipes={relatedRecipes} />
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;