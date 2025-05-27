import React, { useState, useMemo, useEffect, useCallback } from "react";
import "./RecipeList.css";
import nutritionRecipeTitle from "../../../../assets/images/nutrition-recipe-title.png";
import crownIcon from "../../../../assets/images/crown-icon.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../utils";
import { useNutritionDispatch, useNutritionState } from "../../../../contexts/NutritionContext";
import PageHeader from "../../../common/page-header/PageHeader";
import SearchInput from "../../../common/search-input/SearchInput";
import EmptyState from "../../../common/empty-state/EmptyState";

const RecipeList = () => {
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const { recipeList } = useNutritionState();
    const { fetchRecipes } = useNutritionDispatch();

    useEffect(() => {
        if (recipeList.length === 0) {
            fetchRecipes();
        }
    }, []);

    const handleQuerySearch = useCallback((value) => {
        setQuery(value);
    }, []);

    const filtered = useMemo(() => {
        return recipeList.filter((item) =>
            item.recipeName.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, recipeList]);

    const recipesPerPage = 15;
    const pageCount = Math.ceil(filtered.length / recipesPerPage);
    const paginated = filtered.slice((page - 1) * recipesPerPage, page * recipesPerPage);

    const popularRecipes = [...recipeList]
        .sort((a, b) => b.recommendedCount - a.recommendedCount)
        .slice(0, 3);

    const handleClick = (id) => {
        navigate(`/nutrition/recipe/${id}`);
    };

    const paginationGroupSize = 10;
    const currentGroup = Math.floor((page - 1) / paginationGroupSize);
    const startPage = currentGroup * paginationGroupSize + 1;
    const endPage = Math.min(startPage + paginationGroupSize - 1, pageCount);

    return (
        <div className="recipe-list">
            <PageHeader text={"레시피"} image={nutritionRecipeTitle} />
            <div className="recipe-list__popular__title">인기 레시피</div>
            <div className="recipe-list__popular-cards">
                {popularRecipes.map((recipe, index) => (
                    <div
                        key={recipe.recipeId}
                        className="recipe-list__popular-card"
                        onClick={() => handleClick(recipe.recipeId)}
                    >
                        {index === 1 && (
                            <img
                                src={crownIcon}
                                alt="CROWN"
                                className="recipe-list__crown"
                            />
                        )}
                        <img
                            className="recipe-list__image"
                            src={recipe.recipeImage}
                            alt={recipe.recipeName}
                        />
                        <div className="recipe-list__popular-name">{recipe.recipeName}</div>
                    </div>
                ))}
            </div>
            <SearchInput
                value={input}
                onChange={setInput}
                onSearch={handleQuerySearch}
                placeholder="레시피 이름을 입력해주세요"
            />
            {filtered.length === 0 ? (
                <EmptyState
                    icon={icons.faBoxOpen}
                    message="검색 결과가 없어요"
                />
                ) : (
                <>
                    <div className="recipe-list__grid">
                    {paginated.map((recipe) => (
                        <div
                            key={recipe.recipeId}
                            className="recipe-list__card"
                            onClick={() => handleClick(recipe.recipeId)}
                        >
                            <img src={recipe.recipeImage} alt={recipe.recipeName} />
                            <div className="recipe-list__card-name">{recipe.recipeName}</div>
                        </div>
                    ))}
                    </div>

                    <div className="recipe-list__pagination">
                        <FontAwesomeIcon
                            icon={icons.faChevronLeft}
                            className={`pagination-icon ${page === 1 ? "pagination__icon--disabled" : ""}`}
                            onClick={() => page > 1 && setPage(page - 1)}
                        />
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
                            const p = startPage + i;
                            return (
                                <button
                                    key={p}
                                    className={page === p ? "active" : ""}
                                    onClick={() => setPage(p)}
                                >
                                    {p}
                                </button>
                            );
                        })}
                        <FontAwesomeIcon
                            icon={icons.faChevronRight}
                            className={`pagination-icon ${page === pageCount ? "pagination__icon--disabled" : ""}`}
                            onClick={() => page < pageCount && setPage(page + 1)}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default RecipeList;