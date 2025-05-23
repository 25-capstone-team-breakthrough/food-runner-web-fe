import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecommendedCarousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";

const RecommendedCarousel = ({ recipes }) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 3;
    const navigate = useNavigate();

    const handlePrev = () => {
        setStartIndex((prev) =>
            (prev - itemsPerPage + recipes.length) % recipes.length
        );
    };

    const handleNext = () => {
        setStartIndex((prev) =>
            (prev + itemsPerPage) % recipes.length
        );
    };

    const visibleRecipes = Array.from({ length: itemsPerPage }, (_, i) => {
        const index = (startIndex + i) % recipes.length;
        return recipes[index];
    });

    const handleClick = (id) => {
        navigate(`/nutrition/recipe/${id}`);
    };

    return (
        <div className="recommended-carousel">
            <FontAwesomeIcon
                icon={icons.faChevronLeft}
                className="recommended-carousel__arrow"
                onClick={handlePrev}
            />
            <div className="recommended-carousel__track">
                {visibleRecipes.map((recipe) => (
                    <div
                        key={recipe.recipeId}
                        className="recommended-carousel__card"
                        onClick={() => handleClick(recipe.recipeId)}
                    >
                        <img src={recipe.recipeImage} alt={recipe.recipeName} />
                        <div className="recommended-carousel__name">{recipe.recipeName}</div>
                    </div>
                ))}
            </div>
            <FontAwesomeIcon
                icon={icons.faChevronRight}
                className="recommended-carousel__arrow"
                onClick={handleNext}
            />
        </div>
    );
};

export default RecommendedCarousel;