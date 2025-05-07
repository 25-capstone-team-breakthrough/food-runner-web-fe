import React, { useContext, useState } from "react";
import axios from "axios";

export const AuthStateContext = React.createContext();
export const AuthDispatchContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const signup = async (account, password, name) => {
        try {
            const response = await axios.post("http://ec2-13-125-126-160.ap-northeast-2.compute.amazonaws.com:8080/users/signup", {
                account,
                password,
                name
            });
            setIsLoggedIn(true);
            setUser({
                account: response.data.account,
                name: response.data.name,
                token: response.data.token,
            });
            return true;
        } catch (error) {
            console.error("회원가입 실패:", error);
            return false;
        }
    };

    const login = async (account, password) => {
        try {
            const response = await axios.post("http://ec2-13-125-126-160.ap-northeast-2.compute.amazonaws.com:8080/users/login", {
                account,
                password,
            });
            setIsLoggedIn(true);
            setUser({
                name: response.data.name,
                role: response.data.role,
                token: response.data.token,
            });
            return true;
        } catch (error) {
            console.error("로그인 실패:", error);
            return false;
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthStateContext.Provider value={{ isLoggedIn, user }}>
            <AuthDispatchContext.Provider value={{ login, logout, signup }}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);