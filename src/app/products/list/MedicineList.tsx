import { MedicineDto } from "@/app/actions/productActions";
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
import { Medicine } from "@prisma/client";

import { FiList } from "react-icons/fi";

interface Props {
  medicines: MedicineDto[]; // Define the props to accept an array of customers
}
export default function MedicinesList({ medicines }: Props) {
  return (
    <Card className="w-4/5 mx-auto mt-8">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-3">
          <FiList size={30} />
          <h1 className="text-3xl font-semibold">Ürün Listesi</h1>
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
            <TableColumn>Ürün Id</TableColumn>
            <TableColumn>Ürün Adı</TableColumn>
            <TableColumn>Marka Adı</TableColumn>
            <TableColumn>Oluşturulma Tarihi</TableColumn>
          </TableHeader>
          <TableBody>
            {medicines.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell>{medicine.id}</TableCell>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.groupName}</TableCell>

                <TableCell>
                  {new Date(medicine.createdAt!).toLocaleDateString()}
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
