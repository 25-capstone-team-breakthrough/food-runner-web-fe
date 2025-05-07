import React, { useState } from "react";
import "./SelectMealSection.css";
import FoodSearchItem from "./food-search-item/FoodSearchItem";
import SelectedItem from "./selected-item/SelectedItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons, initialMeals } from "../../../../utils";
import RectButton from "../../../common/RectButton";

const SelectMealSection = () => {
    const [selected, setSelected] = useState([]);
    const [mealList, setMealList] = useState(initialMeals);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState("");

    const toggleFavorite = (id) => {
        setMealList((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    const addToSelected = (item) => {
        if (!selected.find((i) => i.id === item.id)) {
            setSelected([...selected, item]);
        }
    };

    const removeFromSelected = (id) => {
        setSelected(selected.filter((item) => item.id !== id));
    };

    const handleReset = () => setSelected([]);

    const filteredList = mealList.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="select-meal-section">
            <div className="select-meal-section__title">
                오늘 먹은 <span>식단</span>과 <span>영양소</span>를 등록해주세요!
            </div>
            <div className="select-meal-section__container">
                <div className="select-meal-section__selected">
                    <div className="select-meal-section__label">
                        식사
                    </div>
                    <div className="select-meal-section__group">
                        <div className="select-meal-section__thumb-list">
                            {selected
                                .filter((item) => item.type === "meal")
                                .map((item) => (
                                    <SelectedItem key={item.id} item={item} onRemove={removeFromSelected} />
                                ))}
                        </div>
                    </div>
                    <div className="select-meal-section__label">
                        영양제
                    </div>
                    <div className="select-meal-section__group">
                        <div className="select-meal-section__thumb-list">
                            {selected
                                .filter((item) => item.type === "supplement")
                                .map((item) => (
                                    <SelectedItem key={item.id} item={item} onRemove={removeFromSelected} />
                                ))}
                        </div>
                    </div>
                    <div className="select-meal-section__label">
                        즐겨찾기
                    </div>
                    <div className="select-meal-section__group">
                        <div className="select-meal-section__thumb-list">
                            {mealList
                                .filter((item) => item.isFavorite)
                                .map((item) => (
                                    <SelectedItem
                                        key={`fav-${item.id}`}
                                        item={item}
                                        onRemove={() => toggleFavorite(item.id)}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
                <div className="select-meal-section__list">
                    <div className="select-meal-section__search-wrapper">
                        <FontAwesomeIcon
                            icon={icons.faMagnifyingGlass}
                            className="select-meal-section__search-icon"
                            onClick={() => setQuery(search)}
                        />
                        <input
                            className="select-meal-section__search-input"
                            type="text"
                            placeholder="식사나 영양제를 검색해주세요"
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
                                className="select-meal-section__search-clear-icon"
                                onClick={() => {
                                    setSearch("");
                                    setQuery("");
                                }}
                            />
                        )}
                    </div>
                    <div className="select-meal-section__items">
                        {filteredList.map((item) => (
                            <FoodSearchItem
                                key={item.id}
                                item={item}
                                onFavoriteToggle={toggleFavorite}
                                onAdd={() => addToSelected(item)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <div className="select-meal-section__actions">
                <RectButton type={"outline"} text={"취소"} onClick={handleReset}/>
                <RectButton type={"defaule"} text={"등록"} />
            </div>
        </div>
    );
};

export default SelectMealSection;