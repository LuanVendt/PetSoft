import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "./ui/button";

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
  switch (actionType) {
    case "add":
      return (
        <Button size={children ? "default" : "icon"}>
          {children ? children : <PlusIcon className="h-6 w-6" />}
        </Button>
      );

    case "edit":
      return (
        <Button variant="secondary">{children ? children : "Edit"}</Button>
      );

    case "checkout":
      return (
        <Button variant="secondary" onClick={onClick}>
          {children ? children : "Checkout"}
        </Button>
      );
  }
}
