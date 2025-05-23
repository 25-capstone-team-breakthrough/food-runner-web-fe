import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfoStep.css";
import PillButton from "../common/PillButton";
import CustomRadio from "../common/custom-radio/CustomRadio";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../utils";

const UserInfoStep1 = () => {
    const navigate = useNavigate();
    const [gender, setGender] = useState("female");
    const [age, setAge] = useState("");

    const handleNext = () => {
        if (!age) {
            alert("만나이를 입력해주세요.");
            return;
        }

        navigate("/signup/info2", {
            state: {
                gender,
                age
            }
        });
    };

    return (
        <div className="user-info-step">
            <FontAwesomeIcon
                className="user-info-step__back-btn"
                icon={icons.faArrowLeft}
                onClick={() => navigate(-1)}
            />
            <div className="user-info-step__heading">
                성별과 나이를 알려주세요
            </div>
            <div className="user-info-step__description">
                체형별 맞춤 서비스를 위해 필요하며 다른 사람에게 공개되지 않습니다
            </div>
            <div className="user-info-step__field-group">
                <label>성별</label>
                <div className="user-info-step__radio-group">
                    <CustomRadio
                        name="gender"
                        value="male"
                        checked={gender === "male"}
                        onChange={() => setGender("male")}
                        label="남"
                    />
                    <CustomRadio
                        name="gender"
                        value="female"
                        checked={gender === "female"}
                        onChange={() => setGender("female")}
                        label="여"
                    />
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
                <PillButton text="다음 >" onClick={handleNext} type="default" />
            </div>
        </div>
    );
};

export default UserInfoStep1;