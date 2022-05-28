import { createContext, FC, ReactNode, useContext } from "react";

export interface AppContext {
  isApp: boolean;
}

export const AppContext = createContext<AppContext>(null!);

interface IAppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<IAppProviderProps> = ({ children }) => {
  return (
    <AppContext.Provider value={{ isApp: true }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(`useApp must be used within a AppContextProvider`);
  }
  return context;
};

export default AppProvider;
