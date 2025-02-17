"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import PetForm from "./pet-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type PetButtonProps = {
  actionType: "add" | "edit" | "checkout";
  children?: React.ReactNode;
  onClick?: () => void;
};

export default function PetButton({
  actionType,
  children,
  onClick,
}: PetButtonProps) {
  const [open, setOpen] = React.useState(false);

  if (actionType === "checkout") {
    return (
      <Button variant="secondary" onClick={onClick}>
        {children ? children : "Checkout"}
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {actionType === "add" ? (
          <Button size={children ? "default" : "icon"}>
            {children ? children : <PlusIcon className="h-6 w-6" />}
          </Button>
        ) : (
          <Button variant="secondary">{children ? children : "Edit"}</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {actionType === "add" ? "Add a new pet" : "Edit pet"}
          </DialogTitle>
        </DialogHeader>

        <PetForm
          actionType={actionType}
          onFormSubmission={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
