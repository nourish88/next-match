
"use client";

import { createCustomer } from "@/app/actions/customerActions";
import { customerSchema, CustomerSchema } from "@/lib/schemas/Customers/customerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardBody, Button, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiHeartPlus } from "react-icons/gi";
import { toast } from "react-toastify";

export default function CustomerAddForm() {

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid, isSubmitting },
      } = useForm<CustomerSchema>({
        resolver: zodResolver(customerSchema),
        mode: "onTouched",
      });
    
      const onSubmit = async (data: CustomerSchema) => {
         const result = await createCustomer(data);
        if (result.status === "success") {
          console.log("Customer created successfully");
          toast.success("Customer created successfully");
        } else {
          if (Array.isArray(result.error)) {
            result.error.forEach((e:any) => {
              const fieldName = e.path.join(".") as "name" | "surName" | "phoneNumber";
              setError(fieldName, { message: e.message });
            });
          } else {
            setError("root.serverError", { message: result.error });
          }
        }
      };
  return (
    <Card className="w-2/5 mx-auto">
    <CardHeader className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2 items-center text-secondary">
        <div className="flex flex-row items-center gap-3">
          <GiHeartPlus size={30} />
          <h1 className="text-3xl font-semibold">Müşteri Ekleme  Formu</h1>
        </div>
        
      </div>
    </CardHeader>
    <CardBody>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Input
            defaultValue=""
            label="Ad"
            variant="bordered"
            {...register("name")}
            isInvalid={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <Input
            defaultValue=""
            label="Soyad"
            variant="bordered"
            {...register("surName")}
            isInvalid={!!errors.surName}
            errorMessage={errors.surName?.message}
          />
          <Input
            defaultValue=""
            label="Telefon Numarası"
            variant="bordered"
            type=""
            {...register("phoneNumber")}
            isInvalid={!!errors.phoneNumber}
            errorMessage={errors.phoneNumber?.message}
          />
          {errors.root?.serverError && (
            <p className="text-danger text-sm">
              {errors.root.serverError.message}
            </p>
          )}
          <Button
            isLoading={isSubmitting}
            isDisabled={!isValid}
            fullWidth
            color="secondary"
            type="submit"
          >
            Kaydet
          </Button>
        </div>
      </form>
    </CardBody>
  </Card>
  )
}
