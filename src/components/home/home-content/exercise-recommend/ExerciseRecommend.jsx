import "./ExerciseRecommend.css";
import exerciseVideoBanner from "../../../../assets/images/exercise-video-banner.png";
import ExercisePart from "./exercise-part/ExercisePart";
import { mockLinkImgs1, mockLinkImgs2 } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const ExerciseRecommend = () => {
    const navigate = useNavigate();

    return (
        <div className="exercise-recommend">
            <div className="title">
                <div className="text-wrapper">
                    클릭 하나로 부위별 <span>맞춤 운동!</span>
                </div>
            </div>
            <div className="banner-img" onClick={() => navigate("/exercise/video")}>
                <img src={exerciseVideoBanner} />
            </div>
            <div className="content">
                <ExercisePart partName={"어깨"} linkImgs={mockLinkImgs1} />
                <ExercisePart partName={"등"} linkImgs={mockLinkImgs2} />
            </div>
        </div>
    );
};

export default ExerciseRecommend;