import React, { useState } from "react";
import "./RecipeList.css";
import nutritionRecipeTitle from "../../../../assets/images/nutrition-recipe-title.png";
import crownIcon from "../../../../assets/images/crown-icon.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons, mockRecipes } from "../../../../utils";

const RecipeList = () => {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const recipesPerPage = 15;
    const filtered = mockRecipes.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );
    const pageCount = Math.ceil(filtered.length / recipesPerPage);
    const paginated = filtered.slice((page - 1) * recipesPerPage, page * recipesPerPage);

    const handleClick = (id) => {
        navigate(`/nutrition/recipe/${id}`);
    };

    // 페이지네이션 그룹 계산 (10개 단위)
    const paginationGroupSize = 10;
    const currentGroup = Math.floor((page - 1) / paginationGroupSize);
    const startPage = currentGroup * paginationGroupSize + 1;
    const endPage = Math.min(startPage + paginationGroupSize - 1, pageCount);

    return (
        <div className="recipe-list">
            <div className="recipe-list__title">|RECIPE|</div>
            <div className="recipe-list__title-img">
                <img src={nutritionRecipeTitle} alt="RECIPE title" />
            </div>
            <div className="recipe-list__popular__title">
                인기 레시피
            </div>
            <div className="recipe-list__popular-cards">
                {mockRecipes.slice(0, 3).map((recipe, index) => (
                    <div
                        key={recipe.id}
                        className="recipe-list__popular-card"
                        onClick={() => handleClick(recipe.id)}
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
                            src={recipe.image}
                            alt={recipe.name}
                        />
                        <div className="recipe-list__popular-name">{recipe.name}</div>
                    </div>
                ))}
            </div>

            <div className="recipe-list__search-wrapper">
                <FontAwesomeIcon
                    icon={icons.faMagnifyingGlass}
                    className="recipe-list__search-icon"
                    onClick={() => setQuery(search)}
                />
                <input
                    className="recipe-list__search-input"
                    type="text"
                    placeholder="식재료 이름을 입력해주세요"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            setQuery(search);
                        }
                    }}
                />
                {query && (
                    <FontAwesomeIcon
                        icon={icons.faCircleXmark}
                        className="recipe-list__search-clear-icon"
                        onClick={() => {
                            setSearch("");
                            setQuery("");
                        }}
                    />
                )}
            </div>

            <div className="recipe-list__grid">
                {paginated.map((recipe) => (
                    <div
                        key={recipe.id}
                        className="recipe-list__card"
                        onClick={() => handleClick(recipe.id)}
                    >
                        <img src={recipe.image} alt={recipe.name} />
                        <div className="recipe-list__card-name">{recipe.name}</div>
                    </div>
                ))}
            </div>

            <div className="recipe-list__pagination">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    &lt;
                </button>

                {/* 10개 그룹만큼 페이지 버튼 출력 */}
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

                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
                    disabled={page === pageCount}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
};

export default RecipeList;