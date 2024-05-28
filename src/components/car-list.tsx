"use client";

import Image from "next/image";
import { Car } from "@/lib/types";
import useCarContext from "@/lib/hooks";
import { cn } from "@/lib/utils";

type CarListProps = {
  cars: Car[];
};

export default function CarList() {
  const { cars, selectedCarId, handleChangeSelectedCarId } = useCarContext();

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {cars.map((car) => (
        <li key={car.id}>
          <button
            onClick={() => handleChangeSelectedCarId(car.id)}
            className={cn(
              `flex items-center h-[70px] w-full cursor-pointer px-5
              text-base gap-3 hover:bg-[#EFF1FF2] transition`,
              {
                "bg-[#EFF1F2]": selectedCarId === car.id,
              }
            )}
          >
            <Image
              src={car.imageUrl}
              alt="image of vehicle"
              height={50}
              width={65}
              className="rounded-xl object-cover w-[75px] h-[50px]"
            />
            <p className="text-xl">{car.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}
