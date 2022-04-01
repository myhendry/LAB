import { ApiError, SupabaseClient } from "@supabase/supabase-js";
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

export interface IAuthContext {
  // setUser: Dispatch<SetStateAction<any>>;
  isAuthenticated: boolean;
  loginWithMagicLink: (email: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<{ error: ApiError | null } | undefined>;
}

export const AuthContext = createContext<IAuthContext>(null!);

interface IProps {
  supabaseClient: SupabaseClient;
}

const AuthProvider: FC<IProps> = ({ children, supabaseClient: { auth } }) => {
  // const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    const { data: authListener } = auth.onAuthStateChange(
      async (event, session) => {
        handleAuthChange(event, session);
        if (event === "SIGNED_IN") {
          setIsAuthenticated(true);
          push("/protected");
        }
        if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
        }
      }
    );
    checkUser();
    return () => authListener?.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkUser = async () => {
    const user = await auth.user();
    if (user) {
      setIsAuthenticated(true);
    }
  };

  const handleAuthChange = async (event: string, session: any) => {
    try {
      await fetch("/api/auth", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        credentials: "same-origin",
        body: JSON.stringify({ event, session }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const loginWithMagicLink = async (email: string) => {
    const data = await auth.signIn({ email });
    return data;
  };

  const signOut = async () => {
    try {
      const data = await auth.signOut();
      push("/auth");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loginWithMagicLink,
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
