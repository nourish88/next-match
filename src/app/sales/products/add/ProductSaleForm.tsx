"use client";
import {
  createProductSale,
  CreateSaleProductDto,
  saleProductDto,
} from "@/app/actions/saleActions";
import CardTitle from "@/components/General/CardHeader";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { Customer, Medicine } from "@prisma/client";
import { useEffect, useState } from "react";
import { HiOutlineSave } from "react-icons/hi";
import { IoIosAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify

type Props = {
  customers: Customer[];
  medicines: Medicine[];
};

function ProductSaleForm({ customers, medicines }: Props) {
  const [date, setDate] = useState<string>("");
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [productEntries, setProductEntries] = useState([{ id: null }]);
  const [amountEntries, setAmountEntries] = useState([{ amount: 1 }]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  // Validate the form dynamically
  const isFormValid = (): boolean => {
    if (!date || !selectedCustomer) return false;
    for (let i = 0; i < productEntries.length; i++) {
      if (!productEntries[i].id || !amountEntries[i].amount) {
        return false;
      }
    }
    return true;
  };

  // Recalculate button disable state whenever a form field changes
  const handleInputChange = (
    index: number,
    field: "id" | "amount",
    value: any
  ) => {
    const newProductEntries = [...productEntries];
    const newAmountEntries = [...amountEntries];

    if (field === "id") {
      newProductEntries[index].id = value;
    } else {
      newAmountEntries[index].amount = value;
    }

    setProductEntries(newProductEntries);
    setAmountEntries(newAmountEntries);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isFormValid()) return;

    setIsLoading(true); // Block the page
    try {
      const saleProductDtoArray: saleProductDto[] = productEntries.map(
        (entry, index) => ({
          productId: +entry.id!,
          amount: +amountEntries[index].amount,
        })
      );

      const createDto: CreateSaleProductDto = {
        date,
        customerId: +selectedCustomer!,
        saleProducts: saleProductDtoArray,
      };

      const result = await createProductSale(createDto);

      if (result) {
        // Show success toast with a reload on click
        toast.success("Satış başarıyla kaydedildi!");
        const klik = document.getElementById("reset");
        klik?.click();
      }
    } catch (error) {
      toast.error("Satış kaydedilirken bir hata oluştu.");
    } finally {
      setIsLoading(false); // Unblock the page
    }
  };

  const handleRemoveEntry = () => {
    if (productEntries.length > 1) {
      setProductEntries(productEntries.slice(0, -1));
      setAmountEntries(amountEntries.slice(0, -1));
    }
  };

  const handleAddEntry = () => {
    setProductEntries([...productEntries, { id: null }]);
    setAmountEntries([...amountEntries, { amount: 1 }]);
  };

  // Recalculate button disable state whenever a form field changes
  useEffect(() => {
    setIsSaveDisabled(!isFormValid());
  }, [date, selectedCustomer, productEntries, amountEntries]);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today); // Set default date to today's date
  }, []);

  return (
    <>
      <Card className="w-4/5 mx-auto mt-8">
        <CardTitle header="Ürün Satış Formu"></CardTitle>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
              <div className="flex-auto w-50">
                <Select
                  name="customerId"
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                  value={selectedCustomer!}
                  placeholder="Müşteri seçiniz"
                >
                  {customers.map((customer) => (
                    <SelectItem
                      value={customer.id.toString()}
                      key={customer.id}
                    >
                      {customer.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="flex-auto w-50">
                <Input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="date"
                />
              </div>
            </div>

            {productEntries.map((entry, index) => (
              <div key={index} className="flex gap-2 mt-4">
                <div className="flex-auto w-50">
                  <Select
                    name="medicineId"
                    value={entry.id || ""}
                    placeholder="Ürün seçiniz"
                    onChange={(e) =>
                      handleInputChange(index, "id", e.target.value)
                    }
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
                <div className="flex-auto w-50">
                  <Input
                    value={amountEntries[index].amount.toString()}
                    name="amount"
                    onChange={(e) =>
                      handleInputChange(index, "amount", +e.target.value)
                    }
                    type="number"
                    min="1"
                  />
                </div>
              </div>
            ))}

            <div className="flex justify-end mt-2">
              <Button
                isDisabled={productEntries.length <= 1}
                onClick={handleRemoveEntry}
                type="button"
                color="danger"
              >
                <MdDelete />
                Çıkar
              </Button>
              <Button
                onClick={handleAddEntry}
                type="button"
                className="ml-2"
                color="secondary"
              >
                <IoIosAddCircle />
                Yeni Marka Ekle
              </Button>
            </div>

            <div className="flex justify-center w-full mt-4">
              <Button
                className="flex flex-auto"
                type="submit"
                color="primary"
                isDisabled={isSaveDisabled || isLoading}
              >
                {isLoading ? (
                  "Kaydediliyor..."
                ) : (
                  <>
                    <HiOutlineSave /> Kaydet
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
      {/* Toast container for notifications */}
      <ToastContainer />
    </>
  );
}

export default ProductSaleForm;
