"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import BrandAddForm from "./BrandAddForm";
interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

function BrandAddModal({ isOpen, onOpenChange }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Marka Ekleme Formu</ModalHeader>
            <ModalBody>
              <BrandAddForm onClose={onClose} />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={onClose}>
                Kapat
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default BrandAddModal;
