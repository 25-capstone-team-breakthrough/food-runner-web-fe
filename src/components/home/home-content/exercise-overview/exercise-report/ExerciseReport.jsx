import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ExerciseReport.css";
import { icons } from "../../../../../utils";
import ReportItem from "./report-item/ReportItem";

const ExerciseReport = () => {
    const current = 539;
    const max = 1000;

    return (
        <div className="exercise-report">
            <div className="date">2025.03.11</div>
            <div className="calorie-info">
                <div className="calorie-title">소모한 칼로리</div>
                <div className="calorie-amount"><span>539</span>kcal</div>
                <div className="calorie-progress">
                    <div
                        className="calorie-progress-bar"
                        style={{ width: `${(current / max) * 100}%` }}
                    ></div>
                </div>
            </div>
            <div className="report-container">
                <div className="report-title">EXERCISE REPORT</div>
                <ReportItem name={"벤치 프레스"} part={"가슴"} sets={3} />
                <ReportItem name={"데드 리프트"} part={"대퇴사두, 대퇴이두"} sets={5} />
                <ReportItem name={"덤벨 프레스"} part={"가슴"} sets={5} />
            </div>
            <a className="report-detail-link">
                <div className="report-detail-label">DETAIL</div>
                <FontAwesomeIcon
                    icon={icons.faChevronDown}
                    style={{ color: "#ccd584", position: "relative", top: "0" }}
                />
                <FontAwesomeIcon
                    icon={icons.faChevronDown}
                    style={{ color: "#75811b", position: "relative", top: "-0.5rem" }}
                />
            </a>
        </div>
    );
};

export default ExerciseReport;