"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useCarContext } from "@/lib/hooks";

type CarFormProps = {
  actionType: "add" | "edit";
  onFormSubmission: () => void;
};

export default function CarForm({
  actionType,
  onFormSubmission,
}: CarFormProps) {
  const { handleAddCar, handleEditCar, selectedCar } = useCarContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newCar = {
      name: formData.get("name") as string,
      ownerName: formData.get("ownerName") as string,
      imageUrl: (formData.get("imageUrl") as string) || "",
      age: +(formData.get("age") as string),
      notes: formData.get("notes") as string,
    };

    if (actionType === "edit") handleEditCar(selectedCar!.id, newCar);
    if (actionType === "add") handleAddCar(newCar);
    onFormSubmission();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
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

      <Button className="mt-5 self-end" type="submit">
        {actionType === "add" ? "Add Car" : "Save Changes"}
      </Button>
    </form>
  );
}
