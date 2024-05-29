"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
} from "./ui/dialog";
import CarForm from "./car-form";
import { useState } from "react";

type ButtonProps = {
  buttonText?: string;
  className?: string;
  actionType: "edit" | "complete" | "add";
  onClick?: () => void;
  disabled?: boolean;
};

export default function CarButton({
  buttonText,
  className,
  actionType,
  onClick,
  disabled,
}: ButtonProps) {
  const [formOpen, setFormOpen] = useState(false);

  if (actionType === "complete") {
    return (
      <Button
        disabled={disabled}
        variant={"secondary"}
        className={cn("bg-green-300 hover:bg-green-400", className)}
        onClick={onClick}
      >
        {buttonText || "Complete"}
      </Button>
    );
  }

  if (actionType === "add" || actionType === "edit") {
    return (
      <>
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogTrigger asChild>
            {actionType === "add" ? (
              <Button
                size={"icon"}
                className={cn("h-10 w-10 rounded-full", className)}
              >
                {buttonText || <PlusIcon className="w-6 h-6" />}
              </Button>
            ) : (
              <Button
                variant={"secondary"}
                className={cn("bg-zinc-200 hover:bg-zinc-300", className)}
              >
                {buttonText || "Edit"}
              </Button>
            )}
          </DialogTrigger>
          <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
            <DialogHeader>
              <DialogTitle>
                {actionType === "add"
                  ? "Add New Customer Car"
                  : "Edit Existing Customer Car"}
              </DialogTitle>
            </DialogHeader>
            <CarForm
              actionType={actionType}
              onFormSubmission={() => setFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
