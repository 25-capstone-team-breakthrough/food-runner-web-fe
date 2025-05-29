import React, { useEffect, useState } from "react";
import { useNutritionState, useNutritionDispatch } from "../../../../contexts/NutritionContext";
import { useAuthState } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../utils";
import "./FoodCarousel.css";
import fallbackFood from "../../../../assets/images/fallback-food.png";
import { useNavigate } from "react-router-dom";
import EmptyState from "../../../common/empty-state/EmptyState";

const FoodCarousel = () => {
    const { user } = useAuthState();
    const { mealLogs, supplementLogs } = useNutritionState();
    const { fetchMealLogs, fetchSupplementLogs } = useNutritionDispatch();

    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
    const [prevGroupIndex, setPrevGroupIndex] = useState(null);
    const [direction, setDirection] = useState("right");
    const navigate = useNavigate();
    const groupSize = 4;

    useEffect(() => {
        if (user?.token) {
            fetchMealLogs(user.token);
            fetchSupplementLogs(user.token);
        }
    }, [user?.token]);

    const getSortedNutritionLogs = (mealLogs, supplementLogs) => {
        const meals = [
            ...(mealLogs?.imageMealLogs || []),
            ...(mealLogs?.searchMealLogs || []),
        ].map(log => ({
            name: log.foodName || log.mealName || "음식",
            image: log.foodImage,
            calories: log.mealLog?.calories || 0,
            date: log?.mealLog?.date || log?.date,
        }));

        const supplements = (supplementLogs || []).map(log => ({
            name: log.supplementData?.supplementName || "영양제",
            image: log.supplementData?.supplementImage,
            calories: 0,
            date: log.date,
        }));

        return [...meals, ...supplements]
            .filter(item => item.date)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 16);
    };

    const nutritionItems = getSortedNutritionLogs(mealLogs, supplementLogs);
    const groups = [];

    for (let i = 0; i < nutritionItems.length; i += groupSize) {
        groups.push(nutritionItems.slice(i, i + groupSize));
    }

    const handleNext = () => {
        setDirection("right");
        setPrevGroupIndex(currentGroupIndex);
        setCurrentGroupIndex((prev) => (prev + 1) % groups.length);
    };

    const handlePrev = () => {
        setDirection("left");
        setPrevGroupIndex(currentGroupIndex);
        setCurrentGroupIndex((prev) => (prev - 1 + groups.length) % groups.length);
    };

    const renderGroup = (group, isActive, isPrev) => {
        let className = "food-carousel__group";
        if (isActive) className += " active slide-in-" + direction;
        else if (isPrev) className += " prev slide-out-" + direction;
        return (
            <div className={className}>
                {group.map((item, idx) => (
                    <div
                        className="food-carousel__item nutrition-item"
                        key={idx}
                        onClick={() => navigate("/nutrition/history")}
                    >
                        <img
                            src={item.image || fallbackFood}
                            alt={item.name}
                            className="nutrition-item__image"
                        />
                        <div className="nutrition-item__overlay">
                            <div className="nutrition-item__name">{item.name}</div>
                            <div className="nutrition-item__kcal">{Math.round(item.calories)}kcal</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="food-carousel">
            <div className="food-carousel__title">
                <div className="food-carousel__title-wrapper">
                내가 섭취한 <span>음식을 한번에!</span>
                </div>
            </div>

            {groups.length === 0 ? (
                <EmptyState
                icon={icons.faPlateUtensils}
                message={"최근 섭취한 음식 또는 영양제 데이터가 없어요"}
                />
            ) : (
                <>
                <div className="food-carousel__group-wrapper">
                    {groups.map((group, index) =>
                    index === currentGroupIndex || index === prevGroupIndex
                        ? renderGroup(group, index === currentGroupIndex, index === prevGroupIndex)
                        : null
                    )}
                </div>

                <div className="food-carousel__controls">
                    <div className="food-carousel__slider">
                    <div
                        className="food-carousel__slider-bar"
                        style={{
                        width: `${100 / groups.length}%`,
                        left: `${(currentGroupIndex / groups.length) * 100}%`
                        }}
                    />
                    </div>
                    <div className="food-carousel__indicator">
                    {currentGroupIndex + 1} / {groups.length}
                    </div>
                    <div className="food-carousel__btn-wrapper">
                    <FontAwesomeIcon
                        icon={icons.faChevronLeft}
                        onClick={handlePrev}
                        className="food-carousel__btn"
                    />
                    <FontAwesomeIcon
                        icon={icons.faChevronRight}
                        onClick={handleNext}
                        className="food-carousel__btn"
                    />
                    </div>
                </div>
                </>
            )}
        </div>
    );
};

export default FoodCarousel;