import React, { useLayoutEffect, useState } from "react";
import { Button } from "@rneui/base";
import { NEXT_PUBLIC_SUPABASE_URL } from "react-native-dotenv";

import { StyleSheet, View, Text } from "react-native";
import { MyModal } from "../components";

type Props = {
  navigation: any;
};

const Home = ({ navigation }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button title="Show" onPress={() => setShowModal(true)} />
  //     ),
  //   });
  // }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        onPress={() => navigation.navigate("Profile")}
        title="Go to Profile"
      />
      <Button onPress={() => setShowModal(true)} title="Show Modal" />
      <MyModal isVisible={showModal} onClick={() => setShowModal(false)} />
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

export default Home;
