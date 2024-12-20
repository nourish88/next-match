"use client";
import { BrandSaleDto } from "@/app/actions/saleActions";
import CardTitle from "@/components/General/CardHeader";
import {
  Card,
  CardBody,
  Select,
  SelectItem,
  Button,
  Input,
} from "@nextui-org/react";
import { Customer, Group } from "@prisma/client";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

import BrandSalesTable from "./BrandSaleTable";
import getBrandSale from "@/app/actions/saleGroupActions";
type Props = {
  brands: Group[];
  customers: Customer[];
};
export default function BrandSaleList({ brands, customers }: Props) {
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [salesData, setSalesData] = useState<BrandSaleDto[]>([]);
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true); // Block the page
    try {
      const result: BrandSaleDto[] = await getBrandSale({
        customerId: selectedCustomer,
        brandId: selectedBrand,
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
        <CardTitle header="Marka Satış Sorgulama Formu"></CardTitle>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Select
                  name="customerId"
                  onChange={(e) => setSelectedCustomer(+e.target.value)}
                  value={selectedCustomer!}
                  placeholder="Müşteri seçiniz"
                  className="w-full"
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
                  name="brandId"
                  value={selectedBrand!}
                  placeholder="Marka seçiniz"
                  onChange={(e) => setSelectedBrand(+e.target.value)}
                  className="w-full"
                >
                  {brands.map((brand) => (
                    <SelectItem value={brand.id.toString()} key={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2">Başlangıç Tarihi</label>
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                  className="w-full"
                />
              </div>
              <div>
                <label className="block mb-2">Bitiş Tarihi</label>
                <Input
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                className="flex"
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
      {salesData.length > 0 && <BrandSalesTable salesData={salesData} />}

      <ToastContainer />
    </>
  );
}
