import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./SelectMealSection.css";
import SelectedItem from "./selected-item/SelectedItem";
import FoodSearchItem from "./food-search-item/FoodSearchItem";
import RectButton from "../../../common/rect-button/RectButton";
import { useAuthState } from "../../../../contexts/AuthContext";
import { useInView } from "react-intersection-observer";
import { icons } from "../../../../utils";
import EmptyState from "../../../common/empty-state/EmptyState";
import FavoriteItem from "./selected-item/FavoriteItem";
import SearchInput from "../../../common/search-input/SearchInput";
import { showCustomAlert } from "../../../../custom-alert/customAlert";

const SelectMealSection = ({
    mealList,
    supplementList,
    favoriteMeals,
    favoriteSupplements,
    toggleFavoriteMeal,
    toggleFavoriteSupplement,
    registerMeals,
    registerSupplements,
    fetchNutritionLogs,
    fetchRecommendedNutrients
}) => {
    const [selected, setSelected] = useState([]);
    const [query, setQuery] = useState("");
    const [input, setInput] = useState("");
    const [visibleCount, setVisibleCount] = useState(20);
    const { user } = useAuthState();
    const [ref, inView] = useInView();

    const handleQuerySearch = useCallback((value) => {
        setQuery(value);
    }, []);

    const allItems = useMemo(() => {
        const favMealIds = new Set((favoriteMeals || []).map((f) => f?.food?.foodId));
        const favSupIds = new Set((favoriteSupplements || []).map((f) => f?.supplementData?.supplementId));

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
            mainNutrition: s.mainNutrition,
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
            .map((item) => item?.supplementData)
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

    console.log("필터된 즐겨찾기");
    console.log(flattenedFavorites);

    const selectedMealItems = useMemo(
        () => selected.filter((item) => item.type === "meal"),
        [selected]
    );

    const selectedSupplementItems = useMemo(
        () => selected.filter((item) => item.type === "supplement"),
        [selected]
    );

    useEffect(() => {
        setVisibleCount(20);
    }, [query]);

    useEffect(() => {
        if (inView && visibleCount < filteredList.length) {
            setVisibleCount((prev) => Math.min(prev + 20, filteredList.length));
        }
    }, [inView, filteredList.length]);

    // 선택
    const addToSelected = useCallback((item) => {
        setSelected((prev) => {
            if (prev.find((i) => i.id === item.id && i.type === item.type)) return prev;
            return [...prev, item];
        });
    }, []);

    // 선택 해제
    const removeFromSelected = useCallback((id) => {
        setSelected((prev) => prev.filter((item) => item.id !== id));
    }, []);

    // 즐겨찾기 등록, 해제 
    const handleFavoriteToggle = useCallback((item) => {
        if (!user?.token) return;
        const isMeal = item.type === "meal";
        if (isMeal) {
            toggleFavoriteMeal(user.token, item.id);
        } else {
            toggleFavoriteSupplement(user.token, item.id);
        }
    }, [user, toggleFavoriteMeal, toggleFavoriteSupplement]);

    // 초기화
    const handleReset = useCallback(async () => {
        const result = await showCustomAlert({
            title: "초기화",
            text: "선택한 음식과 영양제가 모두 제거됩니다",
            icon: "warning",
            showCancelButton: true,
        });
    
        if (result.isConfirmed) {
            setSelected([]);
            setInput("");
            setQuery("");
        }
    }, []);

    // 등록
    const handleSubmit = async () => {
        const now = new Date().toISOString();
        const meals = selectedMealItems;
        const supplements = selectedSupplementItems;

        if (meals.length <= 0 && supplements.length <= 0) {
            showCustomAlert({
                title: "등록 실패",
                text: "음식이나 영양제를 하나 이상 선택해주세요",
                icon: "warning",
            });
            return;
        }

        if (user?.token) {
            // 식사, 영양제 등록
            await registerMeals(user.token, meals, now);
            await registerSupplements(user.token, supplements, now);

            // Radar, Intake UI 리렌더 유도
            await fetchNutritionLogs(user.token);
            await fetchRecommendedNutrients(user.token);

            await showCustomAlert({
                title: "등록 완료",
                text: "성공적으로 등록되었습니다!",
                icon: "success",
            });
              
            window.scrollTo({ top: 0, behavior: "auto" });                
            
            setSelected([]);
            setInput("");
            setQuery("");
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
                    {selectedMealItems.length === 0 ? (
                        <EmptyState icon={icons.faPlateUtensils} />
                    ) : (
                        <div className="select-meal-section__thumb-list">
                            {selectedMealItems.map((item) => (
                                <SelectedItem
                                    key={`sel-meal-${item.id}`}
                                    item={item}
                                    onRemove={removeFromSelected}
                                />
                            ))}
                        </div>
                    )}

                    <div className="select-meal-section__label">영양제</div>
                    {selectedSupplementItems.length === 0 ? (
                        <EmptyState icon={icons.faPills} />
                    ) : (
                        <div className="select-meal-section__thumb-list">
                            {selectedSupplementItems.map((item) => (
                                <SelectedItem
                                    key={`sel-sup-${item.id}`}
                                    item={item}
                                    onRemove={removeFromSelected}
                                />
                            ))}
                        </div>
                    )}

                    <div className="select-meal-section__label">즐겨찾기</div>
                    {flattenedFavorites.length === 0 ? (
                        <EmptyState icon={icons.faStar} />
                    ) : (
                        <div className="select-meal-section__thumb-list">
                            {flattenedFavorites.map((item) => (
                                <FavoriteItem
                                    key={`fav-${item.type}-${item.id}`}
                                    item={item}
                                    onAdd={addToSelected}
                                    onUnfavorite={handleFavoriteToggle}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="select-meal-section__list">
                    <SearchInput
                        value={input}
                        onChange={setInput}
                        onSearch={handleQuerySearch}
                        placeholder="음식이나 영양제를 검색해주세요"
                    />

                    {filteredList.length === 0 ? (
                        <EmptyState
                        icon={icons.faBoxOpen}
                        message="검색 결과가 없어요"
                        />
                    ) : (
                        <div className="select-meal-section__items">
                            {filteredList.slice(0, visibleCount).map((item) => (
                                <FoodSearchItem
                                    key={`food-${item.type}-${item.id}`}
                                    item={item}
                                    isSelected={selected.some(
                                        (s) => s.id === item.id && s.type === item.type
                                    )}
                                    onAdd={() => addToSelected(item)}
                                    onRemove={removeFromSelected}
                                    onFavoriteToggle={() => handleFavoriteToggle(item)}
                                />
                            ))}
                            {visibleCount < filteredList.length && (
                                <div ref={ref} style={{ height: "1px" }} />
                            )}
                        </div>
                    )}
                </div>
            </div>
            <div className="select-meal-section__actions">
                <RectButton type="outline" text="초기화" onClick={handleReset} />
                <RectButton type="default" text="등록" onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default React.memo(SelectMealSection);