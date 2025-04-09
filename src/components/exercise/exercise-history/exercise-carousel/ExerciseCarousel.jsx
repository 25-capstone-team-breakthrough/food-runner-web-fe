import "./ExerciseCarousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../utils";
import React, { useState } from "react";

const ExerciseCarousel = ({ exercises, selectedIndex, setSelectedIndex }) => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 5;

    const handlePrev = () => {
        setStartIndex((prev) => (prev - 1 + exercises.length) % exercises.length);
    };

    const handleNext = () => {
        setStartIndex((prev) => (prev + 1) % exercises.length);
    };

    const getVisibleItems = () => {
        const items = [];
        for (let i = 0; i < visibleCount; i++) {
            items.push(exercises[(startIndex + i) % exercises.length]);
        }
        return items;
    };

    const visibleItems = getVisibleItems();

    return (
        <div className="exercise-carousel">
            <div className="carousel-bar" />
            <div className="carousel-row">
                <FontAwesomeIcon icon={icons.faChevronLeft} onClick={handlePrev} className="arrow" />
                <div className="exercise-carousel-items">
                    {visibleItems.map((item, i) => {
                        const actualIndex = (startIndex + i) % exercises.length;
                        const isSelected = actualIndex === selectedIndex;
                        const isFirst = i === 0;

                        return (
                            <React.Fragment key={i}>
                                {!isFirst && <div className="divider" />}
                                <div
                                    key={actualIndex}
                                    className={`exercise-item ${isSelected ? "selected" : ""}`}
                                    onClick={() => setSelectedIndex(actualIndex)}
                                >
                                    <div className="exercise-name">{item.name}</div>
                                    <div className="exercise-part">{item.part}</div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
                <FontAwesomeIcon icon={icons.faChevronRight} onClick={handleNext} className="arrow" />
            </div>
        </div>
    );
};

export default ExerciseCarousel;