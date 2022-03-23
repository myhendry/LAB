import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Layout } from "../components/common";

type Inputs = {
  firstName: string;
  age: number;
};

interface IProps {}

const schema = yup
  .object({
    firstName: yup.string().required(),
    age: yup.number().positive().integer().required(),
  })
  .required();

const New: NextPage<IProps> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2 mx-auto">
          <label className="label">
            <span className="label-text">Name</span>
            <input
              {...register("firstName")}
              type="text"
              // placeholder="Name"
              className="input-primary input-bordered w-full max-w-xs"
            />
            <p>{errors.firstName?.message}</p>
          </label>
          <label className="label">
            <span className="label-text">Age</span>
            <input
              {...register("age")}
              type="number"
              // placeholder="Age"
              className="input-primary input-bordered w-full max-w-xs"
            />
            <p>{errors.age?.message}</p>
          </label>

          <input type="submit" />
        </div>
      </form>
    </Layout>
  );
};

export default New;
