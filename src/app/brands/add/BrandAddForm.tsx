"use client";

import { createBrand } from "@/app/actions/brandActions";
import { brandSchema, BrandSchema } from "@/lib/schemas/Brands/brandSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiBrandyBottle } from "react-icons/gi";
import { toast } from "react-toastify";
type Props = {
  onClose: () => void;
};
export default function BrandAddForm({ onClose }: Props) {
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
      onClose();
      toast.success("Brand created successfully");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e: any) => {
          const fieldName = e.path.join(".") as "name";
          setError(fieldName, { message: e.message });
        });
      } else {
        setError("root.serverError", { message: result.error });
      }
    }
  };
  return (
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
  );
}
