import { usePassengers } from "../../hooks/usePassengers";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PassengerTypeProps {
  value: number;
  onChange: (total: number) => void;
}

interface PassengerCount {
  adulto: number;
  niño: number;
  senior: number;
  total: number;
}

function PassengerType({ value, onChange }: PassengerTypeProps) {
  const { passengerTypes } = usePassengers();
  const [open, setOpen] = useState(false);
  const [passengerCounts, setPassengerCounts] = useState<PassengerCount>({
    adulto: 1,
    niño: 0,
    senior: 0,
    total: value,
  });

  const updatePassengerCount = (category: keyof PassengerCount, change: number) => {
    setPassengerCounts((prev) => {
      const newCount = Math.max(0, prev[category] + change); // Evitar valores negativos en la categoría
      const updatedCounts = {
        ...prev,
        [category]: newCount,
      };
      updatedCounts.total = Math.max(0, updatedCounts.adulto + updatedCounts.niño + updatedCounts.senior);
      onChange(updatedCounts.total);
      return updatedCounts;
    });
  };

  const formatCaterory = (str: string): string => {
    return str.slice(0, -3).toLowerCase();
  };

  return (
    <div className="flex flex-col text-start text-text">
      <label htmlFor="passenger-type" className="text-sm font-light text-gray-500 px-3 pt-1">
        Pasajeros
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span>
            <Button variant="ghost" className="w-full justify-start text-left font-normal">
              <UserIcon className="h-6 w-6" />
              {passengerCounts.total} {passengerCounts.total === 1 ? "Pasajero" : "Pasajeros"}
            </Button>
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 border-gray-300">
          <div className="p-4">
            {passengerTypes.map((type) => (
              <div key={type.id} className="flex justify-between items-center gap-16 w-full border-b border-gray-300 py-2">
                <div className="flex flex-col">
                  <p>{type.name}</p>
                  <p className="text-sm font-light text-gray-500">
                    {type.ageMin} - {type.ageMax}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <MinusCircleIcon
                    className="h-7 w-7 text-primary hover:text-primary/90 cursor-pointer"
                    onClick={() => updatePassengerCount(formatCaterory(type.name) as keyof PassengerCount, -1)}
                  />
                  <span>{passengerCounts[formatCaterory(type.name) as keyof PassengerCount]}</span>
                  <PlusCircleIcon
                    className="h-7 w-7 text-primary hover:text-primary/90 cursor-pointer"
                    onClick={() => updatePassengerCount(formatCaterory(type.name) as keyof PassengerCount, 1)}
                  />
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default PassengerType;