import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Center, VStack } from "@chakra-ui/react";
import Link from "next/link";

type Props = {};

const Auth = (props: Props) => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <VStack>
          <Center>
            <Link href={`/dashboard`}>
              <a className="cursor-pointer">Dashboard</a>
            </Link>
          </Center>
        </VStack>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
      <VStack>
        <Center>
          <Link href={`/dashboard`}>
            <a className="cursor-pointer">Dashboard</a>
          </Link>
        </Center>
      </VStack>
    </>
  );
};

export default Auth;
