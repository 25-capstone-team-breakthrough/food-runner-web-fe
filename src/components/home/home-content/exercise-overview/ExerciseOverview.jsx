import "./ExerciseOverview.css";
import exerciseLink1 from "../../../../assets/images/exercise-link-1.png";
import exerciseLink2 from "../../../../assets/images/exercise-link-2.png";
import ExerciseLink from "./exercise-link/ExerciseLink";
import ExerciseReport from "./exercise-report/ExerciseReport";
import { useNavigate } from "react-router-dom";

const ExerciseOverview = () => {
    const navigate = useNavigate();

    return (
        <div className="exercise-overview">
            <div className="title">
                <div className="text-wrapper">
                    <span>어떤 운동</span>을 했는지? <span>얼마나</span> 했는지!
                </div>
            </div>
            <div className="content">
                <div className="content-left">
                    <ExerciseLink
                        imgSrc={exerciseLink1}
                        label={"인바디"}
                        onClick={() => navigate("/exercise/inbody")}
                    />
                    <ExerciseLink
                        imgSrc={exerciseLink2}
                        label={"운동 기록보기"}
                        onClick={() => navigate("/exercise/history")}
                    />
                </div>
                <div className="content-right">
                    <ExerciseReport />
                </div>
            </div>
        </div>
    );
};

export default ExerciseOverview;