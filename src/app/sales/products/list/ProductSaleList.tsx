"use client";
import { getProductSale, MedicineSaleDto } from "@/app/actions/saleActions";
import CardTitle from "@/components/General/CardHeader";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Button,
  Input,
} from "@nextui-org/react";
import { Customer, Medicine } from "@prisma/client";

import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";
import SalesTable from "./ProductSalesTable";
type Props = {
  medicines: Medicine[];
  customers: Customer[];
};
function ProductSaleList({ medicines, customers }: Props) {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [salesData, setSalesData] = useState<MedicineSaleDto[]>([]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true); // Block the page
    try {
      const result: MedicineSaleDto[] = await getProductSale({
        customerId: selectedCustomer,
        productId: selectedMedicine,
        startDate: date,
        endDate: endDate,
      });
      console.log("Fetched sales data:", result);
      if (result.length == 0) toast.info("Veri bulunamadı");
      if (result && Array.isArray(result)) {
        setSalesData(result);
      } else {
        console.error("Unexpected result format:", result);
      }
      // Assuming getProductSale accepts these parameters
    } catch (error) {
      toast.error(error!.toString());
    } finally {
      setIsLoading(false); // Unblock the page
    }
  };
  return (
    <>
      <Card className="w-4/5 mx-auto mt-8">
        <CardTitle header="Marka Satış Sorgulama  Formu"></CardTitle>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select
                  name="customerId"
                  onChange={(e) => setSelectedCustomer(+e.target.value)}
                  value={selectedCustomer!}
                  placeholder="Müşteri seçiniz"
                >
                  {customers.map((customer) => {
                    // Define fullName by combining customer.name and customer.surName
                    const fullName = `${customer.name} ${customer.surName}`;

                    return (
                      <SelectItem
                        value={customer.id.toString()}
                        key={customer.id}
                      >
                        {fullName}
                      </SelectItem>
                    );
                  })}
                </Select>
              </div>
              <div>
                <Select
                  name="medicineId"
                  value={selectedMedicine!}
                  placeholder="Ürün seçiniz"
                  onChange={(e) => setSelectedMedicine(+e.target.value)}
                >
                  {medicines.map((medicines) => (
                    <SelectItem
                      value={medicines.id.toString()}
                      key={medicines.id}
                    >
                      {medicines.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2">Başlangıç Tarihi</label>
                <Input
                  value={date || undefined}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
              </div>
              <div>
                <label className="block mb-2">Bitiş Tarihi</label>
                <Input
                  value={endDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                className="flex "
                type="submit"
                color="primary"
                isDisabled={isLoading}
              >
                {isLoading ? (
                  "Sorgulanıyor..."
                ) : (
                  <>
                    <IoSearch />
                    Sorgula
                  </>
                )}
              </Button>

              <Button id="reset" className="hidden" type="reset">
                sıfırla
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

      {salesData.length > 0 && <SalesTable salesData={salesData} />}
      <ToastContainer />
    </>
  );
}

export default ProductSaleList;
