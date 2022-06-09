import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ColorSchemeToggle } from "../common";
import { Demo__factory } from "../../typechain/factories/Demo__factory";
import { CallDemo__factory } from "../../typechain/factories/CallDemo__factory";
import {
  demoContractAddress,
  callDemoContractAddress,
} from "../../config/contract-address";

type Props = {};

type Inputs = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

//* Localhost
const provider = new ethers.providers.JsonRpcProvider();
//* Infura Rinkeby
// const provider = new ethers.providers.InfuraProvider(
//   "rinkeby",
//   process.env.INFURA_API_KEY
// );
//* Alchemy Hardhat
// const provider = new ethers.providers.AlchemyProvider(
//   "mainnet",
//   process.env.ALCHEMY_API_KEY
// );
//* Alchemy Rinkeby
// const provider = new ethers.providers.AlchemyProvider(
//   "rinkeby",
//   process.env.ALCHEMY_API_KEY
// );

export const CryptoForm = (props: Props) => {
  const [recName, setRecName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadDemos();
    loadCallDemos();
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const loadCallDemos = async () => {
    const demoContract = Demo__factory.connect(demoContractAddress, provider);
    const callDemo = CallDemo__factory.connect(
      callDemoContractAddress,
      provider
    );
    const name = await callDemo.getName(demoContract.address);
    console.log("name", name);
  };

  const loadDemos = async () => {
    setIsLoading(true);

    console.log("provider", provider);
    const demoContract = Demo__factory.connect(demoContractAddress, provider);
    console.log("demoContract", demoContract);
    const name = await demoContract.getName();
    console.log("name", name);
    setRecName(name);
    setIsLoading(false);
  };

  const setName = async (name: string) => {
    setIsLoading(true);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const demoContract = Demo__factory.connect(demoContractAddress, signer);
    const tx = await demoContract.setName(name);
    await tx.wait();
    await loadDemos();
    reset();
    setIsLoading(false);
  };

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    await setName(values.name);
  };

  return (
    <Box className="p-12">
      <ColorSchemeToggle />
      <Text>Hello World</Text>
      <Text>{recName}</Text>
      {isLoading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          {/* <FormLabel htmlFor="name">First name</FormLabel> */}
          <Input
            className="mt-30"
            id="name"
            placeholder="name"
            disabled={isLoading}
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
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
