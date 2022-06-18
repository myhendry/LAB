import { User, Session, Provider, ApiError } from "@supabase/supabase-js";

export interface IListing {
  sys: {
    id: string;
  };
  fields: {
    images: IImage[];
    property: string;
    slug: string;
  };
}

export interface IImage {
  fields: {
    file: {
      url: string;
    };
  };
  sys: {
    id: string;
  };
}

export interface SupabaseAuthResponse {
  session: Session | null;
  user: User | null;
  provider?: Provider | undefined;
  url?: string | null | undefined;
  error: ApiError | null;
}
