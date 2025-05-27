import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./ExerciseReport.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../../../utils";
import ReportItem from "./report-item/ReportItem";
import { useExerciseDispatch, useExerciseState } from "../../../../../contexts/ExerciseContext";
import { useAuthState } from "../../../../../contexts/AuthContext";
import EmptyState from "../../../../common/empty-state/EmptyState";
import { icon } from "@fortawesome/fontawesome-svg-core";

const ExerciseReport = () => {
    const navigate = useNavigate();
    const { user } = useAuthState();
    const { exerciseLogs, calorieLogs } = useExerciseState();
    const { fetchExerciseLogs, fetchCalorieLogs } = useExerciseDispatch();

    useEffect(() => {
        if (user?.token) {
            fetchExerciseLogs(user.token);
            fetchCalorieLogs(user.token);
        }
    }, [user?.token]);

    const today = new Date().toISOString().split("T")[0];

    // 운동 로그
    const todayLogs = useMemo(() => {
        return exerciseLogs.filter(log =>
            log.createdAt?.startsWith(today)
        );
    }, [exerciseLogs]);

    // 칼로리 소모 합산
    const todayCalories = useMemo(() => {
        return calorieLogs
            .filter(log => log.createdAt?.startsWith(today))
            .reduce((sum, log) => sum + (log.caloriesBurned || 0), 0);
    }, [calorieLogs]);

    const MAX_KCAL = 1000;
    const todayFormatted = today.replace(/-/g, ".");

    return (
        <div className="exercise-report" onClick={() => navigate("/exercise/history")}>
            <div className="date">{todayFormatted}</div>

            <div className="calorie-info">
                <div className="calorie-title">소모한 칼로리</div>
                <div className="calorie-amount">
                    <span>{todayCalories}</span>kcal
                </div>
                <div className="calorie-progress">
                    <div
                        className="calorie-progress-bar"
                        style={{ width: `${Math.min((todayCalories / MAX_KCAL) * 100, 100)}%` }}
                    ></div>
                </div>
            </div>

            <div className="report-container">
                <div className="report-title">EXERCISE REPORT</div>

                {todayLogs.length === 0 ? (
                    <EmptyState icon={icons.faDumbbell} message={"오늘은 운동 기록이 없어요"} />
                    
                ) : (
                    todayLogs.slice(0, 3).map((log, index) => {
                        const sets = log.strengthSets?.length || 1;
                        const name = `운동 ${log.exerciseId}`; // 추후 매핑 가능
                        const part = "부위 정보 없음";
                        return (
                            <ReportItem
                                key={index}
                                name={name}
                                part={part}
                                sets={sets}
                            />
                        );
                    })
                )}
            </div>

            <a className="report-detail-link">
                <div className="report-detail-label">DETAIL</div>
                <FontAwesomeIcon icon={icons.faChevronDown} style={{ color: "#ccd584" }} />
                <FontAwesomeIcon
                    icon={icons.faChevronDown}
                    style={{ color: "#75811b", top: "-0.5rem", position: "relative" }}
                />
            </a>
        </div>
    );
};

export default ExerciseReport;