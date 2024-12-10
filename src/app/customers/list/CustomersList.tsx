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
} from "@nextui-org/react";
import { Customer } from "@prisma/client";
import { FiList } from "react-icons/fi";

interface Props {
  customers: Customer[]; // Define the props to accept an array of customers
}
export default function CustomersList({ customers }: Props) {
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
          className="overflow-hidden"
          isStriped
          isCompact
          style={{
            height: "auto",
            minWidth: "100%",
            maxWidth: "100%",
          }}
        >
          <TableHeader>
            <TableColumn>Müşteri ID</TableColumn>
            <TableColumn>Ad</TableColumn>
            <TableColumn>Soyad</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Oluşturulma Tarihi</TableColumn>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.surName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>
                  {new Date(customer.createdAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Data Table */}
      </CardBody>
    </Card>
  );
}
