import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import { supabase } from "../utils/supabase";

type Props = {};

const Profile = (props: Props) => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const user = await supabase.auth.user();
      setUserData(user);
    };
    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Profile</Text>
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

export default Profile;
