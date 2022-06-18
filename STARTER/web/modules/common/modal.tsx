import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  children: React.ReactNode;
}

// Implement Modal in Next JS using createPortal | Next JS Modal https://youtu.be/iolkZAg00gk

export const MyModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Hey",
  children,
}: Props) => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const modalContent = (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onConfirm}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return mounted
    ? createPortal(modalContent, (document as any).getElementById("modal"))
    : null;
};
