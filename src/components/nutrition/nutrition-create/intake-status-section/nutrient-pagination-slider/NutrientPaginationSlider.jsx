import React from "react";
import "./NutrientPaginationSlider.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const NutrientPaginationSlider = ({ currentPage, totalPages, onPrev, onNext }) => {
    const barWidthPercent = 100 / totalPages;
    const barLeftPercent = (currentPage / totalPages) * 100;

    return (
        <div className="nutrient-slider">
            <div className="nutrient-slider__track">
                <div
                    className="nutrient-slider__bar"
                    style={{ width: `${barWidthPercent}%`, left: `${barLeftPercent}%` }}
                />
            </div>
            <div className="nutrient-slider__indicator">
                {currentPage + 1} / {totalPages}
            </div>
            <div className="nutrient-slider__buttons">
                <FontAwesomeIcon
                    icon={faChevronLeft}
                    style={{ cursor: "pointer", fontSize: "0.75rem", margin: "0.5rem" }}
                    onClick={onPrev}
                />
                <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ cursor: "pointer", fontSize: "0.75rem", margin: "0.5rem" }}
                    onClick={onNext}
                />
            </div>
        </div>
    );
};

export default NutrientPaginationSlider;