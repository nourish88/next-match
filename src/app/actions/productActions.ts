"use server";
import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { auth } from "@/auth";
import {
  productSchema,
  ProductSchema,
} from "@/lib/schemas/Products/productSchema";
import { Medicine } from "@prisma/client";

export interface GetMedicinesParams {
  name?: string;
  groupId?: number;
}
export interface MedicineDto {
  id: number;
  name: string | null;
  groupName: string | null;
  createdAt?: Date;
}
export async function getAllMedicines(): Promise<Medicine[]> {
  const res = await prisma.medicine.findMany();
  console.log(res);

  return res;
}
export async function getMedicine(
  params: GetMedicinesParams = {}
): Promise<ActionResult<MedicineDto[]>> {
  const session = await auth();

  try {
    // Ensure the user is authenticated
    if (!session?.user?.id) {
      return { status: "error", error: "Not authenticated" };
    }

    // Build a Prisma query object based on the provided filters
    const { name, groupId } = params;
    console.log(groupId);
    const whereClause: any = {}; // Use `any` for flexibility

    if (name) {
      whereClause.name = {
        contains: name,
        mode: "insensitive",
      };
    }
    if (groupId) {
      whereClause.groupId = {
        equals: +groupId,
      };
    }
    // Fetch medicines with the related group
    const medicines = await prisma.medicine.findMany({
      where: whereClause,
      include: {
        group: true, // Include the entire group object
      },
      orderBy: {
        createdAt: "desc", // Order medicines by creation date
      },
    });

    const transformedMedicines: MedicineDto[] = medicines.map((medicine) => ({
      groupName: medicine.group?.name || null,
      id: medicine.id,
      createdAt: medicine.createdAt,
      name: medicine.name,
    }));

    console.log(transformedMedicines);

    return { status: "success", data: transformedMedicines };
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return { status: "error", error: "Something went wrong" };
  }
}
export async function createProduct(
  data: ProductSchema
): Promise<ActionResult<Medicine>> {
  const session = await auth();
  console.log(session);
  try {
    const validated = productSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, groupId } = validated.data;

    const createdAt = new Date();

    const existingProduct = await prisma.medicine.findFirst({
      where: { name, groupId },
    });
    console.log(existingProduct);
    if (existingProduct)
      return { status: "error", error: "Product already exists" };

    const user = await prisma.medicine.create({
      data: {
        name,
        groupId,
        createdAt,
        userid: session?.user?.id ?? "",
      },
    });

    return { status: "success", data: user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}
