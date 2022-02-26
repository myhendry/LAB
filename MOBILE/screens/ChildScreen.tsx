import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Button, Divider, Input } from "react-native-elements";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Controller, useForm } from "react-hook-form";

import { TabStackParams } from "../navigation";
import { db } from "../firebase";
import { IThing } from "../types/app";
//import { useRoute } from "@react-navigation/native";
//import { ChildScreenRouteProps } from "../App";

//! Method2
interface IProps
  extends NativeStackScreenProps<TabStackParams, "TabStackOneChild"> {
  cool?: string;
}

type FormData = {
  name: string;
};

const ChildScreen = ({ navigation, route: { params }, cool }: IProps) => {
  const { name, seconds, id } = params;
  const [data, setData] = useState<IThing | null>(null);
  //! Method 1
  // const {
  //   params: { name, seconds },
  // } = useRoute<ChildScreenRouteProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (data: FormData) => {
    //! To update some fields of a document without overwriting the entire document, use the update() method:
    //! To create or overwrite a single document, use the set() method:
    //! If the document does not exist, it will be created. If the document does exist, its contents will be overwritten with the newly provided data, unless you specify that the data should be merged into the existing document, as follows:
    try {
      updateDoc(doc(db, "things", id), {
        name: data.name,
      });

      navigation.navigate("TabStackOneParent");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //! Get Single Data
    (async () => {
      const res = await getDoc(doc(db, "things", id));
      setData({
        ...res.data(),
        id: res.id,
      } as IThing);
    })();
  }, []);

  return (
    <View>
      <Text>Passing Params</Text>
      <Text>
        {name} {seconds}
      </Text>
      <Divider />

      <Text>From Firestore</Text>
      <Text>
        {data?.name} {data?.id}
      </Text>

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
      </View>
    </View>
  );
};

export default ChildScreen;

const styles = StyleSheet.create({});
