import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { Customer } from "@prisma/client";
import { FiList } from "react-icons/fi";

interface Props {
  customers: Customer[]; // Define the props to accept an array of customers
}
function CustomersList({ customers }: Props) {
  const rows = customers.map((customer) => ({
    key: customer.id.toString(),
    id: customer.id,
    ad: customer.name,
    soyad: customer.surName,
    phoneNumber: customer.phoneNumber,
    createdAt: customer.createdAt.toLocaleDateString(),
  }));
  const columns = [
    { key: "id", label: "Müşteri Id" },
    { key: "ad", label: "Ad" },
    { key: "soyad", label: "Soyad" },
    { key: "phoneNumber", label: "Telefon" },
    { key: "createdAt", label: "Oluşturulma Tarihi" },
  ];
  return (
    <Card className="w-4/5 mx-auto mt-8">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-3">
          <FiList size={30} />
          <h1 className="text-3xl font-semibold">Müşteri Listesi</h1>
        </div>
      </CardHeader>
      <CardBody>
        <Table
          aria-label="Customer List"
          className="gap-2"
          isStriped
          style={{
            height: "auto",
            minWidth: "100%",
            maxWidth: "100%",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.id.toString()}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}

export default CustomersList;
