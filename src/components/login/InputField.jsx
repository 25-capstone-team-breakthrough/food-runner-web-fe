import "./InputField.css";

const InputField = ({ type, placeholder, value, onChange, onKeyDown }) => {
    return (
        <input
            className="input-field"
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};

export default InputField;