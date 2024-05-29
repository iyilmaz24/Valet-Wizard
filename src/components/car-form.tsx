"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useCarContext } from "@/lib/hooks";
import FormButton from "./form-button";
import { toast } from "sonner";

type CarFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function CarForm({
  actionType,
  onFormSubmission,
}: CarFormProps) {
  const { selectedCar, handleAddCar, handleEditCar } = useCarContext();

  return (
    <form
      action={async (formData) => {
        onFormSubmission();
        const carObject = {
          name: formData.get("name") as string,
          ownerName: formData.get("ownerName") as string,
          imageUrl: formData.get("imageUrl") as string,
          age: Number(formData.get("age")),
          notes: formData.get("notes") as string,
        };
        actionType === "add"
          ? handleAddCar(carObject)
          : handleEditCar(selectedCar!.id, carObject);
      }}
      className="flex flex-col"
    >
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedCar?.name : ""}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="ownerName">Owner Name</Label>
          <Input
            id="ownerName"
            name="ownerName"
            type="text"
            required
            defaultValue={actionType === "edit" ? selectedCar?.ownerName : ""}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            type="text"
            defaultValue={actionType === "edit" ? selectedCar?.imageUrl : ""}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="age">Car Year</Label>
          <Input
            id="age"
            name="age"
            type="number"
            required
            defaultValue={actionType === "edit" ? selectedCar?.age : ""}
          ></Input>
        </div>

        <div className="space-y-1">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            name="notes"
            rows={3}
            required
            defaultValue={actionType === "edit" ? selectedCar?.notes : ""}
          />
        </div>
      </div>

      <FormButton actionType={actionType} />
    </form>
  );
}
