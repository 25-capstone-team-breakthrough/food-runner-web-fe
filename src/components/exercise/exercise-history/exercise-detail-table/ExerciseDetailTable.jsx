import "./ExerciseDetailTable.css";

const ExerciseDetailTable = ({ exercise }) => {
    if (!exercise) {
        return null;
    }

    return (
        <div className="exercise-detail-container">
            <div className="exercise-detail-label">DETAIL</div>
            <div className="exercise-detail-content">
                <div className="exercise-header">
                    <span className="exercise-title">{exercise.name}</span>
                    <span className="exercise-subparts">{exercise.part}</span>
                </div>
                <div className="exercise-table">
                <div className="exercise-table-header">
                    <div className="cell">세트</div>
                    <div className="cell">무게(KG)</div>
                    <div className="cell">횟수</div>
                </div>
                {exercise.sets.map((set, idx) => (
                    <div className="exercise-table-row" key={idx}>
                        <div className="cell">{set.set}</div>
                        <div className="cell">{set.weight}</div>
                        <div className="cell">{set.num}</div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default ExerciseDetailTable;