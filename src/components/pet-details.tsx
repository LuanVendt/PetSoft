"use client";

import { usePetContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { Pet } from "@prisma/client";
import Image from "next/image";
import PetButton from "./pet-button";

type PetProps = {
  pet: Pet;
};

export default function PetDetails() {
  const { selectedPet } = usePetContext();

  return (
    <section className="flex flex-col h-full w-full">
      {!selectedPet ? (
        <EmptyView />
      ) : (
        <>
          <TopBar pet={selectedPet} />

          <OtherInfo pet={selectedPet} />

          <Notes pet={selectedPet} />
        </>
      )}
    </section>
  );
}

function TopBar({ pet }: PetProps) {
  const { handleCheckoutPet } = usePetContext();

  return (
    <div className="flex items-center bg-white px-3 py-5 border-b border-light">
      <Image
        src={pet.imageUrl}
        alt="Selected pet image"
        height={75}
        width={75}
        className="h-[75px] w-[75px] rounded-full object-cover"
      />

      <h2
        className={cn(
          `font-semibold leading-7 ml-2 ${
            pet.name.length > 6 ? "text-xl sm:text-3xl" : "text-3xl"
          }`
        )}
      >
        {pet.name}
      </h2>

      <div className="ml-auto space-x-1">
        <PetButton actionType="edit" />
        <PetButton
          actionType="checkout"
          onClick={async () => await handleCheckoutPet(pet.id)}
        />
      </div>
    </div>
  );
}

function OtherInfo({ pet }: PetProps) {
  return (
    <div className="flex justify-around py-10 px-5 text-center">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner name
        </h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.ownerName}</p>
      </div>

      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p className="mt-1 text-lg text-zinc-800">{pet.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: PetProps) {
  return (
    <section className="flex-1 bg-white px-7 py-5 rounded-md mb-9 mx-8 border border-light">
      {pet.notes}
    </section>
  );
}

function EmptyView() {
  return (
    <p className="h-full flex items-center justify-center text-2xl font-medium">
      No pet selected
    </p>
  );
}
