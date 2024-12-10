"use client";

import { Group } from "@prisma/client";
import { Card, CardHeader, CardBody, Input, Button } from "@nextui-org/react";
import { useState } from "react";
import { FiUsers } from "react-icons/fi";
import GroupsList from "./GroupsList";
import { getBrands } from "@/app/actions/brandActions";

export default function GroupsForm() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [filters, setFilters] = useState({
    name: "",
    surName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const fetchFilteredGroups = async () => {
    setLoading(true);
    try {
      const result = await getBrands(filters); // Pass filters to the action
      if (result.status === "success") {
        setGroups(result.data!);
        console.log(result.data);
      } else {
        setGroups([]);
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
    await fetchFilteredGroups();
  };

  return (
    <>
      <Card className="w-4/5 mx-auto mt-8">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center gap-3">
            <FiUsers size={30} />
            <h1 className="text-3xl font-semibold">Marka Sorgulama</h1>
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

            <Button type="submit" color="secondary" isLoading={loading}>
              Ara
            </Button>
          </form>

          {/* Data Table */}
        </CardBody>
      </Card>
      <GroupsList groups={groups} />
    </>
  );
}
