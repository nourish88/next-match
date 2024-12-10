import { Group } from "@prisma/client";
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

interface Props {
  groups: Group[]; // Define the props to accept an array of customers
}
export default function GroupsList({ groups }: Props) {
  return (
    <Card className="w-4/5 mx-auto mt-8">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center gap-3">
          <FiList size={30} />
          <h1 className="text-3xl font-semibold">Marka Listesi</h1>
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

            <TableColumn>Oluşturulma Tarihi</TableColumn>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.name}</TableCell>

                <TableCell>
                  {new Date(group.createdAt).toLocaleDateString()}
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
