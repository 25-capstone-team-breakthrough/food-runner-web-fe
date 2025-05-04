import { useNavigate } from "react-router-dom";
import PillButton from "../common/PillButton";
import InputField from "./InputField";
import "./LoginContent.css";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";
import { useState } from "react";
import { useAuthDispatch } from "../../contexts/AuthContext";

const LoginContent = () => {
    const navigate = useNavigate();
    const { login } = useAuthDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        const success = login(id, password);
        if (success) {
            navigate("/home");
        } else {
            setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <div className="login-content">
            <LoginHeader title={"LOGIN"} />
            <div className="login-content__form">
                <InputField
                    type={"text"}
                    placeholder={"아이디 또는 이메일"}
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <InputField
                    type={"password"}
                    placeholder={"비밀번호"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="login-content__error">{error}</p>}
                <PillButton text={"로그인"} type={"default"} onClick={handleLogin} />
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