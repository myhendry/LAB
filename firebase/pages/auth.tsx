import { useState } from "react";
import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";

import { Layout } from "../components/common";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import * as yup from "yup";

import { useAuth } from "../context/auth-context";
import { withPublic } from "../lib/routes";

type Inputs = {
  email: string;
  password: string;
  submitError: {
    message: string;
  };
};

enum Mode {
  SIGN_IN = "signIn",
  SIGN_UP = "signUp",
}

interface IProps {}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
  })
  .required();

//todo setError
const Auth: NextPage<IProps> = () => {
  const [mode, setMode] = useState<Mode>(Mode.SIGN_UP);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    //     watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { registerWithEmail, loginWithEmail } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    try {
      mode === Mode.SIGN_IN
        ? await loginWithEmail(email, password)
        : await registerWithEmail(email, password);
    } catch (error) {
      console.log(error);
      setError("submitError", { message: "Failed to Submit" });
    }
    reset();
  };

  // console.log(watch("email")); // watch input value by passing the name of it

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-5">
        <div className="form-control w-full max-w-xs">
          {mode == Mode.SIGN_IN ? <p>Sign In</p> : <p>Sign Up</p>}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 flex flex-col items-center"
          >
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <p className="text-red-700">{errors.email?.message}</p>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <p className="text-red-700">{errors.password?.message}</p>

            <p className="text-red-700">{errors.submitError?.message}</p>
            <input
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary"
            />
            <div
              onClick={() =>
                mode === Mode.SIGN_UP
                  ? setMode(Mode.SIGN_IN)
                  : setMode(Mode.SIGN_UP)
              }
            >
              {mode === Mode.SIGN_UP
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default withPublic(Auth);
