import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./UserInfoStep.css";
import RectButton from "../common/rect-button/RectButton";
import CustomRadio from "../common/custom-radio/CustomRadio";
import { showCustomAlert } from "../../custom-alert/customAlert";
import foodRunnerLogo from "../../assets/images/food-runner-logo.png";
import LoginFooter from "../login/LoginFooter";

const UserInfoStep1 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        gender: initGender = "female",
        age: initAge = "",
        height = "",
        weight = "",
        animationDirection = "forward"
    } = location.state || {};

    const [gender, setGender] = useState(initGender);
    const [age, setAge] = useState(initAge.toString());

    const handleNext = async () => {
        const ageNum = parseInt(age);

        if (!age || isNaN(ageNum) || ageNum < 10 || ageNum > 120) {
            await showCustomAlert({
                title: "만나이",
                text: "10세 이상 120세 이하의 만나이를 입력해주세요",
                icon: "warning",
            });
            return;
        }

        navigate("/signup/info2", {
            state: {
                gender,
                age: ageNum,
                height,
                weight,
                animationDirection: "forward"
            }
        });
    };

    return (
        <div className="user-info-step-container">
            <div className={`user-info-step-box ${animationDirection === "backward" ? "slide-in-left" : "slide-in"}`}>
                <img src={foodRunnerLogo} alt="Logo" className="user-info-step__logo" />

                <div className="user-info-step__heading">성별과 나이를 알려주세요</div>
                <div className="user-info-step__description">
                    체형별 맞춤 서비스를 위해 필요하며 다른 사람에게 공개되지 않습니다
                </div>

                <div className="user-info-step__field-group">
                    <label>성별</label>
                    <div className="user-info-step__radio-group">
                        <CustomRadio name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} label="남" />
                        <CustomRadio name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} label="여" />
                    </div>
                </div>

                <div className="user-info-step__field-group">
                    <label htmlFor="age">만나이</label>
                    <input
                        id="age"
                        type="number"
                        placeholder="20"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div className="user-info-step__btn-wrapper">
                    <RectButton text="다음" type="default" onClick={handleNext} />
                </div>
            </div>
            <LoginFooter />
        </div>
    );
};

export default UserInfoStep1;