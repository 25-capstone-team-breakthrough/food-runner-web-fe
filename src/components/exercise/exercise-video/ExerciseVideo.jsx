import { mockAllVideos, mockRecommendVideos } from "../../../utils";
import ExercisePartButton from "./exercise-part-button/ExercisePartButton";
import ExerciseVideoList from "./exercise-video-list/ExerciseVideoList";
import "./ExerciseVideo.css";

const ExerciseVideo = () => {
    return (
        <div className="exercise-video">
            <div className="exercise-guide">
                |EXERCISE GUIDE|
            </div>
            <div className="part-select">
                <ExercisePartButton text={"어깨"} type={"selected"} />
                <ExercisePartButton text={"가슴"} type={"default"} />
                <ExercisePartButton text={"팔"} type={"default"} />
                <ExercisePartButton text={"복근"} type={"default"} />
                <ExercisePartButton text={"허벅지"} type={"default"} />
                <ExercisePartButton text={"종아리"} type={"default"} />
                <ExercisePartButton text={"엉덩이"} type={"default"} />
            </div>
            <ExerciseVideoList listTitle={"추천 운동"} videoList={mockRecommendVideos} />
            <ExerciseVideoList listTitle={"전체 운동"} videoList={mockAllVideos} />
        </div>
    );
};

export default ExerciseVideo;