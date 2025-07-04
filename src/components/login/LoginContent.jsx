import { useNavigate } from "react-router-dom";
import PillButton from "../common/pill-button/PillButton";
import InputField from "./InputField";
import "./LoginContent.css";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";
import { useState } from "react";
import { useAuthDispatch } from "../../contexts/AuthContext";
import { showCustomAlert } from "../../custom-alert/customAlert";

const LoginContent = () => {
    const navigate = useNavigate();
    const { login, testLogin } = useAuthDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (id === "test" && password === "1234") {
            const testSuccess = testLogin();
            if (testSuccess) {
                navigate("/home");
            }
            return;
        }

        const { success, existBmi } = await login(id, password);

        if (!success) {
            showCustomAlert({
                title: "로그인 실패",
                text: "아이디 또는 비밀번호가 올바르지 않습니다",
                icon: "error",
                theme: "dark"
            });
            return;
        }

        if (!existBmi) {
            navigate("/signup/info1");
        } else {
            navigate("/home");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="login-content">
            <LoginHeader title={"LOGIN"} />
            <div className="login-content__form">
                <InputField
                    type="text"
                    placeholder="아이디 또는 이메일"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <InputField
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <PillButton text="로그인" type="default" onClick={handleLogin} />
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