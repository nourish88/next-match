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
import ProductAddForm from "./ProductAddForm";
import { Group } from "@prisma/client";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
  groups: Group[];
}

export default function CustomerAddModal({
  isOpen,
  onOpenChange,
  groups,
}: Props) {
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
            <ModalHeader>Ürün Ekleme Formu</ModalHeader>
            <ModalBody>
              <ProductAddForm groups={groups} onClose={onClose} />
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
