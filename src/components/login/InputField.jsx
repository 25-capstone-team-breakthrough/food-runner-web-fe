import "./InputField.css";

const InputField = ({ type, placeholder, onChange }) => {
    return (
        <input
            className={"input-field"}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default InputField;