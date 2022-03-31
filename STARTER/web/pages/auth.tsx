import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Layout } from "../components/common";

interface IProps {}

interface IFormInputs {
  email: string;
  age: number;
}

const schema = yup
  .object({
    email: yup.string().required(),
  })
  .required();

const Auth: NextPage<IProps> = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => {
    console.log(data);
    reset();
  };

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

export default Auth;
