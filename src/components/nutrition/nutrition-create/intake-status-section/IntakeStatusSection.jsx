import React, { useState, useRef, useEffect } from "react";
import "./IntakeStatusSection.css";
import IntakeStatusItem from "./intake-status-item/IntakeStatusItem";
import NutrientPaginationSlider from "./nutrient-pagination-slider/NutrientPaginationSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons, nutrientNameMap, nutrientUnitMap } from "../../../../utils";

const IntakeStatusSection = ({ nutritionLogs, recommendedNutrients, selectedDate }) => {
    const PAGE_SIZE = 7;
    const [currentPage, setCurrentPage] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef(null);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    const selectedDateStr = typeof selectedDate === "string"
    ? selectedDate
    : selectedDate.toLocaleDateString("sv-SE"); // "2025-05-20"

    // 기준값 분리
    const minRaw = recommendedNutrients.find((r) => r.type === "MIN") || {};
    const maxRaw = recommendedNutrients.find((r) => r.type === "MAX") || {};

    const todayLog = nutritionLogs.find(log => log.date.trim() === selectedDateStr.trim()) || {};

    const nutrientKeys = Object.keys(nutrientNameMap);

    const nutrientData = nutrientKeys.map((rawKey) => {
        const key = rawKey.trim();
    
        const value = todayLog[key] ?? 0;
        const minValue = minRaw[key] ?? 0;
        const maxValue = maxRaw[key] ?? 0;
    
        let status = "적정";
        if (value < minValue){ 
            status = "부족";
        } else if (value > maxValue) {
            status = "초과";
        }
        
        return {
            key,
            name: `${nutrientNameMap[key]} (${nutrientUnitMap[key]})`,
            value,
            minValue,
            maxValue,
            status,
        };
    });
    

    const totalPages = Math.ceil(nutrientData.length / PAGE_SIZE);
    const visibleData = nutrientData.slice(
        currentPage * PAGE_SIZE,
        currentPage * PAGE_SIZE + PAGE_SIZE
    );

    useEffect(() => {
        if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
        }
    }, [nutrientData]);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isExpanded
                ? `${contentHeight}px`
                : "0px";
        }
    }, [isExpanded, contentHeight]);

    return (
        <div className="intake-status-section">
            <div className="intake-status-section__title">
                전체 영양소
                <FontAwesomeIcon
                    icon={isExpanded ? icons.faChevronUp : icons.faChevronDown}
                    className="intake-status-section__arrow"
                    onClick={toggleExpand}
                />
            </div>

            <div
                ref={contentRef}
                className={`intake-status-section__content ${isExpanded ? "expanded" : ""}`}
            >
                <div className="intake-status-section__list">
                {visibleData.map((item) => (
                    <IntakeStatusItem
                    key={item.key}
                    name={item.name}
                    status={item.status}
                    value={item.value}
                    minValue={item.minValue}
                    maxValue={item.maxValue}
                    />
                ))}
                </div>

                <NutrientPaginationSlider
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={() => setCurrentPage((p) => (p - 1 + totalPages) % totalPages)}
                    onNext={() => setCurrentPage((p) => (p + 1) % totalPages)}
                />
            </div>
        </div>
    );
};

export default IntakeStatusSection;
