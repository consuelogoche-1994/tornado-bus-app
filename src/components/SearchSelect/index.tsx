import { useState, useEffect } from "react";
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
import { City } from "../../types/cities";

interface CityTypeProps {
  id: string;
  value: number | null;
  cities: City[];
  onSelected: (cityID: number | null) => void;
  onChange: (inputValue: string) => void;
  dependencyReset: number | null;
}

function SearchSelect({ id, value, cities, onSelected, onChange, dependencyReset }: CityTypeProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [citySelected, setCitySelected] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<string >("");

  useEffect(() => {
    if(dependencyReset && !value) {
      onSelected(null);
      setCitySelected(null);
    };
  }, [dependencyReset, value]);

  useEffect(() => {
    if(value) {
      setCitySelected(value);
    };
  }, [value]);

  /**
   * Updates the selected city state and triggers the onSelected callback.
   * @param cityId - The ID of the selected city.
   */
  const updateCitySelected = (cityId: number): void => {
    setCitySelected(cityId);
    onSelected(cityId);
  };

  /**
   * Updates the input value state and triggers the onChange callback if valid.
   * @param value - The new input value.
   */
  const updateInputValue = (value: string): void => {
    setInputValue(value);
    if (value.length >= 3 || value === "") {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-col text-start text-text">
      {/* Label */}
      <label htmlFor={`${id}`} className="text-sm font-light text-gray-500 px-3 pt-1">
        {id=="origin" ? "Ciudad de origen":"Ciudad de destino"}
      </label>

      {/* Combobox */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span>
            <Button
              id={`${id}`}
              variant="ghost"
              className="w-full justify-between text-left font-normal"
              role="combobox"
              type="button"
              aria-expanded={open}
            >
              <span className="truncate block w-full">
                {citySelected ? cities.find((city) => city.id === citySelected)?.name : "Seleccionar ciudad"}
              </span>
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-[80vw] md:w-90 lg:w-70 p-0 border-gray-300">
          <Command>
            <CommandInput 
              placeholder="Buscar ciudad..." 
              className="h-9"
              value={inputValue}
              onValueChange={updateInputValue}
            />
            <CommandList>
              <CommandEmpty>No se encontraron ciudades.</CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.id}
                    data-value={city.name}
                    onSelect={() => {
                      updateCitySelected(city.id);
                      setOpen(false);
                    }}
                  >
                    {city.name}
                    <Check className={`ml-auto ${citySelected === city.id ? "opacity-100" : "opacity-0"}`} />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default SearchSelect;