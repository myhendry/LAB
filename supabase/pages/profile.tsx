import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { Layout } from "../components/common";
import { supabase } from "../utils/client";

type Props = {};

const Profile = (props: Props) => {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const userProfile = await supabase.auth.user();
      if (!userProfile) {
        router.push("/auth");
      } else {
        setProfile(userProfile);
      }
    })();
    // eslint-disable-next-line
  }, []);

  if (!profile) return null;

  return (
    <Layout>
      <div>
        <div>
          <p>Profile</p>
          <p>{profile.email}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
