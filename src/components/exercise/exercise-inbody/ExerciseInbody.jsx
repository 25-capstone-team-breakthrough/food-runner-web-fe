import "./ExerciseInbody.css";
import inbodyLogo from "../../../assets/images/inbody-logo.png";
import DateSelector from "../../common/date-selector/DateSelector";
import { useExerciseDispatch, useExerciseState } from "../../../contexts/ExerciseContext";
import { useAuthState } from "../../../contexts/AuthContext";
import { useEffect } from "react";

const ExerciseInbody = () => {
    const { inbodyImages } = useExerciseState();
    const { fetchInbodyImages } = useExerciseDispatch();
    const { user } = useAuthState();

    useEffect(() => {
        if (user?.token) {
            fetchInbodyImages(user.token);
        }
    }, [user]);

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
            {inbodyImages.length === 0 ? (
                <div>인바디 데이터가 없습니다.</div>
            ) : (
                <img
                    className="exercise-inbody__data"
                    src={inbodyImages[0].url}
                    alt="INBODY-DATA"
                />
            )}
        </div>
    );
};

export default ExerciseInbody;