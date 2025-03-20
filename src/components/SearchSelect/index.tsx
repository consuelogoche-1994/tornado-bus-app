import React, { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Datos simulados (en lugar de API)
const cities = [
  { value: "lima", label: "Lima" },
  { value: "santiago", label: "Santiago" },
  { value: "buenosaires", label: "Buenos Aires" },
  { value: "mexicocity", label: "Ciudad de México" },
];

const SearchSelect: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col text-start text-text">
    {/* Label */}
    <label htmlFor="city-select" className="text-sm font-light text-gray-500 px-3 pt-1">
      Ciudad de origen
    </label>

    {/* Combobox */}
        <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button id="city-select" variant="ghost" className="w-full justify-between text-left font-normal" role="combobox" aria-expanded={open}>
            {value ? cities.find((city) => city.value === value)?.label : "Seleccionar ciudad"}
            <ChevronsUpDown className="opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 border-gray-300">
            <Command>
            <CommandInput placeholder="Buscar ciudad..." className="h-9" />
            <CommandList>
                <CommandEmpty>No se encontraron ciudades.</CommandEmpty>
                <CommandGroup>
                {cities.map((city) => (
                    <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={() => {
                        setValue(city.value);
                        setOpen(false);
                    }}
                    >
                    {city.label}
                    <Check className={`ml-auto ${value === city.value ? "opacity-100" : "opacity-0"}`} />
                    </CommandItem>
                ))}
                </CommandGroup>
            </CommandList>
            </Command>
        </PopoverContent>
        </Popover>
    </div>
  );
};

export default SearchSelect;