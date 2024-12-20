"use server";

import { prisma } from "@/lib/prisma";
import { GetBrandSaleParams, BrandSaleDto } from "./saleActions";

export default async function getBrandSale(
  brandSaleParams: GetBrandSaleParams
): Promise<BrandSaleDto[]> {
  try {
    const { startDate, endDate, brandId, customerId } = brandSaleParams;

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
        saleGroups: {
          include: {
            group: true, // Include related Medicine details
          },
        },
        customer: true, // Include related Customer details
      },
    });

    console.log(sales);

    // Flatten and group the data
    const groupedData = sales
      .flatMap((sale) =>
        sale.saleGroups.map((saleItem) => ({
          customerName: `${sale.customer.name} ${sale.customer.surName}`, // Customer full name
          brandName: saleItem.group.name, // Medicine name
          brandId: saleItem.groupId, // Medicine ID
          amount: saleItem.amount, // Sale amount
          id: saleItem.id,
        }))
      )
      .reduce<
        Record<
          string,
          {
            brandName: string;
            customerName: string;
            brandId: number;
            amount: number;
            id: number;
          }
        >
      >((acc, curr) => {
        // Create a unique key for grouping
        const key = `${curr.brandId}-${curr.brandName}-${curr.customerName}`;
        if (!acc[key]) {
          acc[key] = {
            brandName: curr.brandName!,
            customerName: curr.customerName,
            brandId: curr.brandId,
            amount: 0,
            id: curr.id,
          };
        }
        acc[key].amount += curr.amount; // Aggregate the amount
        return acc;
      }, {});

    // Convert grouped data into an array
    const resultList = Object.values(groupedData);

    // Filter by productId if provided
    const filteredList = brandId
      ? resultList.filter((item) => item.brandId === brandId)
      : resultList;

    return filteredList;
  } catch (error) {
    console.error(error!.toString(), error);
    throw new Error(error!.toString());
  }
}
