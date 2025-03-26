import "./ExercisePartButton.css";

const ExercisePartButton = ({ text, type, onClick }) => {
    return (
        <button
            className={["exercise-part-button", `exercise-part-button-${type}`].join(" ")}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ExercisePartButton;