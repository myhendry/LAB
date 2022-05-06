import { View, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button } from "@rneui/base";

import HomeScreen from "../../screens/home";
import AboutScreen from "../../screens/about";
import { useAuth } from "../../context/auth-context";

const DrawerStack = createDrawerNavigator();

export const DrawerScreenStack = () => {
  return (
    <DrawerStack.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <DrawerStack.Screen name="Home" component={HomeScreen} />
      <DrawerStack.Screen name="About" component={AboutScreen} />
    </DrawerStack.Navigator>
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { signOut } = useAuth();
  return (
    <>
      <DrawerContentScrollView {...props}>
        <View>
          <Text>HEADER</Text>
        </View>
        <View style={{ flex: 1 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View>
        <Button
          title="EXIT"
          onPress={() => {
            props.navigation.closeDrawer();
            signOut();
          }}
        />
      </View>
    </>
  );
};
