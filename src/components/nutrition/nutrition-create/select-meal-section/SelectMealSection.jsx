import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./SelectMealSection.css";
import SelectedItem from "./selected-item/SelectedItem";
import FoodSearchItem from "./food-search-item/FoodSearchItem";
import SearchInput from "./search-input/SearchInput";
import RectButton from "../../../common/RectButton";
import { useAuthState } from "../../../../contexts/AuthContext";
import { useInView } from "react-intersection-observer";
import Swal from "sweetalert2";

const SelectMealSection = ({
    mealList,
    supplementList,
    favoriteMeals,
    favoriteSupplements,
    toggleFavoriteMeal,
    toggleFavoriteSupplement,
    registerMeals,
    registerSupplements,
}) => {
    const [selected, setSelected] = useState([]);
    const [query, setQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(20);
    const { user } = useAuthState();
    const [ref, inView] = useInView();

    const handleQuerySearch = useCallback((value) => {
        setQuery(value);
    }, []);

    const allItems = useMemo(() => {
        const favMealIds = new Set((favoriteMeals || []).map((f) => f?.food?.foodId));
        const favSupIds = new Set((favoriteSupplements || []).map((f) => f?.supplement?.supplementId));

        const meals = (mealList || []).map((m) => ({
            id: m.foodId,
            name: m.foodName,
            image: m.foodImage,
            kcal: m.calories,
            brand: m.foodCompany,
            isFavorite: favMealIds.has(m.foodId),
            type: "meal",
        }));

        const supplements = (supplementList || []).map((s) => ({
            id: s.supplementId,
            name: s.supplementName,
            image: s.supplementImage,
            kcal: s.calories,
            brand: s.company,
            isFavorite: favSupIds.has(s.supplementId),
            type: "supplement",
        }));

        return [...meals, ...supplements];
    }, [mealList, supplementList, favoriteMeals, favoriteSupplements]);

    const filteredList = useMemo(() => {
        return allItems.filter((item) =>
            !query || item.name?.toLowerCase().includes(query.toLowerCase())
        );
    }, [allItems, query]);

    const flattenedFavorites = useMemo(() => {
        const meals = (favoriteMeals || [])
            .map((item) => item?.food)
            .filter(Boolean)
            .map((food) => ({
                id: food.foodId,
                name: food.foodName,
                image: food.foodImage,
                type: "meal",
            }));

        const supplements = (favoriteSupplements || [])
            .map((item) => item?.supplement)
            .filter(Boolean)
            .map((supp) => ({
                id: supp.supplementId,
                name: supp.supplementName,
                image: supp.supplementImage,
                type: "supplement",
            }));

        return [...meals, ...supplements].filter(
            (item) => item.id && item.name && item.image
        );
    }, [favoriteMeals, favoriteSupplements]);

    useEffect(() => {
        setVisibleCount(20);
    }, [query]);

    useEffect(() => {
        if (inView && visibleCount < filteredList.length) {
            setVisibleCount((prev) => Math.min(prev + 20, filteredList.length));
        }
    }, [inView, filteredList.length]);

    const addToSelected = useCallback((item) => {
        setSelected((prev) => {
            if (prev.find((i) => i.id === item.id && i.type === item.type)) return prev;
            return [...prev, item];
        });
    }, []);

    const removeFromSelected = useCallback((id) => {
        setSelected((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const handleFavoriteToggle = useCallback(
        (item) => {
            if (!user?.token) return;
            const isMeal = item.type === "meal";
            if (isMeal) {
                toggleFavoriteMeal(user.token, item.id);
            } else {
                toggleFavoriteSupplement(user.token, item.id);
            }
        },
        [user, toggleFavoriteMeal, toggleFavoriteSupplement]
    );

    const handleAdd = useCallback(
        (item) => () => {
            addToSelected(item);
        },
        [addToSelected]
    );

    const handleToggle = useCallback(
        (item) => () => {
            handleFavoriteToggle(item);
        },
        [handleFavoriteToggle]
    );

    const handleReset = () => setSelected([]);

    const handleSubmit = async () => {
        const now = new Date().toISOString();
        const meals = selected.filter((item) => item.type === "meal");
        const supplements = selected.filter((item) => item.type === "supplement");

        if (user?.token) {
            await registerMeals(user.token, meals, now);
            await registerSupplements(user.token, supplements, now);
            Swal.fire({
                title: "식사 등록 완료",
                text: "성공적으로 등록되었습니다!",
                icon: "success",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
            });
            setSelected([]);
        }
    };

    return (
        <div className="select-meal-section">
            <div className="select-meal-section__title">
                오늘 먹은 <span>식단</span>과 <span>영양소</span>를 등록해주세요!
            </div>

            <div className="select-meal-section__container">
                <div className="select-meal-section__selected">
                    <div className="select-meal-section__label">식사</div>
                    <div className="select-meal-section__thumb-list">
                        {selected
                            .filter((item) => item.type === "meal")
                            .map((item) => (
                                <SelectedItem
                                    key={`sel-meal-${item.id}`}
                                    item={item}
                                    onRemove={removeFromSelected}
                                />
                            ))}
                    </div>

                    <div className="select-meal-section__label">영양제</div>
                    <div className="select-meal-section__thumb-list">
                        {selected
                            .filter((item) => item.type === "supplement")
                            .map((item) => (
                                <SelectedItem
                                    key={`sel-sup-${item.id}`}
                                    item={item}
                                    onRemove={removeFromSelected}
                                />
                            ))}
                    </div>

                    <div className="select-meal-section__label">즐겨찾기</div>
                    <div className="select-meal-section__thumb-list">
                        {flattenedFavorites.map((item) => (
                            <SelectedItem
                                key={`fav-${item.type}-${item.id}`}
                                item={item}
                                onRemove={() => handleFavoriteToggle(item)}
                            />
                        ))}
                    </div>
                </div>

                <div className="select-meal-section__list">
                    <SearchInput onSearch={handleQuerySearch} />

                    <div className="select-meal-section__items">
                        {filteredList.slice(0, visibleCount).map((item) => (
                            <FoodSearchItem
                                key={`food-${item.type}-${item.id}`}
                                item={item}
                                onAdd={handleAdd(item)}
                                onFavoriteToggle={handleToggle(item)}
                            />
                        ))}
                        {visibleCount < filteredList.length && (
                            <div ref={ref} style={{ height: "1px" }} />
                        )}
                    </div>
                </div>
            </div>

            <div className="select-meal-section__actions">
                <RectButton type="outline" text="취소" onClick={handleReset} />
                <RectButton type="default" text="등록" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default SelectMealSection;