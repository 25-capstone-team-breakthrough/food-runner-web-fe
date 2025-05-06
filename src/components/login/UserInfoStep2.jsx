import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserInfoStep.css";
import PillButton from "../common/PillButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../utils";

const UserInfoStep2 = () => {
    const navigate = useNavigate();
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    const handleFinish = () => {
        if (!height || !weight) {
            alert("키와 몸무게를 입력해주세요.");
            return;
        }

        navigate("/home");
    };

    return (
        <div className="user-info-step">
            <FontAwesomeIcon
                className="user-info-step__back-btn"
                icon={icons.faArrowLeft}
                onClick={() => navigate(-1)}
            />
            <div className="user-info-step__heading">
                키, 몸무게 저희만 알고 있을게요
            </div>
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
            <div className="user-info-step__btn-wrapper">
                <PillButton text="완료" onClick={handleFinish} type="default" />
            </div>
        </div>
    );
};

export default UserInfoStep2;