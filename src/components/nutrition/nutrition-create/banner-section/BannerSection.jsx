import "./BannerSection.css";
import nutritionDietBanner from "../../../../assets/images/nutrition-diet-banner.png";
import { useNavigate } from "react-router-dom";

const BannerSection = () => {
    const navigate = useNavigate();

    return (
        <div className="banner-section">
            <div className="banner-section__title">
                <div className="banner-section__title__text">
                    클릭 하나로 개인별 <span>맞춤 식단!</span>
                </div>
            </div>
            <div className="banner-section__img" onClick={() => navigate("/nutrition/diet")}>
                <img src={nutritionDietBanner} />
            </div>
        </div>
    );
};

export default BannerSection;