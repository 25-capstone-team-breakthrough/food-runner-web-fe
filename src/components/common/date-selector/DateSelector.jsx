import React, { useState, useEffect, useRef } from "react";
import "./DateSelector.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../utils";

const DateSelector = ({ selectedDate, setSelectedDate, highlightedDates = [] }) => {
    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleDateClick = (day) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(day);
        setSelectedDate(newDate);
        setIsOpen(false);
    };

    const handlePrevMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setSelectedDate(newDate);
    };

    const handleNextMonth = () => {
        const newDate = new Date(selectedDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setSelectedDate(newDate);
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const isHighlighted = (day) => {
        const date = new Date(selectedDate);
        date.setDate(day);
        const dateStr = date.toISOString().split("T")[0];
        return highlightedDates.includes(dateStr);
    };

    const daysInMonth = getDaysInMonth(selectedDate.getFullYear(), selectedDate.getMonth());
    const today = selectedDate.getDate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="date-selector" ref={containerRef}>
            <div className="date-selector__header">
                <div className="date-selector__date" onClick={handleToggle}>
                    {selectedDate.getFullYear()}.{(selectedDate.getMonth() + 1).toString().padStart(2, '0')}.{selectedDate.getDate().toString().padStart(2, '0')}
                </div>
                <FontAwesomeIcon
                    icon={isOpen ? icons.faChevronUp : icons.faChevronDown}
                    className="date-selector__icon"
                    onClick={handleToggle}
                />
            </div>

            {isOpen && (
                <div className="date-selector__calendar">
                    <div className="date-selector__month-nav">
                        <FontAwesomeIcon
                            icon={icons.faChevronLeft}
                            className="date-selector__month-arrow"
                            onClick={(e) => { e.stopPropagation(); handlePrevMonth(); }}
                        />
                        <span className="date-selector__month-text">
                            {selectedDate.getFullYear()}.{(selectedDate.getMonth() + 1).toString().padStart(2, '0')}
                        </span>
                        <FontAwesomeIcon
                            icon={icons.faChevronRight}
                            className="date-selector__month-arrow"
                            onClick={(e) => { e.stopPropagation(); handleNextMonth(); }}
                        />
                    </div>

                    <div className="date-selector__weekdays">
                        {weekdays.map((day, idx) => (
                            <div key={idx} className="date-selector__weekday">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="date-selector__days">
                        {[...Array(daysInMonth)].map((_, i) => {
                            const day = i + 1;
                            const isToday = today === day;
                            const isMarked = isHighlighted(day);
                            return (
                                <div
                                    key={i}
                                    className={`date-selector__day ${isToday ? "selected" : ""} ${isMarked ? "highlighted" : ""}`}
                                    onClick={() => handleDateClick(day)}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateSelector;