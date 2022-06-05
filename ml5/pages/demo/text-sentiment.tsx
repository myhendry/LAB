import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormControl,
  Input,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Navbar from "../../modules/common/navbar";

type Props = {};

type Inputs = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

const TextSentiment = (props: Props) => {
  // https://learn.ml5js.org/#/reference/image-classifier
  // https://joelmasters.medium.com/build-an-online-sentiment-analysis-tool-with-ml5-js-and-react-in-10-minutes-83ce0758ee73
  // https://github.com/myhendry/react-ml5/blob/master/src/ml5/image/Ml5ImagePage.jsx
  let ml5: any;

  useEffect(() => {
    ml5 = require("ml5");
  }, []);

  const [sentiment, setSentiment] = useState<string>("");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    checkSentiment(values.name);
    reset();
  };

  const checkSentiment = (text: string) => {
    const sentiment = ml5.sentiment("movieReviews", () => {
      const { score } = sentiment.predict(text);
      const res = sentimentToValue(score);
      setSentiment(res);
    });
  };

  const sentimentToValue = (sentiment: number): string => {
    if (sentiment < 0.4) {
      return "negative";
    } else if (sentiment > 0.6) {
      return "positive";
    } else {
      return "neutral";
    }
  };

  return (
    <Box>
      <Navbar />
      <Text>Text Sentiment</Text>
      <Text>{sentiment}</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          <Input
            marginTop={2}
            id="name"
            placeholder="Name"
            {...register("name")}
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

export default TextSentiment;
