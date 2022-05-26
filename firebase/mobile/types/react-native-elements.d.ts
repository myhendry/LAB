import { Button } from "react-native";
import { Colors } from "react-native-elements";
type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module "react-native-elements" {
  export interface Colors {
    background: string;
    foreground: string;
    primary: string;
    tertiary: string;
    secondary: string;
    white: string;
    text: string;
    secondaryText: string;
    iconGray: string;
  }

  export interface FullTheme {
    colors: RecursivePartial<Colors>;
  }
}
