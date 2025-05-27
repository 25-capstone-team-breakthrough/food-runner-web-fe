import React, { useContext, useState } from "react";
import axios from "axios";
import { useLoadingManager } from "../hooks/useLoadingManager";
import { API_BASE_URL } from "../apiConfig";

export const ExerciseStateContext = React.createContext();
export const ExerciseDispatchContext = React.createContext();

export const ExerciseProvider = ({ children }) => {
    const [bmi, setBmi] = useState(null);
    const [exerciseLogs, setExerciseLogs] = useState([]);
    const [calorieLogs, setCalorieLogs] = useState([]);
    const [inbodyImages, setInbodyImages] = useState([]);
    const [recommendedVideos, setRecommendedVideos] = useState([]);
    const [searchedVideos, setSearchedVideos] = useState({}); // { "어깨": [...], "가슴": [...], ... }

    const { loading, startLoading, endLoading } = useLoadingManager([
        "bmi",
        "exerciseLogs",
        "calorieLogs",
        "inbodyImages",
        "exerciseVideos"
    ]);

    const saveBMI = async ({ gender, age, height, weight, token }) => {
        try {
            startLoading("bmi");
            await axios.post(
                `${API_BASE_URL}/BMI/update`,
                {
                    age: parseInt(age),
                    gender,
                    height: parseFloat(height),
                    weight,
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
        } finally {
            endLoading("bmi");
        }
    };

    const fetchExerciseLogs = async (token) => {
        try {
            startLoading("exerciseLogs");
            const response = await axios.get(
                `${API_BASE_URL}/exercise/logSearch`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            setExerciseLogs(response.data);
        } catch (error) {
            console.error("운동 기록 조회 실패:", error);
        } finally {
            endLoading("exerciseLogs");
        }
    };

    const fetchCalorieLogs = async (token) => {
        try {
            startLoading("calorieLogs");
            const response = await axios.get(
                `${API_BASE_URL}/exercise/calories`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data);
            setCalorieLogs(response.data);
        } catch (error) {
            console.error("칼로리 로그 조회 실패:", error);
        } finally {
            endLoading("calorieLogs");
        }
    };

    const fetchInbodyImages = async (token) => {
        try {
            startLoading("inbodyImages");
            const res = await axios.get(`${API_BASE_URL}/inbody/image-info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data);
            setInbodyImages(res.data);
        } catch (error) {
            console.error("인바디 이미지 조회 실패:", error);
            setInbodyImages([]);
        } finally {
            endLoading("inbodyImages");
        }
    };

    const fetchExerciseVideos = async (token) => {
        try {
            startLoading("exerciseVideos");
            const res = await axios.get(`${API_BASE_URL}/videos/exercises`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res.data.recommended);
            console.log(res.data.searched);
            setRecommendedVideos(res.data.recommended || []);
            setSearchedVideos(res.data.searched || {});
        } catch (error) {
            console.error("운동 영상 조회 실패:", error);
            setRecommendedVideos([]);
            setSearchedVideos({});
        } finally {
            endLoading("exerciseVideos");
        }
    };

    return (
        <ExerciseStateContext.Provider
            value={{
                bmi,
                exerciseLogs,
                calorieLogs,
                inbodyImages,
                recommendedVideos,
                searchedVideos,
                loading
            }}
        >
            <ExerciseDispatchContext.Provider
                value={{
                    saveBMI,
                    fetchExerciseLogs,
                    fetchCalorieLogs,
                    fetchInbodyImages,
                    fetchExerciseVideos
                }}
            >
                {children}
            </ExerciseDispatchContext.Provider>
        </ExerciseStateContext.Provider>
    );
};

export const useExerciseState = () => useContext(ExerciseStateContext);
export const useExerciseDispatch = () => useContext(ExerciseDispatchContext);