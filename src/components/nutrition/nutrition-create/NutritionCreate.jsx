import React, { useEffect, useState } from "react";
import "./NutritionCreate.css";
import NutritionRadarSection from "./radar-section/NutritionRadarSection";
import IntakeStatusSection from "./intake-status-section/IntakeStatusSection";
import BannerSection from "./banner-section/BannerSection";
import SelectMealSection from "./select-meal-section/SelectMealSection";
import { useNutritionState, useNutritionDispatch } from "../../../contexts/NutritionContext";
import { useAuthState } from "../../../contexts/AuthContext";

const NutritionCreate = () => {
    const {
        mealList,
        supplementList,
        favoriteMeals,
        favoriteSupplements,
        nutritionLogs,
        recommendedNutrients
    } = useNutritionState();

    const {
        fetchMeals,
        fetchSupplements,
        fetchFavoriteMeals,
        fetchFavoriteSupplements,
        toggleFavoriteMeal,
        toggleFavoriteSupplement,
        registerMeals,
        registerSupplements,
        fetchNutritionLogs,
        fetchRecommendedNutrients
    } = useNutritionDispatch();

    const { user } = useAuthState();
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        const fetchAll = async () => {
            if (user?.token) {
                await Promise.all([
                    fetchMeals(user.token),
                    fetchSupplements(user.token),
                    fetchFavoriteMeals(user.token),
                    fetchFavoriteSupplements(user.token),
                    fetchNutritionLogs(user.token),
                    fetchRecommendedNutrients(user.token)
                ]);
            }
        };
      
        fetchAll();
      }, [user]);      

    return (
        <div className="nutrition-create">
            <NutritionRadarSection
                nutritionLogs={nutritionLogs}
                recommendedNutrients={recommendedNutrients}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            <IntakeStatusSection
                nutritionLogs={nutritionLogs}
                recommendedNutrients={recommendedNutrients}
                selectedDate={selectedDate}
            />
            <BannerSection />
            <SelectMealSection
                mealList={mealList}
                supplementList={supplementList}
                favoriteMeals={favoriteMeals}
                favoriteSupplements={favoriteSupplements}
                toggleFavoriteMeal={toggleFavoriteMeal}
                toggleFavoriteSupplement={toggleFavoriteSupplement}
                registerMeals={registerMeals}
                registerSupplements={registerSupplements}
                fetchNutritionLogs={fetchNutritionLogs}
                fetchRecommendedNutrients={fetchRecommendedNutrients}
            />
        </div>
    );
    
};

export default NutritionCreate;