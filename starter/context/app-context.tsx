import React, {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useState,
  useContext,
} from "react";

export interface IAppContext {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

export const AppContext = createContext<IAppContext>(null!);

const AppProvider: FC = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);

  return (
    <AppContext.Provider
      value={{
        isDark,
        setIsDark,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};

export default AppProvider;
