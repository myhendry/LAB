import { useEffect, useState } from "react";

import { useAuth } from "../context/auth-context";
import { auth } from "../firebase";

const AuthStateChanged: React.FC = ({ children }) => {
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
    //eslint-disable-next-line
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12" />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default AuthStateChanged;
