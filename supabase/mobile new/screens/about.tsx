import React from "react";
import { StyleSheet, View, Text } from "react-native";

type Props = {
  navigation: any;
};

const About = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <Text>About</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default About;
