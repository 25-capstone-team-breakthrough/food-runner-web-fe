import React, { useState, useRef, useEffect } from "react";
import "./IntakeStatusSection.css";
import IntakeStatusItem from "./intake-status-item/IntakeStatusItem";
import NutrientPaginationSlider from "./nutrient-pagination-slider/NutrientPaginationSlider";
import { nutrientData, icons } from "../../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IntakeStatusSection = () => {
    const PAGE_SIZE = 7; // 한 번에 표시할 영양소 개수
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(nutrientData.length / PAGE_SIZE);

    const [isExpanded, setIsExpanded] = useState(false);
    const [contentHeight, setContentHeight] = useState(0);

    const contentRef = useRef(null);

    const handlePrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const handleNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const visibleData = nutrientData.slice(
        currentPage * PAGE_SIZE,
        currentPage * PAGE_SIZE + PAGE_SIZE
    );

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        if (contentRef.current) {
            // scrollHeight: 실제 렌더링된 높이 계산(패딩 포함)
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, []);

    useEffect(() => {
        if (contentRef.current) {
            if (isExpanded) {
                contentRef.current.style.maxHeight = `${contentHeight}px`;
            } else {
                contentRef.current.style.maxHeight = "0px";
            }
        }
    }, [isExpanded]);

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
                    {visibleData.map((item, index) => (
                        <IntakeStatusItem
                            key={index}
                            name={item.name}
                            status={item.status}
                            value={item.value}
                        />
                    ))}
                </div>

                <NutrientPaginationSlider
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            </div>
        </div>
    );
};

export default IntakeStatusSection;