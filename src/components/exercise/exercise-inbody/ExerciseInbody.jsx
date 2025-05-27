import "./ExerciseInbody.css";
import inbodyLogo from "../../../assets/images/inbody-logo.png";
import DateSelector from "../../common/date-selector/DateSelector";
import { useExerciseDispatch, useExerciseState } from "../../../contexts/ExerciseContext";
import { useAuthState } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import EmptyState from "../../common/empty-state/EmptyState";
import { icons } from "../../../utils";

const ExerciseInbody = () => {
    const { inbodyImages } = useExerciseState();
    const { fetchInbodyImages } = useExerciseDispatch();
    const { user } = useAuthState();
    const [selectedDate, setSelectedDate] = useState(new Date());

    useEffect(() => {
        if (user?.token) {
            fetchInbodyImages(user.token);
        }
    }, [user]);

    const formatDate = (date) => {
        return date.toISOString().split("T")[0];
    };

    const selectedDateStr = formatDate(selectedDate);

    const matchedImage = inbodyImages.find((img) =>
        img.createdAt?.startsWith(selectedDateStr)
    );

    return (
        <div className="exercise-inbody">
            <div className="exercise-inbody__header">
                <div className="exercise-inbody__title">
                    <img src={inbodyLogo} alt={"INBODY"} />
                    <div className="excise-inbody__file-view">
                        {"파일로 보기 >"}
                    </div>
                </div>
                <DateSelector
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    highlightedDates={inbodyImages.map((img) => img.createdAt.split("T")[0])}
                />
            </div>

            {matchedImage ? (
                <img
                    className="exercise-inbody__data"
                    src={matchedImage.url}
                    alt="INBODY-DATA"
                />
            ) : (
                <div className="exercise-inbody__empty">
                    <EmptyState icon={icons.faDumbbell} message={"해당 날짜의 인바디 데이터가 없어요"} />
                </div>
            )}
        </div>
    );
};

export default ExerciseInbody;