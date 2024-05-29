"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useCarContext } from "@/lib/hooks";
import { addCar, editCar } from "@/actions/actions";
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
  const { selectedCar } = useCarContext();

  return (
    <form
      action={async (formData) => {
        const error = await (actionType === "add"
          ? addCar(formData)
          : editCar(selectedCar!.id, formData));
        if (error) {
          toast.warning(error.message);
        }
        onFormSubmission();
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
