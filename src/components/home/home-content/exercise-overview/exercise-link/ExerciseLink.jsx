import "./ExerciseLink.css";
import { icons } from "../../../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ExerciseLink = ({ imgSrc, label }) => {
    return (
        <a className="exercise-link">
            <div className="img-section">
                <img src={imgSrc} />
            </div>
            <div className="link-label">
                {label}
                <FontAwesomeIcon icon={icons.faChevronRight} />
            </div>
        </a>
    );
};

export default ExerciseLink;