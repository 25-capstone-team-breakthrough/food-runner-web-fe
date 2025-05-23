import React, { useState } from "react";
import "./SearchInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";

const SearchInput = ({ onSearch }) => {
    const [localInput, setLocalInput] = useState("");

    const handleSearch = () => {
        onSearch(localInput.trim());
    };

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
                placeholder="식사나 영양제를 검색해주세요"
                value={localInput}
                onChange={(e) => setLocalInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                }}
            />
            {localInput && (
                <FontAwesomeIcon
                    icon={icons.faCircleXmark}
                    className="search-input__clear"
                    onClick={() => {
                        setLocalInput("");
                        onSearch("");
                    }}
                />
            )}
        </div>
    );
};

export default React.memo(SearchInput);