"use client";

import useCarContext from "@/lib/hooks";
import Image from "next/image";
import carImage from "/public/placeholderImg.jpeg";
import { Car } from "@/lib/types";

export default function CarDetails() {
  const { selectedCar } = useCarContext();

  if (!selectedCar) {
    return <EmptyView />;
  }

  return (
    <section className="w-full h-full flex flex-col">
      <CarPhotoAndName selectedCar={selectedCar} />

      <div className="flex justify-around py-10 px-5 text-center">
        <SectionContent h3Text={"Owner Name"} pText={selectedCar.ownerName} />
        <SectionContent h3Text={"Car Year"} pText={selectedCar.age} />
      </div>

      <CarNotesAndInformation selectedCar={selectedCar} />
    </section>
  );
}

function SectionContent({
  h3Text,
  pText,
}: {
  h3Text: string;
  pText: string | number;
}) {
  return (
    <div className="">
      <h3 className="text-[13px] font-medium uppercase text-zinc-700">
        {h3Text}
      </h3>
      <p className="mt-1 text-lg text-zinc-800">{pText}</p>
    </div>
  );
}

function CarPhotoAndName({ selectedCar }: { selectedCar: Car }) {
  return (
    <div className="flex items-center bg-white px-8 py-5 border-b border-black-[8%]">
      <Image
        src={carImage}
        alt="Selected car image"
        height={100}
        width={100}
        className="h-[75px] w-[75px] rounded-lg object-cover"
      />

      <h2 className="text-3xl font-semibold leading-7 ml-5">
        {selectedCar?.name}
      </h2>
    </div>
  );
}

function CarNotesAndInformation({ selectedCar }: { selectedCar: Car }) {
  return (
    <section
      className="bg-white flex-1 px-7 py-5 mx-8 mb-9
    border border-black-[8%]"
    >
      {selectedCar?.notes}
    </section>
  );
}

function EmptyView() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center">
      <p className="font-light text-lg text-zinc-900">
        Select a car from the list to view its details
      </p>
    </section>
  );
}
