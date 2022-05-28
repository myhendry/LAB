import React, { useEffect, useRef, useState } from "react";
import { Box, Text, Heading, Spinner, Center, VStack } from "@chakra-ui/react";
import Dropzone from "react-dropzone";

import Navbar from "../../modules/common/navbar";

type Props = {};

const ImageClassification = (props: Props) => {
  let ml5: any;

  const [imageObj, setImageObj] = useState<{
    pic: any;
    label: string;
    confidence: number;
    isLoading: boolean;
  }>({
    pic: null,
    label: "",
    confidence: 0,
    isLoading: false,
  });
  const imageRef = useRef<any>();

  useEffect(() => {
    ml5 = require("ml5");
  }, []);

  const onDrop = async (acceptedFiles: any) => {
    try {
      const pic = URL.createObjectURL(acceptedFiles[0]);

      setImageObj({
        pic,
        label: "",
        confidence: 0,
        isLoading: true,
      });

      const classifier = await ml5.imageClassifier("MobileNet");
      const results = await classifier.predict(imageRef.current);
      setImageObj((prev) => {
        return {
          ...prev,
          label: results[0].label,
          confidence: results[0].confidence,
          isLoading: false,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Navbar />
      <VStack>
        <Heading>Image Classification</Heading>
        <Center>
          {imageObj && imageObj.pic && (
            <img src={imageObj.pic} ref={imageRef} />
          )}
        </Center>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className="cursor-pointer">Drop Image Here</p>
              </div>
            </section>
          )}
        </Dropzone>
        <Box>
          {imageObj.isLoading ? (
            <Spinner />
          ) : (
            <Text>{`Prediction is ${
              imageObj.label
            } and Confidence is ${Math.round(
              imageObj.confidence * 100
            )}%`}</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default ImageClassification;
