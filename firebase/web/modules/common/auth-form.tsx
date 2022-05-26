import React, { useState, useCallback } from "react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Box,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "../../context/auth-context";

type Props = {};

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

export const AuthForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login, logout } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    setIsLoading(true);

    await login(values.email, values.password);
    reset();
    setIsLoading(false);
  };

  return (
    <Box>
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
        <VStack>
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
        </VStack>
      </form>
    </Box>
  );
};
