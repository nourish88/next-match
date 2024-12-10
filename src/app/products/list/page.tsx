import MedicinesGetForm from "./MedicineGetForm";
import { getAllBrands } from "@/app/actions/brandActions";

export default async function ProductsListPage() {
  var groups = await getAllBrands();
  return <MedicinesGetForm groups={groups} />;
}
