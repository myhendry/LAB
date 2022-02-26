/*
  https://reactnavigation.org/docs/typescript/
  https://github.com/dasaco/react-native-navigation-tutorial
  https://github.com/jtstodola/react-native-nested-nav-example/tree/main/app/navigation
*/
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { useContext, useEffect } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Text,
  Pressable,
  View,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";

import Colors from "../constants/Colors";
import { auth } from "../firebase";
import useColorScheme from "../hooks/useColorScheme";
import Auth from "../screens/Auth";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
//import LinkingConfiguration from "./LinkingConfiguration";
import { AppContext } from "../context/AppContext";
import ChildScreen from "../screens/ChildScreen";

export type AuthStackParms = {
  Auth: undefined;
};
const AuthStack = createNativeStackNavigator<AuthStackParms>();

export type RootStackParams = {
  TabStack: NavigatorScreenParams<BottomTabsParams> | undefined;
  Modal: undefined;
  NotFound: undefined;
};
const RootStack = createNativeStackNavigator<RootStackParams>();

export type BottomTabsParams = {
  BottomTabOne: undefined;
  BottomTabTwo: undefined;
};
const BottomTabs = createBottomTabNavigator<BottomTabsParams>();

export type TabStackParams = {
  TabStackOneParent: undefined;
  TabStackOneChild: { id: string; name: string; seconds: number };
};
const TabStack = createNativeStackNavigator<TabStackParams>();

// export type ChildScreenRouteProps = RouteProp<
//   TabStackParams,
//   "TabStackOneChild"
// >;

export default function Navigation() {
  const { setIsAuthenticated, isLoading, setIsLoading } =
    useContext(AppContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);

      if (user) {
        setIsAuthenticated(true);
      }
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    <View style={{ flex: 1 }}>
      <ActivityIndicator />
    </View>;
  }

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
function RootNavigator() {
  const { isAuthenticated } = useContext(AppContext);

  if (isAuthenticated) {
    return (
      <RootStack.Navigator>
        <RootStack.Screen
          name="TabStack"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />

        <RootStack.Group screenOptions={{ presentation: "modal" }}>
          <RootStack.Screen name="Modal" component={ModalScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    );
  }

  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Auth" component={Auth} />
    </AuthStack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTabs.Screen
        name="BottomTabOne"
        component={TabStackNavigator}
        options={{ headerShown: false }}
      />
      <BottomTabs.Screen
        name="BottomTabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTabs.Navigator>
  );
}

const TabStackNavigator = () => {
  return (
    <TabStack.Navigator>
      <TabStack.Screen
        name="TabStackOneParent"
        component={TabOneScreen}
        options={({ navigation }) => ({
          title: "Parent",
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Modal")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                // color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <TabStack.Screen
        name="TabStackOneChild"
        component={ChildScreen}
        options={{
          title: "Child",
        }}
      />
    </TabStack.Navigator>
  );
};

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
