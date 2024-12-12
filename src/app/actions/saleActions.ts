"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export type saleGroupDto = {
  groupId: number;
  amount: number;
};
export type saleProductDto = {
  productId: number;
  amount: number;
};
export type CreateSaleGroupDto = {
  date: string;
  customerId: number;
  saleGroups: saleGroupDto[];
};
export type CreateSaleProductDto = {
  date: string;
  customerId: number;
  saleProducts: saleProductDto[];
};
export async function createGroupSale(
  data: CreateSaleGroupDto
): Promise<boolean> {
  const session = await auth();
  console.log(session);
  try {
    const { time, year, month, day } = GetTimes(data.date);
    await prisma.sale.create({
      data: {
        time: time,
        year: +year,
        month: +month,
        day: +day,
        customerId: data.customerId,
        createdAt: new Date(),
        userid: session?.user?.id!,
        saleGroups: {
          create: data.saleGroups.map((group) => ({
            groupId: group.groupId,
            amount: group.amount,
            userid: session?.user?.id!, // Add `userid` for SaleGroup
            createdAt: new Date(),
          })),
        },
      },
      include: {
        saleGroups: true, // Include the SaleGroups in the response
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function createProductSale(
  data: CreateSaleProductDto
): Promise<boolean> {
  const session = await auth();
  console.log(session);
  try {
    const { time, year, month, day } = GetTimes(data.date);
    await prisma.sale.create({
      data: {
        time: time,
        year: +year,
        month: +month,
        day: +day,
        customerId: data.customerId,
        createdAt: new Date(),
        userid: session?.user?.id!,
        saleItems: {
          create: data.saleProducts.map((medicine) => ({
            medicineId: medicine.productId,
            amount: medicine.amount,
            userid: session?.user?.id!, // Add `userid` for SaleGroup
            createdAt: new Date(),
          })),
        },
      },
      include: {
        saleGroups: true, // Include the SaleGroups in the response
      },
    });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
function GetTimes(date: string) {
  const time = new Date();

  const year = date?.toString().split("-")[0];
  const month = date?.toString().split("-")[1];
  const day = date?.toString().split("-")[2];
  return { time, year, month, day };
}
