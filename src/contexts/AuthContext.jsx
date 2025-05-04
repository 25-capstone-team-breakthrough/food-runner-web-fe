import React, { useContext, useState } from "react";

// 상태와 액션을 각각의 Context로 분리
export const AuthStateContext = React.createContext();
export const AuthDispatchContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const login = (id, password) => {
        if (id === "hansung" && password === "1234") {
            setIsLoggedIn(true);
            setUser({ id: "hansung", name: "한성유저" });
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
    };

    return (
        <AuthStateContext.Provider value={{ isLoggedIn, user }}>
            <AuthDispatchContext.Provider value={{ login, logout }}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
};

export const useAuthState = () => useContext(AuthStateContext);
export const useAuthDispatch = () => useContext(AuthDispatchContext);