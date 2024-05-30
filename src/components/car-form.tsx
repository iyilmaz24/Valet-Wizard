"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useCarContext } from "@/lib/hooks";
import FormButton from "./form-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carFormSchema } from "@/lib/validations";
import type { TCarForm } from "@/lib/validations";

type CarFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function CarForm({
  actionType,
  onFormSubmission,
}: CarFormProps) {
  const { selectedCar, handleAddCar, handleEditCar } = useCarContext();
  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<TCarForm>({
    resolver: zodResolver(carFormSchema),
    defaultValues: { ...selectedCar },
  });

  return (
    <form
      action={async () => {
        const result = await trigger();
        if (!result) return;
        onFormSubmission();

        const carObject = getValues();
        actionType === "add"
          ? handleAddCar(carObject)
          : handleEditCar(selectedCar!.id, carObject);
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Make & Model</Label>
          <Input id="name" {...register("name")}></Input>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner&apos;s Name</Label>
          <Input id="ownerName" {...register("ownerName")}></Input>
          {errors.ownerName && (
            <p className="text-red-500">{errors.ownerName.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input id="imageUrl" {...register("imageUrl")}></Input>
          {errors.imageUrl && (
            <p className="text-red-500">{errors.imageUrl.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Car Year</Label>
          <Input id="age" {...register("age")}></Input>
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea id="notes" {...register("notes")} />
          {errors.notes && (
            <p className="text-red-500">{errors.notes.message}</p>
          )}
        </div>
      </div>

      <FormButton actionType={actionType} />
    </form>
  );
}
