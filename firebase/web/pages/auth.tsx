import React, { useState } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Box,
  Center,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../modules/common/navbar";

type Props = {};

interface Note {
  id: string;
  text: string;
  author?: string;
}

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const Auth = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    setIsLoading(true);
    console.log("values", values);
    reset();
    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <Box>
        {isLoading && <Spinner />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.email}>
            <Input
              marginTop={2}
              id="email"
              placeholder="email"
              {...register("email")}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <Input
              marginTop={2}
              id="password"
              placeholder="password"
              {...register("password")}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Center>
            <Button
              type="submit"
              mt={4}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
              disabled={isSubmitting || isLoading}
            >
              Submit
            </Button>
          </Center>
        </form>
      </Box>
    </>
  );
};

export default Auth;
