import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  token: string;
  userId: string;
  userRole: string;
  setToken: Dispatch<SetStateAction<string>>;
  setUserId: Dispatch<SetStateAction<string>>;
  setUserRole: Dispatch<SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextProps>({
  token: '',
  userId: '',
  userRole: '',
  setToken: () => {},
  setUserId: () => {},
  setUserRole: () => {},
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');

  return (
    <AuthContext.Provider value={{ token, userId, userRole, setToken, setUserId, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
