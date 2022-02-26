import React, {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

// https://betterprogramming.pub/how-to-use-react-context-with-typescript-the-easy-way-2ed1010f6e84

export interface IGlobalContext {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<IGlobalContext>(null!);

const ContextWrapper: FC = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextWrapper;
