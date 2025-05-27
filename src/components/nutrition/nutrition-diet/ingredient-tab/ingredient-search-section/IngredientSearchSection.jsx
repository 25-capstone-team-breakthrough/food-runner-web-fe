import "./IngredientSearchSection.css";
import { useState, useEffect, useCallback, useMemo } from "react";
import IngredientCard from "./ingredient-card/IngredientCard";
import { useInView } from "react-intersection-observer";
import SearchInput from "../../../../common/search-input/SearchInput";
import EmptyState from "../../../../common/empty-state/EmptyState";
import { icons } from "../../../../../utils";

const IngredientSearchSection = ({ ingredientList = [], preferredIngredients = [], onAdd, onRemove }) => {
    const [input, setInput] = useState("");
    const [query, setQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(20);
    const [ref, inView] = useInView();

    const handleQuerySearch = useCallback((value) => {
        setQuery(value);
    }, []);

    const filtered = Array.isArray(ingredientList)
        ? ingredientList
              .filter((item) => item && item.ingredientName)
              .filter((item) =>
                  !query || item.ingredientName.toLowerCase().includes(query.toLowerCase())
              )
        : [];

    useEffect(() => {
        setVisibleCount(20);
    }, [query]);

    useEffect(() => {
        if (inView && visibleCount < filtered.length) {
            setVisibleCount((prev) => Math.min(prev + 20, filtered.length));
        }
    }, [inView, filtered.length]);

    const preferredSet = useMemo(() => 
        new Set(preferredIngredients.map(p => p.ingredient.ingredientId)), 
        [preferredIngredients]
    );

    // 카드에 삭제를 위한 id 전달
    const preferredIdMap = useMemo(() => {
        const map = new Map();
        preferredIngredients.forEach(p => {
            map.set(p.ingredient.ingredientId, p.id);
        });
        return map;
    }, [preferredIngredients]);
      
    return (
        <div className="ingredient-search-section">
            <div className="ingredient-search-section__label">식재료 추가</div>
            <SearchInput
                value={input}
                onChange={setInput}
                onSearch={handleQuerySearch}
                placeholder="식재료 이름을 입력해주세요"
            />
            {filtered.length === 0 ? (
                <EmptyState
                    icon={icons.faBoxOpen}
                    message="검색 결과가 없어요"
                />
                ) : (
                <div className="ingredient-search-section__list">
                    {filtered.slice(0, visibleCount).map((item) => (
                    <IngredientCard
                        key={item.ingredientId}
                        ingredient={item}
                        isAdded={preferredSet.has(item.ingredientId)}
                        onAdd={() => onAdd(item)}
                        onRemove={() => {
                            const preferredId = preferredIdMap.get(item.ingredientId);
                            if (preferredId) onRemove(preferredId);
                        }}
                    />
                    ))}
                    {visibleCount < filtered.length && (
                    <div ref={ref} style={{ height: "1px" }} />
                    )}
                </div>
            )}
        </div>
    );
};

export default IngredientSearchSection;