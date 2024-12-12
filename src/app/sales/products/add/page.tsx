import { getCustomers } from "@/app/actions/customerActions";

import { Customer } from "@prisma/client";
import { getAllMedicines } from "@/app/actions/productActions";
import ProductSaleForm from "./ProductSaleForm";

export default async function ProductSalePage() {
  let customers: Customer[];
  const result = await getCustomers(); // Pass filters to the action
  if (result.status === "success") {
    customers = result.data!;
  }
  const medicines = await getAllMedicines();

  return (
    <div className="mt-2 gap-2">
      <ProductSaleForm medicines={medicines} customers={customers!} />
    </div>
  );
}
