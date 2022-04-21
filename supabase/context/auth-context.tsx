import { ApiError, SupabaseClient, User } from "@supabase/supabase-js";
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
import { supabase } from "../utils/client";
import axios from "axios";

interface AuthUser extends User {
  is_subscribed: boolean;
  interval: string;
}
export interface IAuthContext {
  // setUser: Dispatch<SetStateAction<any>>;
  user: AuthUser | null;
  loginWithMagicLink: (email: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<{ error: ApiError | null } | undefined>;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>(null!);

interface IProps {
  supabaseClient: SupabaseClient;
}

const AuthProvider: FC<IProps> = ({ children, supabaseClient: { auth } }) => {
  const [user, setUser] = useState<AuthUser | null>(
    supabase.auth.user() as AuthUser
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { push } = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();

      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profile")
          .select("*")
          .eq("id", sessionUser.id)
          .single();

        setUser({
          ...sessionUser,
          ...profile,
        });

        setIsLoading(false);
      }
    };

    getUserProfile();

    auth.onAuthStateChange(() => {
      getUserProfile();
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      axios.post(`/api/set-supabase-cookie`, {
        event: user ? "SIGNED_IN" : "SIGNED_OUT",
        session: supabase.auth.session(),
      });
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const loginWithMagicLink = async (email: string) => {
    const data = await auth.signIn({ email });
    return data;
  };

  const signOut = async () => {
    try {
      const data = await auth.signOut();
      setUser(null);
      push("/auth");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginWithMagicLink,
        user,
        signOut,
        isLoading,
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
