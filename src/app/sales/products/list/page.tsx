"use server";
import { getCustomers } from "@/app/actions/customerActions";
import { getAllMedicines } from "@/app/actions/productActions";
import { Customer } from "@prisma/client";
import ProductSaleList from "./ProductSaleList";

export default async function ProductSaleListPage() {
  let customers: Customer[];
  const result = await getCustomers(); // Pass filters to the action
  if (result.status === "success") {
    customers = result.data!;
  }
  const medicines = await getAllMedicines();
  return (
    <ProductSaleList
      medicines={medicines}
      customers={customers!}
    ></ProductSaleList>
  );
}
