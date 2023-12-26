import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  token: string;
  userId: string;
  userRole: string;
  userName: string;
  userEmail: string;
  setUser: (accessToken: string, id: string, role: string, name: string, email: string) => void;
}

const defaultValues: AuthContextProps = {
  token: '',
  userId: '',
  userRole: '',
  userName: '',
  userEmail: '',
  setUser: () => {},
};

const AuthContext = createContext<AuthContextProps>(defaultValues);

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  const setUser = (
    accessToken: string,
    id: string,
    role: string,
    name: string,
    email: string
  ) => {
    setToken(accessToken);
    setUserId(id);
    setUserRole(role);
    setUserName(name);
    setUserEmail(email);

    // Updating local storage for data persistence
    localStorage.setItem('token', accessToken);
    localStorage.setItem('userId', id);
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
  };

  return (
    <AuthContext.Provider
      value={{ token, userId, userRole, userName, userEmail, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
