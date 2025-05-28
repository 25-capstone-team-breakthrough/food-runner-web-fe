import "./ExerciseHistory.css";
import exerciseHistoryTitle from "../../../assets/images/exercise-history-title.png";
import Calendar from "../../common/calendar/Calendar";
import ExerciseCarousel from "./exercise-carousel/ExerciseCarousel";
import ExerciseDetailTable from "./exercise-detail-table/ExerciseDetailTable";
import CalorieGraph from "../../common/calorie-graph/CalorieGraph";
import { useEffect, useState } from "react";
import { useExerciseState, useExerciseDispatch } from "../../../contexts/ExerciseContext";
import { useAuthState } from "../../../contexts/AuthContext";
import { getWeekDates, icons } from "../../../utils";
import PageHeader from "../../common/page-header/PageHeader";
import EmptyState from "../../common/empty-state/EmptyState";

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
            <PageHeader text={"EXERCISE HISTORY"} image={exerciseHistoryTitle} />
            <Calendar
                selectedDate={selectedDate}
                onDateChange={(date) => {
                    setSelectedDate(date);
                    setSelectedIndex(0); // 날짜 바뀌면 인덱스 초기화
                }}
            />
    
            {selectedExercises.length === 0 ? (
                <EmptyState icon={icons.faDumbbell} message={"운동 내역이 없어요"} />
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