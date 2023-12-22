import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  token: string;
  userId: string;
  userRole: string;
  userName: string;
  userEmail: string;
  setToken: Dispatch<SetStateAction<string>>;
  setUserId: Dispatch<SetStateAction<string>>;
  setUserRole: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
  setUserEmail: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps>({
  token: '',
  userId: '',
  userRole: '',
  userName: '',
  userEmail: '',
  setToken: () => { },
  setUserId: () => { },
  setUserRole: () => { },
  setUserName: () => { },
  setUserEmail: () => { },
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        userRole,
        userName,
        userEmail,
        setToken,
        setUserId,
        setUserRole,
        setUserName,
        setUserEmail
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
