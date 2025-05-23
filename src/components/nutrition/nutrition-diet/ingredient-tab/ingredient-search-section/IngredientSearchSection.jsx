import "./IngredientSearchSection.css";
import { useState, useEffect } from "react";
import IngredientCard from "./ingredient-card/IngredientCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";
import { useInView } from "react-intersection-observer";

const IngredientSearchSection = ({ ingredientList = [], preferredIngredients = [], onAdd }) => {
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(20);
    const [ref, inView] = useInView();

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

    return (
        <div className="ingredient-search-section">
            <div className="ingredient-search-section__label">식재료 추가</div>
            <div className="ingredient-search-section__search-wrapper">
                <FontAwesomeIcon
                    icon={icons.faMagnifyingGlass}
                    className="ingredient-search-section__icon"
                    onClick={() => setQuery(search)}
                />
                <input
                    className="ingredient-search-section__input"
                    type="text"
                    placeholder="식재료 이름을 입력해주세요"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") setQuery(search);
                    }}
                />
                {query && (
                    <FontAwesomeIcon
                        icon={icons.faCircleXmark}
                        className="ingredient-search-section__search-clear-icon"
                        onClick={() => {
                            setSearch("");
                            setQuery("");
                        }}
                    />
                )}
            </div>
            <div className="ingredient-search-section__list">
                {filtered.slice(0, visibleCount).map((item, index) => (
                    <IngredientCard
                        key={index}
                        ingredient={item}
                        isAdded={preferredIngredients.some((p) => p.ingredient.ingredientId === item.ingredientId)}
                        onAdd={() => onAdd(item)}
                    />
                ))}
                {visibleCount < filtered.length && <div ref={ref} style={{ height: "1px" }} />}
            </div>
        </div>
    );
};

export default IngredientSearchSection;