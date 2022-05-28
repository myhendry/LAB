import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Spinner,
  Editable,
  EditablePreview,
  EditableInput,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  PinInput,
  PinInputField,
  FormLabel,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ColorSchemeToggle } from "../common";

type Props = {};

type Inputs = {
  name: string;
  nickname: string;
  age: number;
  pin: number;
};

const schema = yup
  .object({
    name: yup.string().required(),
    nickname: yup.string().required(),
  })
  .required();

export const Form = (props: Props) => {
  const [recName, setRecName] = useState<string>("");
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
    setRecName(values.name);
    console.log(values);
    reset();
    setIsLoading(false);
  };

  return (
    <Box p="2">
      <ColorSchemeToggle />
      <Text>Hello World</Text>
      <Text>{recName}</Text>
      {isLoading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          {/* <FormLabel htmlFor="name">First name</FormLabel> */}
          <Input
            marginTop={2}
            id="name"
            placeholder="Name"
            disabled={isLoading}
            {...register("name")}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.nickname}>
          <Editable defaultValue="Take some chakra" marginTop="2">
            <EditablePreview />
            <EditableInput {...register("nickname")} disabled={isLoading} />
          </Editable>
          <FormErrorMessage>
            {errors.nickname && errors.nickname.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.age}>
          <NumberInput step={5} defaultValue={15} min={10} max={30}>
            <NumberInputField {...register("age")} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl isInvalid={!!errors.pin}>
          <HStack>
            <PinInput>
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
        </FormControl>
        {/* <IconButton
          variant="outline"
          colorScheme="teal"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<EmailIcon />}
        /> */}
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};
