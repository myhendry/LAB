import { ApiError, AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import React, {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
  useEffect,
} from "react";

import { SupabaseAuthResponse } from "../types/app";
import { supabase } from "../utils/client";

export interface IAuthContext {
  isLoading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  loginWithMagicLink: (email: string) => Promise<SupabaseAuthResponse>;
  logOut: () => Promise<{ error: ApiError | null } | undefined>;
}

export const AuthContext = createContext<IAuthContext>(null!);

const AuthProvider: FC = ({ children }) => {
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session!);

        if (event === "SIGNED_IN") {
          setIsAuthenticated(true);
          router.push("/profile");
        }
        if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
        }
      }
    );

    checkUser();

    return () => authListener?.unsubscribe();
  }, []);

  const handleAuthChange = async (event: AuthChangeEvent, session: Session) => {
    await fetch(`/api/set-auth-cookie`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  const checkUser = async () => {
    const user = await supabase.auth.user();
    if (user) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  const loginWithMagicLink = (email: string) => {
    return supabase.auth.signIn({ email });
  };

  const logOut = async () => {
    try {
      const data = await supabase.auth.signOut();
      router.push("/auth");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginWithMagicLink,
        logOut,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
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
