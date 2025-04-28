import BannerSection from "./banner-section/BannerSection";
import IntakeStatusSection from "./intake-status-section/IntakeStatusSection";
import "./NutritionCreate.css";
import NutritionRadarSection from "./radar-section/NutritionRadarSection";
import SelectMealSection from "./select-meal-section/SelectMealSection";

const NutritionCreate = () => {
    return (
        <div className="nutrition-create">
            <NutritionRadarSection />
            <IntakeStatusSection />
            <BannerSection />
            <SelectMealSection />
        </div>
    );
};

export default NutritionCreate;