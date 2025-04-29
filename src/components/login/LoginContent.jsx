import { useNavigate } from "react-router-dom";
import PillButton from "../common/PillButton";
import InputField from "./InputField";
import "./LoginContent.css";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";

const LoginContent = () => {
    const navigate = useNavigate();

    return (
        <div className="login-content">
            <LoginHeader title={"LOGIN"} />
            <div className="login-content__form">
                <InputField type={"text"} placeholder={"아이디 또는 이메일"}/>
                <InputField type={"password"} placeholder={"비밀번호"}/>
                <PillButton text={"로그인"} type={"default"} />
                <p className="login-content__prompt">
                    아직 회원이 아니신가요?
                    <a
                        className="login-content__link"
                        onClick={() => navigate("/signup")}
                    >
                        회원가입하기
                    </a>
                </p>
            </div>
            <LoginFooter />
        </div>
    );
};

export default LoginContent;