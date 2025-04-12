import React, { useState } from "react";
import "./IngredientSearchSection.css";
import IngredientCard from "./ingredient-card/IngredientCard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons, mockIngredients } from "../../../../../utils";

const IngredientSearchSection = ({ preferredIngredients, setPreferredIngredients }) => {
    const [search, setSearch] = useState("");

    const filtered = mockIngredients.filter((item) =>
        item.name.includes(search)
    );

    const handleAdd = (ingredient) => {
        if (!preferredIngredients.find((i) => i.name === ingredient.name)) {
            setPreferredIngredients([...preferredIngredients, ingredient]);
        }
    };

    return (
        <div className="ingredient-search-section">
            <div className="ingredient-search-section__label">
                식재료 추가
            </div>
            <div className="ingredient-search-section__search-wrapper">
                <FontAwesomeIcon icon={icons.faMagnifyingGlass} className="ingredient-search-section__icon" />
                <input
                    className="ingredient-search-section__input"
                    type="text"
                    placeholder="식재료 이름을 입력해주세요"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="ingredient-search-section__list">
                {filtered.map((item, index) => (
                    <IngredientCard
                        key={index}
                        ingredient={item}
                        onAdd={() => handleAdd(item)}
                    />
                ))}
            </div>
        </div>
    );
};

export default IngredientSearchSection;