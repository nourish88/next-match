"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
export interface GetMedicineSaleParams {
  customerId: number | null;
  productId: number | null;
  startDate: string | null;
  endDate: string | null;
}
export interface GetBrandSaleParams {
  customerId: number | null;
  brandId: number | null;
  startDate: string | null;
  endDate: string | null;
}
export type saleGroupDto = {
  groupId: number;
  amount: number;
};
export type saleProductDto = {
  productId: number;
  amount: number;
};
export interface MedicineSaleDto {
  medicineName: string;
  customerName: string;
  medicineId: number;
  amount: number;
  id: number;
}
export interface BrandSaleDto {
  brandName: string;
  customerName: string;
  brandId: number;
  amount: number;
  id: number;
}
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

export async function getProductSale(
  medicineSaleParams: GetMedicineSaleParams
): Promise<MedicineSaleDto[]> {
  try {
    const { startDate, endDate, productId, customerId } = medicineSaleParams;

    // Dynamically build the `where` clause
    const where: Record<string, any> = {};

    if (startDate) {
      where.time = { ...where.time, gte: new Date(startDate) }; // Filter by start date
    }

    if (endDate) {
      where.time = { ...where.time, lte: new Date(endDate) }; // Filter by end date
    }

    if (customerId) {
      where.customerId = customerId; // Filter by customer ID
    }

    // Fetch data from the database
    const sales = await prisma.sale.findMany({
      where,
      include: {
        saleItems: {
          include: {
            medicine: true, // Include related Medicine details
          },
        },
        customer: true, // Include related Customer details
      },
    });
    console.log("nuriş");
    console.log(sales);

    // Flatten and group the data
    const groupedData = sales
      .flatMap((sale) =>
        sale.saleItems.map((saleItem) => ({
          customerName: `${sale.customer.name} ${sale.customer.surName}`, // Customer full name
          medicineName: saleItem.medicine.name, // Medicine name
          medicineId: saleItem.medicineId, // Medicine ID
          amount: saleItem.amount, // Sale amount
          id: saleItem.id,
        }))
      )
      .reduce<
        Record<
          string,
          {
            medicineName: string;
            customerName: string;
            medicineId: number;
            amount: number;
            id: number;
          }
        >
      >((acc, curr) => {
        // Create a unique key for grouping
        const key = `${curr.medicineId}-${curr.medicineName}-${curr.customerName}`;
        if (!acc[key]) {
          acc[key] = {
            medicineName: curr.medicineName!,
            customerName: curr.customerName,
            medicineId: curr.medicineId,
            amount: 0,
            id: curr.id,
          };
        }
        acc[key].amount += curr.amount; // Aggregate the amount
        return acc;
      }, {});
    console.log("nuriş 2");
    // Convert grouped data into an array
    const resultList = Object.values(groupedData);

    // Filter by productId if provided
    const filteredList = productId
      ? resultList.filter((item) => item.medicineId === productId)
      : resultList;

    console.log("nuriş4");
    console.log(filteredList);

    return filteredList;
  } catch (error) {
    console.log("nuriş5");
    console.error("Error fetching product sales:", error);
    throw new Error("An error occurred while fetching product sales");
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
