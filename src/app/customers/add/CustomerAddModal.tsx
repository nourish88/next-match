// app/customers/add/CustomerAddModal.tsx

"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import CustomerAddForm from "./CustomerAddForm";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export default function CustomerAddModal({ isOpen, onOpenChange }: Props) {
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
            <ModalHeader>Müşteri Ekleme Formu</ModalHeader>
            <ModalBody>
              <CustomerAddForm onClose={onClose} />
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
