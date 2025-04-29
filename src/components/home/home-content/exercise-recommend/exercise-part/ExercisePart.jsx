import { useNavigate } from "react-router-dom";
import "./ExercisePart.css";
import VideoPageLink from "./video-page-link/VideoPageLink";

const ExercisePart = ({ partName, linkImgs }) => {
    const navigate = useNavigate();

    return (
        <div className="exercise-part">
            <div className="part-name">
                {partName}
            </div>
            <div className="part-list">
                {linkImgs.map((it, idx) => 
                    <VideoPageLink
                        key={idx}
                        linkImg={it.img}
                        linkLabel={it.label}
                        onClick={() => navigate("/exercise/video")}
                    />
                )}
            </div>
        </div>
    );
};

export default ExercisePart;