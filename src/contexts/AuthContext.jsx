import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthStateContext = React.createContext();
export const AuthDispatchContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isNewUser, setIsNewUser] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const login = async (account, password) => {
        try {
            const response = await axios.post("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/users/login", {
                account,
                password,
            });

            const userData = {
                name: response.data.name,
                role: response.data.role,
                token: response.data.token,
            };

            setIsLoggedIn(true);
            setUser(userData);

            // 저장
            localStorage.setItem("auth", JSON.stringify(userData));
            localStorage.setItem("loginTime", Date.now());

            // 동기화
            const newUserFlag = localStorage.getItem("isNewUser") === "true";
            setIsNewUser(newUserFlag);

            return true;
        } catch (error) {
            console.error("로그인 실패:", error);
            return false;
        }
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
                    
                    // 자동 로그인 복원 시도 시에도 고려
                    const newUserFlag = localStorage.getItem("isNewUser") === "true";
                    setIsNewUser(newUserFlag);
                    
                    // 마지막 활동 시점 기준이 아닌 토큰 발급 시점 기준 남은 시간
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

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setIsNewUser(false);
        localStorage.removeItem("auth");
        localStorage.removeItem("isNewUser");
        localStorage.removeItem("loginTime");
    };

    const signup = async (account, password, name) => {
        try {
            const response = await axios.post("http://ec2-13-209-199-97.ap-northeast-2.compute.amazonaws.com:8080/users/signup", {
                account,
                password,
                name
            });

            localStorage.setItem("isNewUser", "true");
            setIsNewUser(true);
            return true;
        } catch (error) {
            return false;
        }
    };

    const testLogin = () => {
        setIsLoggedIn(true);
        setUser({
            name: "test",
            role: "test",
            token: "1234"
        });
        setIsNewUser(false);
        return true;
    };

    return (
        <AuthStateContext.Provider value={{ isLoggedIn, user, isNewUser, isInitialized }}>
            <AuthDispatchContext.Provider value={{ login, logout, signup, testLogin }}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);