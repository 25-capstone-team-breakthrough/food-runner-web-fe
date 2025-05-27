import "./RectButton.css";

const RectButton = ({ text, type, onClick, disabled = false }) => {
    return (
        <button
            className={[
                "rect-button",
                `rect-button-${type}`,
                disabled ? "rect-button-disabled" : ""
            ].join(" ")}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default RectButton;