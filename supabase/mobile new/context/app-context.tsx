import { createContext, FC, useContext } from "react";
import { useTheme } from "@rneui/themed";

export interface IAppContext {
  toggleTheme: () => void;
}

export const AppContext = createContext<IAppContext>(null!);

interface IProps {}

const AppProvider: FC<IProps> = ({ children }) => {
  const { updateTheme } = useTheme();

  const toggleTheme = () => {
    updateTheme((theme) => ({
      mode: theme.mode === "light" ? "dark" : "light",
    }));
  };

  return (
    <AppContext.Provider
      value={{
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(`useUser must be used within a UserContextProvider.`);
  }

  return context;
};

export default AppProvider;
