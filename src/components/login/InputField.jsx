import "./InputField.css";

const InputField = ({ type, placeholder }) => {
    return (
        <input
            className={"input-field"}
            type={type}
            placeholder={placeholder}
        />
    );
};

export default InputField;