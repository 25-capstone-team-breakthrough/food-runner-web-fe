import React, { useCallback } from "react";
import "./SearchInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../utils";

const SearchInput = ({ value, onChange, onSearch, placeholder = "검색어를 입력하세요" }) => {
    const handleSearch = useCallback(() => {
        onSearch(value.trim());
    }, [onSearch, value]);

    const handleClear = useCallback(() => {
        onChange("");
        onSearch("");
    }, [onChange, onSearch]);

    return (
        <div className="search-input__wrapper">
            <FontAwesomeIcon
                icon={icons.faMagnifyingGlass}
                className="search-input__icon"
                onClick={handleSearch}
            />
            <input
                className="search-input__input"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                }}
            />
            {value && (
                <FontAwesomeIcon
                    icon={icons.faCircleXmark}
                    className="search-input__clear"
                    onClick={handleClear}
                />
            )}
        </div>
    );
};

export default React.memo(SearchInput);