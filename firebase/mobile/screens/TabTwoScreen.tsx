import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-elements";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import EditScreenInfo from "../components/EditScreenInfo";
import { BottomTabsParams } from "../navigation";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { IThing } from "../types/app";

interface IProps
  extends BottomTabScreenProps<BottomTabsParams, "BottomTabOne"> {
  data?: string;
}

export default function TabTwoScreen({ navigation, data }: IProps) {
  const [things, setThings] = useState<IThing[]>([]);
  useEffect(() => {
    (async () => {
      //! Using getDocs so no listener attached
      const data = await getDocs(collection(db, "things"));

      const res = data.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setThings(res as IThing[]);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        title="Move"
        onPress={() => navigation.navigate("BottomTabOne")}
      />
      {things.map((t) => {
        return <Text key={t.id}>{t.name}</Text>;
      })}

      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
