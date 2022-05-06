// https://github.com/zetachang/react-native-dotenv/issues/76

declare module "react-native-dotenv" {
  export const NEXT_PUBLIC_SUPABASE_URL: string;
  export const NEXT_PUBLIC_SUPABASE_API_KEY: string;
  export const ENV: "dev" | "prod";
}
