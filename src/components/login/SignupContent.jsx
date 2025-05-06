import { useNavigate } from "react-router-dom";
import PillButton from "../common/PillButton";
import InputField from "./InputField";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";
import "./SignupContent.css";
import { useState } from "react";
import { useAuthDispatch } from "../../contexts/AuthContext";

const SignupContent = () => {
    const navigate = useNavigate();
    const { signup } = useAuthDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const [isAvailable, setIsAvailable] = useState(false);

    const checkDuplicate = () => {
        if (id === "hansung") {
            alert("이미 사용 중인 아이디입니다.");
        } else {
            alert("사용 가능한 아이디입니다.");
            setIsAvailable(true);
        }
    };

    const handleSignup = () => {
        if (!isAvailable) {
            alert("아이디 중복 검사를 먼저 진행해주세요.");
            return;
        }

        const success = signup(id, password, name);
        if (success) {
            navigate("/signup/info1");
        } else {
            alert("회원가입 실패 (아이디 중복)");
        }
    };

    return (
        <div className="signup-content">
            <LoginHeader title={"SIGN UP"} />
            <div className="signup-content__form">
                <InputField
                    type="text"
                    placeholder="이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className="signup-content__id">
                    <InputField
                        type="text"
                        placeholder="아이디"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                    <PillButton
                        text="중복"
                        type="default"
                        onClick={checkDuplicate}
                    />
                </div>
                <InputField
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <PillButton
                    text="회원가입"
                    type="default"
                    onClick={handleSignup}
                />
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