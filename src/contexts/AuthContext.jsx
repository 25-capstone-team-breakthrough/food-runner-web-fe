import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../apiConfig";

export const AuthStateContext = React.createContext();
export const AuthDispatchContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const login = async (account, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/users/login`, {
                account,
                password,
            });
    
            const userData = {
                name: response.data.name,
                role: response.data.role,
                token: response.data.token,
                existBmi: response.data.existBmi,
            };
    
            setIsLoggedIn(true);
            setUser(userData);
            localStorage.setItem("auth", JSON.stringify(userData));
            localStorage.setItem("loginTime", Date.now());
    
            return { success: true, existBmi: response.data.existBmi };
        } catch (error) {
            console.error("로그인 실패:", error);
            return { success: false };
        }
    };

    const signup = async (account, password, name) => {
        try {
            await axios.post(`${API_BASE_URL}/users/signup`, {
                account,
                password,
                name
            });
    
            // 회원가입만으로 로그인은 하지 않음
            return true;
        } catch (error) {
            console.error("회원가입 실패:", error);
            return false;
        }
    };    

    const testLogin = () => {
        setIsLoggedIn(true);
        setUser({
            name: "test",
            role: "test",
            token: "1234",
            existBmi: true // 테스트 계정은 기본 true
        });
        return true;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("auth");
        localStorage.removeItem("loginTime");
    };

    // BMI 등록 완료 후 상태 업데이트
    const markBmiCompleted = () => {
        setUser((prev) => prev ? { ...prev, existBmi: true } : prev);
    };

    useEffect(() => {
        const stored = localStorage.getItem("auth");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                const decoded = jwtDecode(parsed.token);
                const now = Date.now() / 1000;
                if (decoded.exp > now) {
                    setUser(parsed);
                    setIsLoggedIn(true);
                    const timeout = (decoded.exp * 1000) - Date.now();
                    setTimeout(() => logout(), timeout);
                } else {
                    logout();
                }
            } catch (err) {
                logout();
            }
        }
        setIsInitialized(true);
    }, []);

    return (
        <AuthStateContext.Provider value={{ isLoggedIn, user, isInitialized }}>
            <AuthDispatchContext.Provider value={{ login, logout, signup, testLogin, markBmiCompleted }}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);