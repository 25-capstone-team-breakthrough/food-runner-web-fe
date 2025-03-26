import ExercisePartButton from "./exercise-part-button/ExercisePartButton";
import ExerciseVideoList from "./exercise-video-list/ExerciseVideoList";
import "./ExerciseVideo.css";
import sampleExercise1 from "../../../assets/images/sample-exercise-1.png";
import sampleExercise2 from "../../../assets/images/sample-exercise-2.png";
import sampleExercise3 from "../../../assets/images/sample-exercise-3.png";
import sampleExercise4 from "../../../assets/images/sample-exercise-4.png";
import sampleExercise5 from "../../../assets/images/sample-exercise-5.png";
import sampleExercise6 from "../../../assets/images/sample-exercise-6.png";


const ExerciseVideo = () => {
    const recommendVideoList = [
        {
            img: sampleExercise1,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise2,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise3,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        }
    ];

    const allVideoList = [
        {
            img: sampleExercise1,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise2,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise3,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise4,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise5,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        },
        {
            img: sampleExercise6,
            title: "숄더 프레스",
            description: "어깨를 키울 때 저는 숄더 프레스를 가장 많이 추천드립니다!"
        }
    ];

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
            <ExerciseVideoList listTitle={"추천 운동"} videoList={recommendVideoList} />
            <ExerciseVideoList listTitle={"전체 운동"} videoList={allVideoList} />
        </div>
    );
};

export default ExerciseVideo;