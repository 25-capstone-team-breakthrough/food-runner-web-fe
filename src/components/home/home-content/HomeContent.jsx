import "./HomeContent.css";
import FoodCarousel from "./food-carousel/FoodCarousel";
import ExerciseOverview from "./exercise-overview/ExerciseOverview";
import ExerciseRecommend from "./exercise-recommend/ExerciseRecommend";
import { useAuthState } from "../../../contexts/AuthContext";
import homeGuestBanner from "../../../assets/images/home-guest-banner.png";
import { useNavigate } from "react-router-dom";
import { ExerciseProvider } from "../../../contexts/ExerciseContext";
import { NutritionProvider } from "../../../contexts/NutritionContext";

const HomeContent = () => {
    const { isLoggedIn } = useAuthState();
    const navigate = useNavigate();

    if (!isLoggedIn) {
        return (
            <div className="home-content guest-home">
                <div className="guest-home__banner-wrapper">
                    <img
                        src={homeGuestBanner}
                        alt="GUEST"
                    />
                    <button
                        onClick={() => navigate("/login")}
                    />
                </div>
            </div>
        );
    }

    return (
        <ExerciseProvider>
            <NutritionProvider>
                <div className="home-content">
                    <FoodCarousel />
                    <ExerciseOverview />
                    <ExerciseRecommend />
                </div>
            </NutritionProvider>
        </ExerciseProvider>
    );
};

export default HomeContent;