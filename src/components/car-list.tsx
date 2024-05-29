"use client";

import Image from "next/image";
import { TCar } from "@/lib/types";
import { useCarContext, useSearchContext } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import carFallBackImage from "/public/logoImage.png";

type CarListProps = {
  cars: TCar[];
};

export default function CarList() {
  const { cars, selectedCarId, handleChangeSelectedCarId } = useCarContext();
  const { searchText } = useSearchContext();

  const filteredCars = cars.filter(
    (car) =>
      car.name.toLowerCase().includes(searchText) ||
      car.id.toLowerCase().includes(searchText) ||
      car.ownerName.toLowerCase().includes(searchText)
  );

  return (
    <ul className="bg-white border-b border-light">
      {filteredCars.map((car) => (
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
              src={car.imageUrl || carFallBackImage}
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
