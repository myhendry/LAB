import { NextPage } from "next";
import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
  useSession,
} from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Layout, Spinner } from "../components/common";

interface IProps {}

const Auth: NextPage<IProps> = () => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    (async () => {
      const providers = await getProviders();
      setProviders(providers);
    })();
  }, []);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (session) {
    return (
      <Layout title="D B">
        <div className="flex flex-col">
          <Link href="/">
            <a>Home</a>
          </Link>
          <p>Signed in as {session.user?.name}</p>
          <button type="button" onClick={() => signOut()}>
            Sign Out
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <div className="flex h-screen justify-center items-center">
      {providers?.github && (
        <>
          <button type="button" onClick={() => signIn(providers.github.id)}>
            Sign In With Github
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
