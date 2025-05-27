import React, { useRef, useState } from "react";
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getWeekDates, icons, isSameDay } from "../../../utils";

const Calendar = ({ selectedDate, onDateChange }) => {
    const containerRef = useRef(null);
    const [referenceDate, setReferenceDate] = useState(new Date()); // 오늘을 기준으로 주 이동만 담당

    const week = getWeekDates(referenceDate);
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const date = String(selectedDate.getDate()).padStart(2, "0");

    const moveWeek = (offset) => {
        const newDate = new Date(referenceDate);
        newDate.setDate(newDate.getDate() + offset * 7);
        setReferenceDate(newDate);
    };

    return (
        <div className="calendar" ref={containerRef}>
            <div className="calendar-bar" />
            <div className="calendar-row">
                <div className="calendar-left" >
                    <div className="calendar-year">{year}</div>
                    <div className="calendar-md">{month}.{date}</div>
                </div>
                <div className="calendar-right">
                    <FontAwesomeIcon
                        className="calendar-arrow left"
                        icon={icons.faChevronLeft}
                        onClick={() => moveWeek(-1)}
                    />
                    <div className="calendar-days">
                        {week.map((d, i) => {
                        const isSelected = isSameDay(d, selectedDate);
                        return (
                            <div
                            key={i}
                            className={`calendar-day-wrapper ${isSelected ? "highlight" : ""}`}
                            onClick={() => onDateChange(d)}
                            >
                            <div className="day-label">
                                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][d.getDay()]}
                            </div>
                            <div className="day-number">{`${d.getMonth() + 1}.${d.getDate()}`}</div>
                            </div>
                        );
                        })}
                    </div>
                    <FontAwesomeIcon
                        className="calendar-arrow right"
                        icon={icons.faChevronRight}
                        onClick={() => moveWeek(1)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Calendar;