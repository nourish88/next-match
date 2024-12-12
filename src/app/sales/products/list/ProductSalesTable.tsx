"use client";

import { MedicineSaleDto } from "@/app/actions/saleActions";
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
import { FiList } from "react-icons/fi";

type Props = {
  salesData: MedicineSaleDto[];
};

export default function SalesTable({ salesData }: Props) {
  return (
    <Card className="w-4/5 mx-auto mt-8">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-3">
          <FiList size={30} />
          <h1 className="text-3xl font-semibold">Ürün Satış Çizelgesi</h1>
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
            <TableColumn>Müşteri Adı</TableColumn>
            <TableColumn>Satış Miktarı</TableColumn>
          </TableHeader>
          <TableBody>
            {salesData.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell>{medicine.id}</TableCell>
                <TableCell>{medicine.medicineName}</TableCell>
                <TableCell>{medicine.customerName}</TableCell>
                <TableCell>{medicine.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
}
