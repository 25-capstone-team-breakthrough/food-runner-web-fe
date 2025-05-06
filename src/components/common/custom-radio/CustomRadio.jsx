import './CustomRadio.css';

const CustomRadio = ({ name, value, checked, onChange, label }) => {
    return (
        <label className="custom-radio">
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            <span className="custom-radio__circle">
                <span className="custom-radio__check" />
            </span>
            <span className="custom-radio__label">{label}</span>
        </label>
    );
};

export default CustomRadio;