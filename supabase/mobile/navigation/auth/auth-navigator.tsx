import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../../screens/login";
import SignupScreen from "../../screens/signup";
import AuthScreen from "../../screens/auth";

type Props = {};

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = (props: Props) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      {/* <AuthStack.Screen
        name="Auth"
        component={AuthScreen}
        options={{ headerShown: false }}
      /> */}
    </AuthStack.Navigator>
  );
};
