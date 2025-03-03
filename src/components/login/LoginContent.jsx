import PillButton from "../common/PillButton";
import InputField from "./InputField";
import "./LoginContent.css";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";

const LoginContent = () => {
    return (
        <div className="login-content">
            <LoginHeader />
            <div className="login-form">
                <InputField type={"text"} placeholder={"아이디 또는 이메일"}/>
                <InputField type={"password"} placeholder={"비밀번호"}/>
                <PillButton text={"로그인"} type={"default"} />
                <p className="signup-prompt">
                    아직 회원이 아니신가요?
                    <a className="signup-link">회원가입하기</a>
                </p>
            </div>
            <LoginFooter />
        </div>
    );
};

export default LoginContent;