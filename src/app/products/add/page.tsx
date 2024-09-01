import { getAllBrands } from "@/app/actions/brandActions";

import { Group } from "@prisma/client";
import ProductAddForm from "./ProductAddForm";

export default async function ProductAddPage() {
  const groupsResult: Group[] = await getAllBrands();

  return (
    <div className="flex items-center justify-center vertical-center">
      <ProductAddForm groups={groupsResult} />
    </div>
  );
}
