import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import {
  Button,
  Image,
  Input,
  Text,
  useTheme,
  makeStyles,
} from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { signIn, signUp } from "../firebase";

type Props = {};

type FormData = {
  email: string;
  password: string;
};

enum Mode {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
}

const Auth = (props: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [mode, setMode] = useState<string>(Mode.SIGN_UP);
  const [authErrorMsg, setAuthErrorMsg] = useState<string>("");
  const { theme } = useTheme();
  const styles = useStyles(theme);

  const onSubmit = async ({ email, password }: FormData) => {
    setAuthErrorMsg("");
    try {
      mode === Mode.SIGN_IN
        ? await signIn(email, password)
        : await signUp(email, password);
    } catch (error) {
      setAuthErrorMsg("Authentication Failed");
      console.log(error);
    }
    reset();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image
          source={require("../assets/images/favicon.png")}
          style={styles.logo}
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onBlur, onChange, value } }) => (
            // https://reactnativeelements.com/docs/input
            <Input
              placeholder="Email"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text style={styles.errorMsg}>Email field is required</Text>
        )}
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onBlur, onChange, value } }) => (
            // https://reactnativeelements.com/docs/input
            <Input
              placeholder="Password"
              leftIcon={{ type: "font-awesome", name: "comment" }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              secureTextEntry
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text style={styles.errorMsg}>Password field is required</Text>
        )}
        <Text style={styles.errorMsg}>{authErrorMsg}</Text>
        <Button
          title="Submit"
          onPress={handleSubmit(onSubmit)}
          buttonStyle={styles.buttonStyle}
          containerStyle={styles.button}
        />
        <TouchableOpacity
          style={{ marginTop: 15 }}
          onPress={() =>
            mode === Mode.SIGN_UP
              ? setMode(Mode.SIGN_IN)
              : setMode(Mode.SIGN_UP)
          }
        >
          <Text>
            {mode === Mode.SIGN_UP
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Auth;

const useStyles = makeStyles((theme, props) => ({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: theme.colors?.tertiary,
  },
  button: {
    width: "100%",
  },
  buttonStyle: {
    backgroundColor: theme.colors?.primary,
  },
  errorMsg: {
    color: theme.colors?.error,
  },
  logo: { width: 180, height: 180 },
}));
