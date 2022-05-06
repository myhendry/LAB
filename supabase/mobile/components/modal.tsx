import { Button } from "@rneui/base";
import React from "react";

import { Modal, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  isVisible: boolean;
  onClick: () => void;
};

export const MyModal = ({ isVisible, onClick }: Props) => {
  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={false}
    >
      <SafeAreaView>
        <Text>My Modal</Text>
        <Button title="Close Modal" onPress={onClick} />
      </SafeAreaView>
    </Modal>
  );
};
