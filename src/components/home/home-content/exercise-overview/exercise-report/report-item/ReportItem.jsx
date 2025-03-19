import "./ReportItem.css";

const ReportItem = ({ name, part, sets}) => {
    return (
        <div className="report-item">
            <div className="exercise-info">
                <div className="exercise-name">
                    {name}
                </div>
                <div className="exercise-part">
                    {part}
                </div>
            </div>
            <div className="sets">
                {`${sets} 세트`}
            </div>
        </div>
    );
};

export default ReportItem;