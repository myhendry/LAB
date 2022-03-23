import { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";

import { Layout } from "../../../../components/common";

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

const PostId: NextPage<IProps> = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // https://nextjs.org/docs/routing/dynamic-routes
  const router = useRouter();
  console.log("query", router.query);

  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col justify-center space-y-2 mx-auto w-full max-w-md border rounded p-5">
          <label className="label">
            <span className="label-text mr-5">Name</span>
            <input
              {...register("firstName")}
              type="text"
              className="input-primary input-bordered w-full"
            />
            <p>{errors.firstName?.message}</p>
          </label>
          <label className="label">
            <span className="label-text mr-5">Age</span>
            <input
              {...register("age")}
              type="number"
              className="input-primary input-bordered w-full"
            />
            <p>{errors.age?.message}</p>
          </label>

          <input type="submit" className="btn btn-primary" />
        </div>
      </form>
    </Layout>
  );
};

export default PostId;
