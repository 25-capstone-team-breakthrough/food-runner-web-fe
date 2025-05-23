import React, { useEffect, useRef, useState } from "react";
import { useNutritionState, useNutritionDispatch } from "../../../../contexts/NutritionContext";
import { useAuthState } from "../../../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../utils";
import "./FoodCarousel.css";

const FoodCarousel = () => {
    const { user } = useAuthState();
    const { mealLogs, supplementLogs } = useNutritionState();
    const { fetchMealLogs, fetchSupplementLogs } = useNutritionDispatch();

    const wrapperRef = useRef(null);
    const listRef = useRef(null);
    const [visibleItems, setVisibleItems] = useState(4);
    const [currentIndex, setCurrentIndex] = useState(1); // index 1부터 시작 (복제 앞 데이터)

    const itemWidth = 16; // rem 기준
    const transitionDuration = 300;

    // 데이터 불러오기
    useEffect(() => {
        if (user?.token) {
            fetchMealLogs(user.token);
            fetchSupplementLogs(user.token);
        }
    }, [user?.token]);

    // 정렬된 섭취 기록
    const getSortedNutritionLogs = (mealLogs, supplementLogs) => {
        const mealItems = [
            ...(mealLogs?.imageMealLogs || []),
            ...(mealLogs?.searchMealLogs || []),
        ].map((log) => ({
            type: "meal",
            date: log?.mealLog?.date || log?.date,
            name: log.foodName || log.mealName || "이름 없음",
            image: log.foodImage || "https://via.placeholder.com/80",
            calories: log.mealLog?.calories || 0,
        }));

        const supplementItems = (supplementLogs || []).map((log) => ({
            type: "supplement",
            date: log?.date,
            name: log.supplementData?.supplementName || "영양제",
            image: log.supplementData?.supplementImage || "https://via.placeholder.com/80",
            calories: 0,
        }));

        return [...mealItems, ...supplementItems]
            .filter(item => item.date)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    };

    const rawItems = getSortedNutritionLogs(mealLogs, supplementLogs);
    const nutritionItems = rawItems;
    const extendedItems = rawItems.length > 0
        ? [rawItems[rawItems.length - 1], ...rawItems, rawItems[0]]
        : [];

    // 요소 수 계산
    useEffect(() => {
        const updateVisibleItems = () => {
            if (wrapperRef.current) {
                const width = wrapperRef.current.offsetWidth;
                setVisibleItems(Math.max(1, Math.floor(width / (itemWidth * 1.25))));
            }
        };
        updateVisibleItems();
        window.addEventListener("resize", updateVisibleItems);
        return () => window.removeEventListener("resize", updateVisibleItems);
    }, []);

    // 무한 캐러셀 처리
    useEffect(() => {
        if (!listRef.current || nutritionItems.length === 0) return;

        const handleTransitionEnd = () => {
            listRef.current.style.transition = "none";
            if (currentIndex === 0) {
                setCurrentIndex(nutritionItems.length);
            } else if (currentIndex === nutritionItems.length + 1) {
                setCurrentIndex(1);
            }
            requestAnimationFrame(() => {
                if (listRef.current)
                    listRef.current.style.transition = `transform ${transitionDuration}ms ease-in-out`;
            });
        };

        const listEl = listRef.current;
        listEl.addEventListener("transitionend", handleTransitionEnd);
        return () => listEl.removeEventListener("transitionend", handleTransitionEnd);
    }, [currentIndex, nutritionItems.length]);

    if (nutritionItems.length === 0) {
        return (
            <div className="food-carousel__empty">
                최근 섭취한 음식 또는 영양제 데이터가 없습니다.
            </div>
        );
    }

    return (
        <div className="food-carousel">
            <div className="food-carousel__title">
                <div className="food-carousel__title-wrapper">
                    내가 섭취한 <span>음식을 한눈에!</span>
                </div>
            </div>

            <div className="food-carousel__list-wrapper" ref={wrapperRef}>
                <div
                    className="food-carousel__list"
                    ref={listRef}
                    style={{
                        transform: `translateX(-${currentIndex * itemWidth}rem)`,
                        transition: `transform ${transitionDuration}ms ease-in-out`,
                    }}
                >
                    {extendedItems.map((item, idx) => (
                        <div
                            key={idx}
                            className="food-carousel__item nutrition-item"
                            style={{ width: `${itemWidth}rem` }}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="nutrition-item__image"
                            />
                            <div className="nutrition-item__overlay">
                                <div className="nutrition-item__name">{item.name}</div>
                                <div className="nutrition-item__kcal">{item.calories}kcal</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="food-carousel__controls">
                <div className="food-carousel__slider">
                    <div
                        className="food-carousel__slider-bar"
                        style={{
                            left: `${((currentIndex - 1 + nutritionItems.length) % nutritionItems.length) / nutritionItems.length * 100}%`,
                        }}
                    />
                </div>
                <div className="food-carousel__indicator">
                    {(currentIndex - 1 + nutritionItems.length) % nutritionItems.length + 1} / {nutritionItems.length}
                </div>
                <div className="food-carousel__btn-wrapper">
                    <FontAwesomeIcon
                        icon={icons.faChevronLeft}
                        onClick={() => setCurrentIndex(i => i - 1)}
                        className="food-carousel__btn"
                    />
                    <FontAwesomeIcon
                        icon={icons.faChevronRight}
                        onClick={() => setCurrentIndex(i => i + 1)}
                        className="food-carousel__btn"
                    />
                </div>
            </div>
        </div>
    );
};

export default FoodCarousel;