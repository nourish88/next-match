"use client";

import { createProduct } from "@/app/actions/productActions";
import {
  productSchema,
  ProductSchema,
} from "@/lib/schemas/Products/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { Group } from "@prisma/client";
import { useForm, useController } from "react-hook-form";
import { GiBrandyBottle } from "react-icons/gi";
import { toast } from "react-toastify";

interface ProductAddFormProps {
  groups: Group[];
}

export default function ProductAddForm({ groups }: ProductAddFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
    mode: "onTouched",
  });

  const {
    field: { onChange, value },
  } = useController({
    name: "groupId",
    control,
  });

  const onSubmit = async (data: ProductSchema) => {
    console.log(data);
    const result = await createProduct(data);
    if (result.status === "success") {
      console.log("Product created successfully");
      toast.success("Product created successfully");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((e: any) => {
          const fieldName = e.path.join(".") as "name" | "groupId";
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
            <GiBrandyBottle size={30} />
            <h1 className="text-3xl font-semibold">Ürün Ekleme Formu</h1>
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
            <Autocomplete
              variant="bordered"
              label="Select a Group"
              placeholder="Choose a group"
              className="w-full"
              selectedKey={value?.toString()}
              onSelectionChange={(key) => onChange(Number(key))}
              isInvalid={!!errors.groupId}
              errorMessage={errors.groupId?.message}
            >
              {groups.map((group) => (
                <AutocompleteItem key={group.id} value={group.id}>
                  {group.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
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
  );
}
