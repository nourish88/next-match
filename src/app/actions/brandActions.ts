"use server";

import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { auth } from "@/auth";
import { brandSchema, BrandSchema } from "@/lib/schemas/Brands/brandSchema";
import { Group } from "@prisma/client";
export async function getAllBrands(): Promise<Group[]> {
  const res = await prisma.group.findMany();
  console.log(res);

  return res;
}
interface GetBrandsParams {
  name?: string;
}

export async function getBrands(
  params: GetBrandsParams = {}
): Promise<ActionResult<Group[]>> {
  const session = await auth();
  console.log(session);
  try {
    // Ensure the user is authenticated
    if (!session?.user?.id) {
      return { status: "error", error: "Not authenticated" };
    }

    // Build a Prisma query object based on the provided filters
    const { name } = params;
    console.log(name);
    const whereClause: any = {}; // Use `any` for flexibility

    if (name) {
      whereClause.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    // Fetch customers with the dynamic filter
    const customers: Group[] = (await prisma.group.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "asc", // Order customers by creation date
      },
    })) as Group[];
    console.log(customers);
    return { status: "success", data: customers };
  } catch (error) {
    console.error("Error fetching customers:", error);
    return { status: "error", error: "Something went wrong" };
  }
}

export async function createBrand(
  data: BrandSchema
): Promise<ActionResult<Group>> {
  const session = await auth();
  try {
    const validated = brandSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name } = validated.data;

    const createdAt = new Date();

    const existingGroup = await prisma.group.findFirst({
      where: { name },
    });

    if (existingGroup)
      return { status: "error", error: "Brand already exists" };

    const user = await prisma.group.create({
      data: {
        name,
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
