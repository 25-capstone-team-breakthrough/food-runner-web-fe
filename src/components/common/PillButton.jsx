import "./PillButton.css";

const PillButton = ({ text, type, onClick }) => {
    return (
        <button
            className={["pill-button", `pill-button-${type}`].join(" ")}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default PillButton;