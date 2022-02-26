import { StyleSheet, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";
import {
  Text,
  Input,
  Button,
  Divider,
  ListItem,
  Rating,
  useTheme,
} from "react-native-elements";
import { useContext, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AppContext } from "../context/AppContext";
import { IThing } from "../types/app";
import { TabStackParams } from "../navigation";
import { auth, db } from "../firebase";

type FormData = {
  name: string;
};

export default function TabOneScreen({
  navigation,
}: NativeStackScreenProps<TabStackParams, "TabStackOneParent">) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
  });

  const [things, setThings] = useState<IThing[]>([]);
  const { theme } = useTheme();
  const { setIsAuthenticated } = useContext(AppContext);

  const onSubmit = async (data: FormData) => {
    // https://firebase.google.com/docs/firestore/manage-data/add-data
    await addDoc(collection(db, "things"), {
      name: data.name,
      createdAt: serverTimestamp(),
    });

    // To update some fields of a document without overwriting the entire document, use the update() method:
    // To create or overwrite a single document, use the set() method:
    // If the document does not exist, it will be created. If the document does exist, its contents will be overwritten with the newly provided data, unless you specify that the data should be merged into the existing document, as follows:
    //     setDoc(doc(db, "demo", "7FKqewmmRXVxwak3qygT"), {
    //       name: data.name,
    //     });
    reset();
  };

  const onDelete = async (id: string) => {
    try {
      deleteDoc(doc(db, "things", id));
    } catch (error) {
      console.log(error);
    }
  };

  const thingsQuery = query(
    collection(db, "things"),
    orderBy("createdAt", "desc")
  );

  useEffect(() => {
    //! Use onSnapshot so got listener attached
    const unsubscribe = onSnapshot(thingsQuery, (querySnapshot) => {
      const things = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setThings(things as IThing[]);
    });

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right"]}>
      <View
        style={{
          alignItems: "center",
          marginVertical: 20,
        }}
      >
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onBlur, onChange, value } }) => (
            // https://reactnativeelements.com/docs/input
            <Input
              placeholder="Name"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && <Text>Name field is required</Text>}
        <Button
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          containerStyle={{
            width: 250,
          }}
        />
        <Button
          title="Logout"
          onPress={() => {
            try {
              auth.signOut().then(() => setIsAuthenticated(false));
            } catch (error) {
              console.log("signout", error);
            }
          }}
          buttonStyle={{
            backgroundColor: "red",
            marginTop: 10,
          }}
          containerStyle={{
            width: 250,
          }}
        />
      </View>
      <Divider />
      <FlatList
        data={things}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <ListItem.Swipeable
              leftContent={
                <Button
                  title="Info"
                  icon={{ name: "info", color: "white" }}
                  buttonStyle={{ minHeight: "100%" }}
                  onPress={() => {
                    navigation.navigate("TabStackOneChild", {
                      id: item.id,
                      name: item.name,
                      seconds: item.createdAt?.seconds,
                    });
                  }}
                />
              }
              rightContent={
                <Button
                  title="Delete"
                  icon={{ name: "delete", color: "white" }}
                  buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                  onPress={() => onDelete(item.id)}
                />
              }
            >
              <ListItem.Content>
                <ListItem.Title>
                  {item.name} {item.createdAt?.seconds}
                </ListItem.Title>
              </ListItem.Content>
              {/* <ListItem.Chevron /> */}
            </ListItem.Swipeable>
          );
        }}
      />
    </SafeAreaView>
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
