import { createContext, useContext, useState, ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
};

interface AuthContextProps {
    token: string;
    userId: string;
    username: string;
    setUser: (token: string, userId: string, username: string) => void
}

const defaultValues: AuthContextProps = {
    token: '',
    userId: '',
    username: '',
    setUser: () => { }
}

const AuthContext = createContext<AuthContextProps>(defaultValues);

export function AuthProvider({ children }: AuthProviderProps) {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    const setUser = (
        token: string,
        userId: string,
        username: string,
    ) => {
        setToken(token);
        setUserId(userId);
        setUsername(username);

        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
    };

    return (
        <AuthContext.Provider
            value={{ token, userId, username, setUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
