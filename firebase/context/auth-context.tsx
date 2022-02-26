import React, {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export interface IAuthContext {
  registerWithEmail: (email: string, password: string) => void;
  loginWithEmail: (email: string, password: string) => void;
  logOut: () => void;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
}

export const AuthContext = createContext<IAuthContext>(null!);

const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const loginWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const registerWithEmail = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        registerWithEmail,
        loginWithEmail,
        logOut,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
