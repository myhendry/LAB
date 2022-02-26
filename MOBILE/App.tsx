import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import { useColorScheme } from "react-native-appearance";

import { theme } from "./utils";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import ContextWrapper from "./context/AppContext";

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);

export default function App() {
  const isLoadingComplete = useCachedResources();
  let colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ContextWrapper>
        <ThemeProvider theme={theme} useDark={colorScheme === "dark"}>
          <SafeAreaProvider>
            <Navigation />
            <StatusBar />
          </SafeAreaProvider>
        </ThemeProvider>
      </ContextWrapper>
    );
  }
}
