import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Input, Text, Button } from "@rneui/themed";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { supabase } from "../utils/supabase";
import { ErrorAlert } from "../components";

type Props = {
  navigation: any;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid Email Format")
    .required("Email is a Required Field"),
  password: yup.string().required("Password is a Required Field"),
});

interface IFormInputs {
  email: string;
  password: string;
}

const Signup = ({ navigation }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const { error, user } = await supabase.auth.signUp(data);
    if (error) {
      console.log(error.message);
      ErrorAlert({ title: "Error Registering User", message: error.message });
      return;
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up</Text>
      <View style={{ width: "80%" }}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Email"
              shake={() => {}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && <Text>Email is required.</Text>}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Password"
              shake={() => {}}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && <Text>Password is required.</Text>}

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ paddingTop: 15 }}>Member? Sign In Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Signup;
