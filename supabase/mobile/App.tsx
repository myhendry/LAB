import "react-native-url-polyfill/auto";

import { ThemeProvider, createTheme } from "@rneui/themed";

import AuthProvider from "./context/auth-context";
import AppProvider from "./context/app-context";
import Navigator from "./navigation";
import { useEffect } from "react";
import { LogBox } from "react-native";

const theme = createTheme({
  lightColors: {
    primary: "#e7e7e8",
  },
  darkColors: {
    primary: "#000",
  },
  Button: {
    raised: true,
  },
  mode: "dark",
});

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(["Setting a timer"]);
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <AppProvider>
          <Navigator />
        </AppProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
