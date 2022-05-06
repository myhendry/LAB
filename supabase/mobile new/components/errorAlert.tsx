import { Alert } from "react-native";

type Props = {
  title: string;
  message: string;
};

export const ErrorAlert = ({ title, message }: Props) => {
  return Alert.alert(title, message, [
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};
