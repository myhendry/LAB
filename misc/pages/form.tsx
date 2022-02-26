import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Layout } from "../components/common";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

interface IProps {}

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().min(3).required(),
  })
  .required();

const Form: NextPage<IProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    //     watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    try {
      setIsLoading(true);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  // console.log(watch("email")); // watch input value by passing the name of it

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center p-5">
        <div className="form-control w-full max-w-xs">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 flex flex-col items-center"
          >
            {/* register your input into the hook by invoking the "register" function */}
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

            <input
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Form;
