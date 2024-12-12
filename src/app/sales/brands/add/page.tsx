import { getCustomers } from "@/app/actions/customerActions";
import BrandSaleForm from "./BrandSaleForm";
import { Customer, Group } from "@prisma/client";
import { getAllBrands } from "@/app/actions/brandActions";

export default async function BrandSalePage() {
  let customers: Customer[];
  const result = await getCustomers(); // Pass filters to the action
  if (result.status === "success") {
    customers = result.data!;
  }
  const brands: Group[] = await getAllBrands(); // Pass filters to the action

  return (
    <div className="mt-2 gap-2">
      <BrandSaleForm brands={brands} customers={customers!} />
    </div>
  );
}
