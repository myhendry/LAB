import { createContext, FC, ReactNode, useContext } from "react";

export interface AuthContext {
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContext>(null!);

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthContextProvider`);
  }
  return context;
};

export default AuthProvider;
