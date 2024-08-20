

"use client";

import { createBrand } from "@/app/actions/brandActions";
import { brandSchema, BrandSchema } from "@/lib/schemas/Brands/brandSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiBrandyBottle, GiMedicines } from "react-icons/gi";
import { toast } from "react-toastify";

export default function BrandAddPage() {

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    mode: "onTouched",
  });
  const onSubmit = async (data: BrandSchema) => {
    const result = await createBrand(data);
   if (result.status === "success") {
     console.log("Brand created successfully");
     toast.success("Brand created successfully");
   } else {
     if (Array.isArray(result.error)) {
       result.error.forEach((e:any) => {
         const fieldName = e.path.join(".") as "name" ;
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
          <GiBrandyBottle  size={30} />
          <h1 className="text-3xl font-semibold">Marka Ekleme  Formu</h1>
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


