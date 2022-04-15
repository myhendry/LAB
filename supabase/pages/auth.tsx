import { useEffect, useState } from "react";
import { NextPage, NextPageContext } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { supabase } from "../utils/client";
import { Layout } from "../components/common";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/router";

interface IProps {}

interface IFormInputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();

const Auth: NextPage<IProps> = () => {
  const { push } = useRouter();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { loginWithMagicLink, user } = useAuth();

  useEffect(() => {
    if (!!user) {
      push("/protected");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    try {
      const { error } = await loginWithMagicLink(data.email);

      if (error) {
        console.log(error);
      }

      setSubmitted(true);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <div className="flex justify-center">
          <h1>Please check your email to sign in</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div id="form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center space-y-2 px-5"
        >
          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="input input-bordered"
          />
          <p>{errors.email?.message}</p>

          <input className="btn btn-primary" type="submit" />
        </form>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ req }: NextPageContext) {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (user) {
    return { props: {}, redirect: { destination: "/protected" } };
  }

  return { props: { user } };
}

export default Auth;
