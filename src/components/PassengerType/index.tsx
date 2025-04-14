import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { PassengerCountType } from "../../types/tripDetails";
import { usePassengersStore } from "@/stores/usePassengersStore";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface PassengerTypeProps {
  value: PassengerCountType[];
  onChange: (passengers: PassengerCountType[]) => void;
}

function PassengerType({ value, onChange }: PassengerTypeProps) {

    const { passengerTypes, isLoading } = usePassengersStore();
    const [open, setOpen] = useState(false);
    const [localPassengers, setLocalPassengers] = useState<PassengerCountType[]>([]);
    
    useEffect(() => {
      if(value.length > 0){
        setLocalPassengers(value);
      }else{
        const updatedPassengers = passengerTypes.map(p => ({
          ...p,
          total: p.default ? 1 : 0,
        }));
        setLocalPassengers(updatedPassengers);
        onChange(updatedPassengers);
      }
    }, [passengerTypes, value]);

    const increasePassengerType = (passenger: PassengerCountType) => {
      setLocalPassengers((prev) => {
        const updatePassengers = prev.map((p) =>
          p.id === passenger.id
            ? { ...p, total: p.total + 1 }
            : p
        );
        onChange(updatePassengers);
        return updatePassengers;
      });
    };

    const decreasePassengerType = (passenger: PassengerCountType) => {
      setLocalPassengers((prev) => {
        const updatePassengers = prev.map((p) =>
          p.id === passenger.id
            ? { ...p, total: Math.max(0, (p.total || 0) - 1) }
            : p
        );
        onChange(updatePassengers);
        return updatePassengers;
      });
    };

    const calculateTotalPassenger = (passenger: PassengerCountType[]) => {
      const total = passenger.reduce((acc, passenger) => acc + (passenger.total || 0), 0);
      return total;
    };

    return (
      <div className="flex flex-col text-start text-text">
        <label htmlFor="passenger-type" className="text-sm font-light text-gray-500 px-3 pt-1">
          Pasajeros
        </label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <span>
              <Button variant="ghost" type="button" className="w-full justify-start text-left font-normal">
                <UserIcon className="h-6 w-6" />
                {calculateTotalPassenger(localPassengers)} {calculateTotalPassenger(localPassengers) === 1 ? "Pasajero" : "Pasajeros"}
              </Button>
            </span>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0 border-gray-300">
            {
              isLoading ? (
                <div className="p-6 w-57 flex justify-center">
                  <div className="w-8 h-8 border-3 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                </div>
                ):
                (
                  <div className="p-4">
                  {localPassengers.map((type) => (
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
                          onClick={() => decreasePassengerType(type)}
                        />
                        <span>{type.total}</span>
                        <PlusCircleIcon
                          className="h-7 w-7 text-primary hover:text-primary/90 cursor-pointer"
                          onClick={() => increasePassengerType(type)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                )
            }
          </PopoverContent>
        </Popover>
      </div>
    );
}

export default PassengerType;