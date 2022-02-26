import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
// import {
//   RootStackParamList,
//   RootStackScreenProps,
// } from "../temp/react-navigation";

import { RootStackParams } from "../navigation";

export default function NotFoundScreen({
  navigation,
}: NativeStackScreenProps<RootStackParams, "NotFound">) {
  // : RootStackScreenProps<"NotFound">

  const { navigate } =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesn't exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace("TabStack")}
        //onPress={() => navigate('Root')}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
