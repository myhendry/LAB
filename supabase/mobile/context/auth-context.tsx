import { ApiError } from "@supabase/supabase-js";
import { createContext, FC, useContext, useEffect, useState } from "react";

import { supabase } from "../utils/supabase";

export interface IAuthContext {
  isAuthenticated: boolean;
  signOut: () => void;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: ApiError | null }>;
}

export const AuthContext = createContext<IAuthContext>(null!);

interface IProps {}

const AuthProvider: FC<IProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const signIn = async (email: string, password: string) => {
    const res = await supabase.auth.signIn({ email, password });
    return { error: res.error };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }

  return context;
};

export default AuthProvider;
