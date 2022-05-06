import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import { AppNavigator } from "./app/app-navigator";
import { AuthNavigator } from "./auth/auth-navigator";
import { useAuth } from "../context/auth-context";

type Props = {};

const Navigator = (props: Props) => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default Navigator;
