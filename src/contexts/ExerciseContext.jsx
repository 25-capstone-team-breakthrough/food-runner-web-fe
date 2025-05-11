import React, { useContext, useState } from "react";
import axios from "axios";

export const ExerciseStateContext = React.createContext();
export const ExerciseDispatchContext = React.createContext();

export const ExerciseProvider = ({ children }) => {
    const [bmi, setBmi] = useState(null);
    const [exerciseLogs, setExerciseLogs] = useState([]);
    const [calorieLogs, setCalorieLogs] = useState([]);

    const saveBMI = async ({ gender, age, height, weight, token }) => {
        try {
            const response = await axios.post(
                "http://ec2-54-180-89-105.ap-northeast-2.compute.amazonaws.com:8080/BMI/update",
                {
                    age: parseInt(age),
                    gender: gender,
                    height: parseFloat(height),
                    weight: parseFloat(weight),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            setBmi({ gender, age, height, weight });
            return { success: true };
        } catch (error) {
            console.error("BMI 저장 실패:", error);
            return { success: false };
        }
    };

    const fetchExerciseLogs = async (token) => {
        try {
            const response = await axios.get(
                "http://ec2-54-180-89-105.ap-northeast-2.compute.amazonaws.com:8080/exercise/logSearch",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setExerciseLogs(response.data);
        } catch (error) {
            console.error("운동 기록 조회 실패:", error);
        }
    };

    const fetchCalorieLogs = async (token) => {
        try {
            const response = await axios.get(
                "http://ec2-54-180-89-105.ap-northeast-2.compute.amazonaws.com:8080/exercise/calories",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setCalorieLogs(response.data);
        } catch (error) {
            console.error("칼로리 로그 조회 실패:", error);
        }
    };

    return (
        <ExerciseStateContext.Provider value={{ bmi, exerciseLogs, calorieLogs }}>
            <ExerciseDispatchContext.Provider value={{ saveBMI, fetchExerciseLogs, fetchCalorieLogs }}>
                {children}
            </ExerciseDispatchContext.Provider>
        </ExerciseStateContext.Provider>
    );
};

export const useExerciseState = () => useContext(ExerciseStateContext);
export const useExerciseDispatch = () => useContext(ExerciseDispatchContext);