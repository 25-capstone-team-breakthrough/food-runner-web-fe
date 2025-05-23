import { useNavigate } from "react-router-dom";
import PillButton from "../common/PillButton";
import InputField from "./InputField";
import LoginFooter from "./LoginFooter";
import LoginHeader from "./LoginHeader";
import "./SignupContent.css";
import { useState } from "react";
import { useAuthDispatch } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const SignupContent = () => {
    const navigate = useNavigate();
    const { signup } = useAuthDispatch();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    const handleSignup = async () => {
        if (name.trim() === "") {
            Swal.fire({
                title: "입력 오류",
                text: "이름을 입력해주세요.",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
            });
            return;
        }

        if (id.trim().length < 4) {
            Swal.fire({
                title: "입력 오류",
                text: "아이디는 최소 4자 이상 입력해야 합니다.",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
            });
            return;
        }

        if (password.length < 6 || !/\W/.test(password)) {
            Swal.fire({
                title: "비밀번호 오류",
                text: "비밀번호는 6자 이상, 특수문자를 포함해야 합니다.",
                icon: "warning",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
            });
            return;
        }

        const result = await signup(id, password, name);
        if (result) {
            Swal.fire({
                title: "회원가입 완료",
                text: `${name}님 가입을 환영합니다!`,
                icon: "success",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
            });
            navigate("/login");
        } else {
            Swal.fire({
                title: "회원가입 실패",
                text: "아이디 중복이거나 서버 오류가 발생했습니다.",
                icon: "error",
                confirmButtonText: "확인",
                customClass: {
                    confirmButton: 'no-focus-outline'
                },
            });
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
                <InputField
                    type="text"
                    placeholder="아이디"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
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