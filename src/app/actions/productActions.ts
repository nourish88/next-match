"use server";
import { prisma } from "@/lib/prisma";
import { ActionResult } from "@/types";
import { auth } from "@/auth";
import {
  productSchema,
  ProductSchema,
} from "@/lib/schemas/Products/productSchema";
import { Medicine } from "@prisma/client";

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
