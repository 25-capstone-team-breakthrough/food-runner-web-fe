import ExerciseOverview from "./exercise-overview/ExerciseOverview";
import ExerciseRecommend from "./exercise-recommend/ExerciseRecommend";
import FoodCarousel from "./food-carousel/FoodCarousel";
import "./HomeContent.css";

const HomeContent = () => {
    return (
        <div className="home-content">
            <FoodCarousel />
            <ExerciseOverview />
            <ExerciseRecommend />
        </div>
    );
};

export default HomeContent;