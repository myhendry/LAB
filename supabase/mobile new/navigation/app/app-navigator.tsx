import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DrawerScreenStack } from "./main-drawer";
import ProfileScreen from "../../screens/profile";

type Props = {};

const AppStack = createNativeStackNavigator();

export const AppNavigator = (props: Props) => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="DrawerHome"
        component={DrawerScreenStack}
        options={{ headerShown: false }}
      />
      <AppStack.Screen name="Profile" component={ProfileScreen} />
    </AppStack.Navigator>
  );
};
