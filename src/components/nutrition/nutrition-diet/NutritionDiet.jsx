import "./NutritionDiet.css";
import nutritionDietTitle from "../../../assets/images/nutrition-diet-title.png";

const NutritionDiet = () => {
    return (
        <div className="nutrition-diet">
            <div className="diet-title">
                |DIET|
            </div>
            <div className="title-img">
                <img src={nutritionDietTitle} />
            </div>
        </div>
    );
};

export default NutritionDiet;