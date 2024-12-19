"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { FiUsers } from "react-icons/fi";
import { getCustomers } from "@/app/actions/customerActions";
import { Customer } from "@prisma/client";
import CustomersList from "./CustomersList";

import CustomerAddModal from "../add/CustomerAddModal";
import { IoMdAdd } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

// Define the Customer type

export default function CustomersGetForm() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [filters, setFilters] = useState({
    name: "",
    surName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchFilteredCustomers = async () => {
    setLoading(true);
    try {
      const result = await getCustomers(filters); // Pass filters to the action
      if (result.status === "success") {
        setCustomers(result.data!);
      } else {
        setCustomers([]);
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchFilteredCustomers();
  };

  return (
    <>
      <Card className="w-4/5 mx-auto mt-8">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-3">
            <FiUsers size={30} />
            <h1 className="text-3xl font-semibold">Müşteri Sorgulama</h1>
          </div>
        </CardHeader>
        <CardBody>
          {/* Query Section */}
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <Input
              aria-label="Name"
              name="name"
              placeholder="Ad ile Ara"
              value={filters.name}
              onChange={handleChange}
              variant="bordered"
            />
            <Input
              aria-label="Surname"
              name="surName"
              placeholder="Soyad ile Ara"
              value={filters.surName}
              onChange={handleChange}
              variant="bordered"
            />
            {/* <Input
              aria-label="Email"
              name="email"
              placeholder="Email ile Ara"
              value={filters.email}
              onChange={handleChange}
              variant="bordered"
            /> */}
            <Button type="submit" color="secondary" isLoading={loading}>
              <span className="text-xl">
                <IoSearchSharp />
              </span>
              Ara
            </Button>
          </form>
          <div className="flex">
            <Button onPress={onOpen} color="primary">
              <span className="text-xl">
                <IoMdAdd />
              </span>
              Yeni Ekle
            </Button>
          </div>
        </CardBody>
      </Card>
      <div>
        {customers?.length > 0 && (
          <CustomersList customers={customers}></CustomersList>
        )}
      </div>
      <CustomerAddModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      ></CustomerAddModal>
      {/* <Modal
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Müşteri Ekleme Formu
              </ModalHeader>
              <ModalBody>
                <CustomerAddForm></CustomerAddForm>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Kapat
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  );
}
