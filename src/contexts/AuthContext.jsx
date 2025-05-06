import React, { useContext, useState } from "react";

// 상태와 액션을 각각의 Context로 분리
export const AuthStateContext = React.createContext();
export const AuthDispatchContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [registeredUsers, setRegisteredUsers] = useState([
        { id: "hansung", password: "1234", name: "한성유저" }
    ]);

    const signup = (id, password, name) => {
        const exists = registeredUsers.some(user => user.id === id);
        if (exists) return false;
        setRegisteredUsers(prev => [...prev, { id, password, name }]);
        setIsLoggedIn(true);
        setUser({ id, name });
        return true;
    };

    const login = (id, password) => {
        const matched = registeredUsers.find(user => user.id === id && user.password === password);
        if (matched) {
            setIsLoggedIn(true);
            setUser({ id: matched.id, name: matched.name });
            return true;
        }
        return false;
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