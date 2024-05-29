import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function FormButton({ actionType }: { actionType: string }) {
  const { pending } = useFormStatus(); // we no longer see this due to optimistic UI

  return (
    <Button className="mt-5 self-end" disabled={pending} type="submit">
      {actionType === "add"
        ? !pending
          ? "Add Car"
          : "Adding..."
        : !pending
        ? "Save Changes"
        : "Saving..."}
    </Button>
  );
}
