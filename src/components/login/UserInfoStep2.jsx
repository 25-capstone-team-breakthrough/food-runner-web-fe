import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserInfoStep.css";
import RectButton from "../common/rect-button/RectButton";
import { showCustomAlert } from "../../custom-alert/customAlert";
import { useAuthState, useAuthDispatch } from "../../contexts/AuthContext";
import { useExerciseDispatch } from "../../contexts/ExerciseContext";
import foodRunnerLogo from "../../assets/images/food-runner-logo.png";
import LoginFooter from "../login/LoginFooter";

const UserInfoStep2 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        gender,
        age,
        height: initHeight = "",
        weight: initWeight = "",
        animationDirection = "forward"
    } = location.state || {};

    const [height, setHeight] = useState(initHeight.toString());
    const [weight, setWeight] = useState(initWeight.toString());

    const { user } = useAuthState();
    const { saveBMI } = useExerciseDispatch();
    const { markBmiCompleted } = useAuthDispatch();

    useEffect(() => {
        if (!gender || !age) {
            navigate("/signup/info1");
        }
    }, [gender, age, navigate]);

    const handleFinish = async () => {
        if (!height || !weight || parseFloat(height) <= 0 || parseFloat(weight) <= 0) {
            await showCustomAlert({
                title: "BMI 정보",
                text: "키와 몸무게를 정확히 입력해주세요",
                icon: "warning",
            });
            return;
        }

        const result = await saveBMI({
            gender,
            age,
            height: parseFloat(height),
            weight: parseFloat(weight),
            token: user.token,
        });

        if (result.success) {
            markBmiCompleted();
            navigate("/home");
        } else {
            await showCustomAlert({
                title: "저장 실패",
                text: "BMI 정보를 저장하는 데 실패했습니다",
                icon: "error",
            });
        }
    };

    const handleBack = () => {
        navigate("/signup/info1", {
            state: {
                gender,
                age,
                height,
                weight,
                animationDirection: "backward"
            }
        });
    };

    return (
        <div className="user-info-step-container">
            <div className={`user-info-step-box ${animationDirection === "backward" ? "slide-in-left" : "slide-in"}`}>
                <img src={foodRunnerLogo} alt="Logo" className="user-info-step__logo" />
                <div className="user-info-step__heading">키, 몸무게 저희만 알고 있을게요</div>
                <div className="user-info-step__description">
                    체형별 맞춤 서비스를 위해 필요하며 다른 사람에게 공개되지 않습니다
                </div>

                <div className="user-info-step__field-group">
                    <label htmlFor="height">키 (cm)</label>
                    <input
                        id="height"
                        type="number"
                        placeholder="165"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>

                <div className="user-info-step__field-group">
                    <label htmlFor="weight">몸무게 (kg)</label>
                    <input
                        id="weight"
                        type="number"
                        placeholder="55"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>

                <div className="user-info-step__btn-wrapper" style={{ gap: "1rem" }}>
                    <RectButton text="이전" type="outline" onClick={handleBack} />
                    <RectButton text="완료" type="default" onClick={handleFinish} />
                </div>
            </div>
            <LoginFooter />
        </div>
    );
};

export default UserInfoStep2;