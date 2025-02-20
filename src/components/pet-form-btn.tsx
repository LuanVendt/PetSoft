import { Button } from "./ui/button";

export default function PetFormBtn({
  actionType,
}: {
  actionType: "add" | "edit";
}) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Edit Pet"}
    </Button>
  );
}
