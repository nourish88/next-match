"use server";
import { getCustomers } from "@/app/actions/customerActions";
import { Customer } from "@prisma/client";
import { getAllBrands } from "@/app/actions/brandActions";
import BrandSaleList from "./BrandSaleList";

export default async function BrandSaleListPage() {
  let customers: Customer[];
  const result = await getCustomers(); // Pass filters to the action
  if (result.status === "success") {
    customers = result.data!;
  }
  const brands = await getAllBrands();
  return <BrandSaleList brands={brands} customers={customers!}></BrandSaleList>;
}
