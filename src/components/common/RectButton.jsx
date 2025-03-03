import "./RectButton.css";

const RectButton = ({ text, type, onClick }) => {
    return (
        <button
            className={["rect-button", `rect-button-${type}`].join(" ")}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default RectButton;