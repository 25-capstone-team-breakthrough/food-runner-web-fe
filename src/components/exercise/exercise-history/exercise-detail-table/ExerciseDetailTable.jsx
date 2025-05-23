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
                    <span className="exercise-title">{exercise.exerciseId}</span>
                    <span className="exercise-subparts">
                        {exercise.distance ? "유산소 운동" : "근력 운동"}
                    </span>
                </div>

                {exercise.strengthSets?.length > 0 ? (
                    <div className="exercise-table">
                        <div className="exercise-table-header">
                            <div className="cell">세트</div>
                            <div className="cell">무게(KG)</div>
                            <div className="cell">횟수</div>
                        </div>
                        {exercise.strengthSets.map((set, idx) => (
                            <div className="exercise-table-row" key={idx}>
                                <div className="cell">{set.sets}</div>
                                <div className="cell">{set.weight}</div>
                                <div className="cell">{set.reps}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="exercise-table">
                        <div className="exercise-table-header">
                            <div className="cell">거리 (km)</div>
                            <div className="cell">시간 (min)</div>
                            <div className="cell">페이스</div>
                        </div>
                        <div className="exercise-table-row">
                            <div className="cell">{exercise.distance}</div>
                            <div className="cell">{exercise.time}</div>
                            <div className="cell">{exercise.pace}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExerciseDetailTable;