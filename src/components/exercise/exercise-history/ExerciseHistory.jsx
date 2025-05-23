import "./ExerciseHistory.css";
import exerciseHistoryTitle from "../../../assets/images/exercise-history-title.png";
import Calendar from "../../common/Calendar";
import ExerciseCarousel from "./exercise-carousel/ExerciseCarousel";
import ExerciseDetailTable from "./exercise-detail-table/ExerciseDetailTable";
import CalorieGraph from "../../common/calorie-graph/CalorieGraph";
import { useEffect, useState } from "react";
import { useExerciseState, useExerciseDispatch } from "../../../contexts/ExerciseContext";
import { useAuthState } from "../../../contexts/AuthContext";
import { getWeekDates } from "../../../utils";

const ExerciseHistory = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedIndex, setSelectedIndex] = useState(0);

    const { user } = useAuthState();
    const { exerciseLogs = [], calorieLogs = [] } = useExerciseState();
    const { fetchExerciseLogs, fetchCalorieLogs } = useExerciseDispatch();

    useEffect(() => {
        if (user?.token) {
            fetchExerciseLogs(user.token);
            fetchCalorieLogs(user.token);
        }
    }, [user]);

    const selectedExercises = exerciseLogs.filter(
        (log) =>
            new Date(log.createdAt).toDateString() === selectedDate.toDateString()
    );

    const selectedExercise = selectedExercises[selectedIndex] ?? null;

    const weeklyCalories = getWeekDates(selectedDate).map((date) => {
        const total = calorieLogs
            .filter((item) => new Date(item.createdAt).toDateString() === date.toDateString())
            .reduce((sum, item) => sum + item.caloriesBurned, 0);

        return {
            date,
            calorie: total,
        };
    });

    return (
        <div className="exercise-history">
            <div className="history-title">|EXERCISE HISTORY|</div>
            <div className="title-img">
                <img src={exerciseHistoryTitle} alt="exercise-history-title" />
            </div>
            <Calendar
                selectedDate={selectedDate}
                onDateChange={(date) => {
                    setSelectedDate(date);
                    setSelectedIndex(0); // 날짜 바뀌면 인덱스 초기화
                }}
            />
    
            {selectedExercises.length === 0 ? (
                <div className="exercise-empty-message">운동 기록이 없습니다.</div>
            ) : (
                <>
                    <ExerciseCarousel
                        exercises={selectedExercises}
                        selectedIndex={selectedIndex}
                        setSelectedIndex={setSelectedIndex}
                    />
                    <ExerciseDetailTable exercise={selectedExercise} />
                </>
            )}
            <CalorieGraph referenceDate={selectedDate} weeklyCalories={weeklyCalories} />
        </div>    
    );    
};

export default ExerciseHistory;