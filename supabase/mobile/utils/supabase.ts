import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_API_KEY,
} from "react-native-dotenv";

// https://medium.com/@kelvinpompey.me/things-to-look-out-for-using-supabase-with-react-native-9638b23e98c2
export const supabase = createClient(
  NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_API_KEY,
  {
    localStorage: AsyncStorage,
    detectSessionInUrl: false,
  }
);
