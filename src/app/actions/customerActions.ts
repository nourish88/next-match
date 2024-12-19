"use server";

import { prisma } from "@/lib/prisma";
import {
  customerSchema,
  CustomerSchema,
} from "@/lib/schemas/Customers/customerSchema";
import { ActionResult } from "@/types";
import { Customer } from "@prisma/client";
import { auth } from "@/auth";

interface GetCustomersParams {
  name?: string;
  surName?: string;
  email?: string;
}

export async function getCustomers(
  params: GetCustomersParams = {}
): Promise<ActionResult<Customer[]>> {
  const session = await auth();

  try {
    // Ensure the user is authenticated
    if (!session?.user?.id) {
      return { status: "error", error: "Not authenticated" };
    }

    // Build a Prisma query object based on the provided filters
    const { name, surName, email } = params;
    console.log(name);
    const whereClause: any = {}; // Use `any` for flexibility

    if (email) {
      whereClause.email = {
        contains: email,
        mode: "insensitive",
      };
    }
    if (surName) {
      whereClause.surName = {
        contains: surName,
        mode: "insensitive",
      };
    }
    if (name) {
      whereClause.name = {
        contains: name,
        mode: "insensitive",
      };
    }

    // Fetch customers with the dynamic filter
    const customers: Customer[] = (await prisma.customer.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "asc", // Order customers by creation date
      },
    })) as Customer[];
    console.log(customers);
    return { status: "success", data: customers };
  } catch (error) {
    console.error("Error fetching customers:", error);
    return { status: "error", error: "Something went wrong" };
  }
}
export async function createCustomer(
  data: CustomerSchema
): Promise<ActionResult<Customer>> {
  const session = await auth();
  try {
    const validated = customerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, surName, phoneNumber } = validated.data;

    const createdAt = new Date();

    const existingCustomer = await prisma.customer.findFirst({
      where: { name, surName, phoneNumber },
    });

    if (existingCustomer)
      return { status: "error", error: "Customer already exists" };

    const user = await prisma.customer.create({
      data: {
        name,
        surName,
        phoneNumber,
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
