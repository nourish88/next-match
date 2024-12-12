"use client";

import {
  getMedicine,
  GetMedicinesParams,
  MedicineDto,
} from "@/app/actions/productActions";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Group, Medicine } from "@prisma/client";
import { useState } from "react";
import MedicinesList from "./MedicineList";

interface Props {
  groups: Group[];
}

export default function MedicinesGetForm({ groups }: Props) {
  const [medicines, setMedicines] = useState<MedicineDto[]>([]);
  const [filters, setFilters] = useState<GetMedicinesParams>({});

  const [loading, setLoading] = useState(false);

  const fetchFilteredMedicines = async () => {
    setLoading(true);
    try {
      const result = await getMedicine(filters);
      if (result.status === "success") {
        setMedicines(result.data!);
      } else {
        setMedicines([]);
        console.error(result.error);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetchFilteredMedicines();
  };

  return (
    <>
      <Card className="w-4/5 mx-auto mt-8">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-3">
            <h1 className="text-3xl font-semibold">Ürün Sorgulama</h1>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSearch} className="flex gap-4 mb-6">
            <Input
              aria-label="Medicine Name"
              name="name"
              placeholder="Search by Medicine Name"
              value={filters.name}
              onChange={handleChange}
              variant="bordered"
            />
            <Select
              onChange={handleChange}
              name="groupId"
              
              items={groups}
              placeholder="Marka seçiniz"
            >
              {(group) => (
                <SelectItem value={group.id} key={group.id}>
                  {group.name}
                </SelectItem>
              )}
            </Select>
            <Button type="submit" color="secondary" isLoading={loading}>
              Ara
            </Button>
          </form>
          {/* Data Table */}
        </CardBody>
      </Card>
      {medicines?.length > 0 && (
        <MedicinesList medicines={medicines}></MedicinesList>
      )}
    </>
  );
}
