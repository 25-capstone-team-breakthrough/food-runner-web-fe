import "./ExerciseRecommend.css";
import exerciseVideoBanner from "../../../../assets/images/exercise-video-banner.png";
import sampleExercise1 from "../../../../assets/images/sample-exercise-1.png";
import sampleExercise2 from "../../../../assets/images/sample-exercise-2.png";
import sampleExercise3 from "../../../../assets/images/sample-exercise-3.png";
import sampleExercise4 from "../../../../assets/images/sample-exercise-4.png";
import sampleExercise5 from "../../../../assets/images/sample-exercise-5.png";
import sampleExercise6 from "../../../../assets/images/sample-exercise-6.png";
import ExercisePart from "./exercise-part/ExercisePart";

const ExerciseRecommend = () => {
    const linkImgs1 = [
        {
            img: sampleExercise1,
            label: "숄더프레스"
        },
        {
            img: sampleExercise2,
            label: "벤치프레스"
        },
        {
            img: sampleExercise3,
            label: "벤치프레스"
        }
    ];

    const linkImgs2 = [
        {
            img: sampleExercise4,
            label: "숄더프레스"
        },
        {
            img: sampleExercise5,
            label: "벤치프레스"
        },
        {
            img: sampleExercise6,
            label: "벤치프레스"
        }
    ];

    return (
        <div className="exercise-recommend">
            <div className="title">
                <div className="text-wrapper">
                    클릭 하나로 부위별 <span>맞춤 운동!</span>
                </div>
            </div>
            <div className="banner-img">
                <img src={exerciseVideoBanner} />
            </div>
            <div className="content">
                <ExercisePart partName={"어깨"} linkImgs={linkImgs1} />
                <ExercisePart partName={"등"} linkImgs={linkImgs2} />
            </div>
        </div>
    );
};

export default ExerciseRecommend;