import "./ExerciseInbody.css";
import inbodyLogo from "../../../assets/images/inbody-logo.png";
import sampleInbody from "../../../assets/images/sample-inbody.png"
import DateSelector from "../../common/date-selector/DateSelector";

const ExerciseInbody = () => {
    return (
        <div className="exercise-inbody">
            <div className="exercise-inbody__header">
                <div className="exercise-inbody__title">
                    <img src={inbodyLogo} alt={"INBODY"} />
                    <div className="excise-inbody__file-view">
                        {"파일로 보기 >"}
                    </div>
                </div>
                <DateSelector />
            </div>
            <img className={"exercise-inbody__data"} src={sampleInbody} alt={"INBODY-DATA"} />
        </div>
    );
};

export default ExerciseInbody;