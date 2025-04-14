import React, { useEffect } from "react";
import "./RecipeDetail.css";
import { useParams } from "react-router-dom";
import { mockRecipes } from "../../../../utils";
import RecommendedCarousel from "./recommended-carousel/RecommendedCarousel";

const RecipeDetail = () => {
    const { id } = useParams();
    const recipe = mockRecipes.find((r) => r.id === Number(id));

    // 목 데이터에서 1~3번 이상 인덱스는 목록 출력만을 위한 것이어서 세부 데이터가 없음
    if (!recipe.nutrients) {
        return <div>레시피를 찾을 수 없습니다.</div>;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div className="recipe-detail">
            <div className="recipe-detail__title">|RECIPE|</div>
            <div className="recipe-detail__header">
                <img src={recipe.image} alt={recipe.name} className="recipe-detail__image" />
                <div className="recipe-detail__info">
                    <div className="recipe-detail__name">{recipe.name}</div>
                    <div className="recipe-detail__serving">영양 성분 (1인분, 250~300g)</div>
                    <div className="recipe-detail__nutrients">
                        {Object.entries(recipe.nutrients).map(([key, value]) => (
                            <div key={key}>
                                {`${translateNutrient(key)}: ${value}`}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="recipe-detail__ingredients">
                <div className="recipe-detail__ingredients__left">
                    재료
                </div>
                <div className="recipe-detail__ingredients__right">
                    {recipe.ingredients.join(", ")}
                </div>
            </div>

            <div className="recipe-detail__step">
                <div className="recipe-detail__step__left">
                    만드는 법
                </div>
                <div className="recipe-detail__step__right">
                    {recipe.instructions.map((step, idx) => (
                        <div key={idx}>{`${idx + 1}. ${step}`}</div>
                    ))}
                </div>
            </div>

            <div className="recipe-detail__recommend">
                <div className="recipe-detail__recommend__title">
                    {recipe.name}
                    <p>와 유사한 추천 레시피</p>
                </div>
                <div className="recipe-detail__carousel-wrapper">
                    <RecommendedCarousel recipes={mockRecipes.filter(r => r.id !== Number(id))} />
                </div>
            </div>
        </div>
    );
};

const translateNutrient = (key) => {
    const map = {
        calories: "칼로리",
        protein: "단백질",
        fat: "지방",
        carbs: "탄수화물",
        fiber: "식이섬유",
        salt: "염류",
        sodium: "나트륨",
    };
    return map[key] || key;
};

export default RecipeDetail;