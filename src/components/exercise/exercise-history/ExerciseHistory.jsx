import "./ExerciseHistory.css";
import exerciseHistoryTitle from "../../../assets/images/exercise-history-title.png";
import Calendar from "../../common/Calendar";
import ExerciseCarousel from "./exercise-carousel/ExerciseCarousel";
import ExerciseDetailTable from "./exercise-detail-table/ExerciseDetailTable";
import { useState } from "react";
import CalorieGraph from "../../common/calorie-graph/CalorieGraph";
import { mockExerciseData } from "../../../utils";

const ExerciseHistory = () => {
    // 캘린더와 칼로리 그래프에 사용할 날짜
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 운동 목록 캐러셀에서 사용할 인덱스
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="exercise-history">
            <div className="history-title">
                |EXERCISE HISTORY|
            </div>
            <div className="title-img">
                <img src={exerciseHistoryTitle} />
            </div>
            <Calendar
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
            />
            <ExerciseCarousel
                exercises={mockExerciseData}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
            <ExerciseDetailTable exercise={mockExerciseData[selectedIndex]} />
            <CalorieGraph
                referenceDate={selectedDate}
                calorie={mockExerciseData.reduce((sum, ex) => sum + ex.calorie, 0)}
            />
            <div>Food Runner</div>
        </div>
    );
};

export default ExerciseHistory;