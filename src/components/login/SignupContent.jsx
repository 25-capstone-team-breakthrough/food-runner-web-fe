import { useNavigate } from "react-router-dom";
import PillButton from "../common/PillButton";
import InputField from "./InputField";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";
import "./SignupContent.css";

const SignupContent = () => {
    const navigate = useNavigate();

    return (
        <div className="signup-content">
            <LoginHeader title={"SIGN UP"}/>
            <div className="signup-content__form">
                <InputField type={"text"} placeholder={"이름"}/>
                <div className="signup-content__id">
                    <InputField type={"text"} placeholder={"아이디"} />
                    <PillButton text={"중복"} type={"default"} />
                </div>
                <InputField type={"password"} placeholder={"비밀번호"}/>
                <PillButton text={"회원가입"} type={"default"} />
                <p className="signup-content__prompt">
                    회원이신가요?
                    <a
                        className="signup-content__link"
                        onClick={() => navigate("/login")}
                    >
                        로그인하기
                    </a>
                </p>
            </div>
            <LoginFooter />
        </div>
    );
};

export default SignupContent;