import React, { useEffect, useState } from "react";
import "./MypageContent.css";
import { useAuthState } from "../../contexts/AuthContext";
import { useExerciseState, useExerciseDispatch } from "../../contexts/ExerciseContext";
import { showCustomAlert } from "../../custom-alert/customAlert";
import CustomRadio from "../common/custom-radio/CustomRadio";
import RectButton from "../common/rect-button/RectButton";

const MypageContent = () => {
    const { user } = useAuthState();
    const { bmi } = useExerciseState();
    const { saveBMI, fetchBMI } = useExerciseDispatch();

    const [gender, setGender] = useState("female");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");

    useEffect(() => {
        if (user?.token) fetchBMI(user.token);
    }, [user?.token]);

    useEffect(() => {
        if (bmi) {
            setGender(bmi.gender || "female");
            setAge(bmi.age?.toString() || "");
            setHeight(bmi.height?.toString() || "");
            setWeight(bmi.weight?.toString() || "");
        }
    }, [bmi]);

    const handleSubmit = async () => {
        const ageNum = parseInt(age);
        const heightNum = parseFloat(height);
        const weightNum = parseFloat(weight);

        if (!age || isNaN(ageNum) || ageNum < 10 || ageNum > 120) {
            await showCustomAlert({
                title: "만나이",
                text: "10세 이상 120세 이하의 만나이를 입력해주세요",
                icon: "warning",
            });
            return;
        }

        if (!height || !weight || heightNum <= 0 || weightNum <= 0) {
            await showCustomAlert({
                title: "BMI 정보",
                text: "키와 몸무게를 정확히 입력해주세요",
                icon: "warning",
            });
            return;
        }

        const result = await saveBMI({
            gender,
            age: ageNum,
            height: heightNum,
            weight: weightNum,
            token: user.token,
        });

        if (result.success) {
            await showCustomAlert({
                title: "정보 수정 완료",
                text: "BMI 정보가 성공적으로 수정되었습니다.",
                icon: "success",
            });
        }
    };

    return (
        <div className="mypage-content">
            <div className="mypage-content__box">
                <div className="mypage-content__title">{user?.name} 님의 마이페이지</div>

                <div className="mypage-content__group">
                    <label>성별</label>
                    <div className="mypage-content__radio-group">
                        <CustomRadio name="gender" value="male" checked={gender === "male"} onChange={() => setGender("male")} label="남" />
                        <CustomRadio name="gender" value="female" checked={gender === "female"} onChange={() => setGender("female")} label="여" />
                    </div>
                </div>

                <div className="mypage-content__group">
                    <label>만나이</label>
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="mypage-content__input" />
                </div>

                <div className="mypage-content__group">
                    <label>키 (cm)</label>
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="mypage-content__input" />
                </div>

                <div className="mypage-content__group">
                    <label>몸무게 (kg)</label>
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="mypage-content__input" />
                </div>

                <div className="mypage-content__btn-wrapper">
                    <RectButton text="정보 수정" type="default" onClick={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

export default MypageContent;