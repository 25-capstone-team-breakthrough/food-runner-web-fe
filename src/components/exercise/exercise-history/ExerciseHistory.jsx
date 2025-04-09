import "./ExerciseHistory.css";
import exerciseHistoryTitle from "../../../assets/images/exercise-history-title.png";
import Calendar from "../../common/Calendar";
import ExerciseCarousel from "./exercise-carousel/ExerciseCarousel";
import ExerciseDetailTable from "./exercise-detail-table/ExerciseDetailTable";
import { useState } from "react";
import CalorieGraph from "../../common/calorie-graph/CalorieGraph";

const ExerciseHistory = () => {
    // 캘린더와 칼로리 그래프에 사용할 날짜
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 운동 목록 캐러셀에서 사용할 인덱스
    const [selectedIndex, setSelectedIndex] = useState(0);

    // 사용자의 하루 운동 기록 Mock Data
    const exerciseData = [
        {
            name: "A 스쿼트",
            part: "다리",
            kind: "근력",
            sets: [{
                set: 1,
                weight: 15,
                num: 10
            }, {
                set: 2,
                weight: 15,
                num: 10
            }, {
                set: 3,
                weight: 20,
                num: 10
            }],
            calorie: 200
        },
        {
            name: "B 스쿼트",
            part: "다리",
            kind: "근력",
            sets: [{
                set: 1,
                weight: 15,
                num: 10
            }, {
                set: 2,
                weight: 15,
                num: 10
            }, {
                set: 3,
                weight: 20,
                num: 10
            }],
            calorie: 200
        },
        {
            name: "C 스쿼트",
            part: "다리",
            kind: "근력",
            sets: [{
                set: 1,
                weight: 15,
                num: 10
            }, {
                set: 2,
                weight: 15,
                num: 10
            }, {
                set: 3,
                weight: 20,
                num: 10
            }],
            calorie: 200
        },
        {
            name: "D 스쿼트",
            part: "다리",
            kind: "근력",
            sets: [{
                set: 1,
                weight: 15,
                num: 10
            }, {
                set: 2,
                weight: 15,
                num: 10
            }, {
                set: 3,
                weight: 20,
                num: 10
            }],
            calorie: 200
        },
        {
            name: "E 스쿼트",
            part: "다리",
            kind: "근력",
            sets: [{
                set: 1,
                weight: 15,
                num: 10
            }, {
                set: 2,
                weight: 15,
                num: 10
            }, {
                set: 3,
                weight: 20,
                num: 10
            }],
            calorie: 200
        },
        {
            name: "F 스쿼트",
            part: "다리",
            kind: "근력",
            sets: [{
                set: 1,
                weight: 15,
                num: 10
            }, {
                set: 2,
                weight: 15,
                num: 10
            }, {
                set: 3,
                weight: 20,
                num: 10
            }],
            calorie: 200
        },
        {
            name: "G 스쿼트",
            part: "다리",
            kind: "근력",
            sets: [{
                set: 1,
                weight: 15,
                num: 10
            }, {
                set: 2,
                weight: 15,
                num: 10
            }, {
                set: 3,
                weight: 20,
                num: 10
            }],
            calorie: 200
        }
    ];

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
                exercises={exerciseData}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            />
            <ExerciseDetailTable exercise={exerciseData[selectedIndex]} />
            <CalorieGraph
                referenceDate={selectedDate}
                calorie={exerciseData.reduce((sum, ex) => sum + ex.calorie, 0)}
            />
            <div>Food Runner</div>
        </div>
    );
};

export default ExerciseHistory;