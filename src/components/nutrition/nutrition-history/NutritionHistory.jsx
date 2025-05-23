import React, { useEffect, useState } from "react";
import "./NutritionHistory.css";
import nutritionHistoryTitle from "../../../assets/images/nutrition-diet-title.png";
import DietHistoryPanel from "./diet-history-panel/DietHistoryPanel";
import Calendar from "../../common/Calendar";
import CalorieGraph from "../../common/calorie-graph/CalorieGraph";
import { useNutritionDispatch, useNutritionState } from "../../../contexts/NutritionContext";
import { useAuthState } from "../../../contexts/AuthContext";
import { getWeekDates } from "../../../utils";

const NutritionHistory = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { user } = useAuthState();
    const { mealLogs, supplementLogs } = useNutritionState();
    const { fetchMealLogs, fetchSupplementLogs } = useNutritionDispatch();

    useEffect(() => {
        if (user?.token) {
            fetchMealLogs(user.token);
            fetchSupplementLogs(user.token);
        }
    }, [user?.token]);

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const filteredMeals = [
        ...(mealLogs?.imageMealLogs || []),
        ...(mealLogs?.searchMealLogs || [])
    ].filter(log => {
        const date = new Date(log?.mealLog?.date || log?.date);
        return isSameDay(date, selectedDate);
    });

    const filteredSupplements = (supplementLogs || []).filter(log => {
        const date = new Date(log?.date);
        return isSameDay(date, selectedDate);
    });

    const combinedLogs = [
        ...filteredMeals.map(log => ({
            type: "meal",
            name: log.foodName || log.mealName || "이름 없음",
            image: log.foodImage || "https://via.placeholder.com/80",
            calories: log.mealLog?.calories || 0,
            nutrients: `${log.mealLog?.carbohydrate || 0}g 탄수화물 / ${log.mealLog?.protein || 0}g 단백질 / ${log.mealLog?.fat || 0}g 지방`
        })),
        ...filteredSupplements.map(log => ({
            type: "supplement",
            name: log.supplementData?.supplementName || "영양제",
            image: log.supplementData?.supplementImage || "https://via.placeholder.com/80",
            calories: 0,
            nutrients: ""
        }))
    ];

    const weeklyCalories = getWeekDates(selectedDate).map((date) => {
        const total = [
            ...(mealLogs?.imageMealLogs || []),
            ...(mealLogs?.searchMealLogs || [])
        ]
            .filter((log) => isSameDay(new Date(log.mealLog?.date || log.date), date))
            .reduce((sum, log) => sum + (log.mealLog?.calories || 0), 0);

        return {
            date,
            calorie: total,
        };
    });

    return (
        <div className="nutrition-history">
            <div className="nutrition-history__title">|DIET HISTORY|</div>
            <div className="nutrition-history__title-img">
                <img src={nutritionHistoryTitle} alt="HISTORY title" />
            </div>
            <Calendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />
            <DietHistoryPanel
                selectedDate={selectedDate}
                dietData={combinedLogs}
            />
            <CalorieGraph
                referenceDate={selectedDate}
                weeklyCalories={weeklyCalories}
            />
        </div>
    );
};

export default NutritionHistory;