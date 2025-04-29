import "./LoginHeader.css";
import foodRunnerLogo from "../../assets/images/food-runner-logo.png";

const LoginHeader = ({ title }) => {
    return (
        <div className="login-header">
            <img src={foodRunnerLogo} alt={"Logo"} />
            <div className="logo-text">{title}</div>
        </div>
    );
};

export default LoginHeader;