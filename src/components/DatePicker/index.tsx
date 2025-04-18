import { PropsWithChildren } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface DatePickerProps {
  value?: Date;
  onChange: (date?: Date) => void;
}
const DatePicker = ({ value, onChange }: PropsWithChildren<DatePickerProps>) => {
  return (
    <div className="flex flex-col text-start text-text">
      {/* Label */}
      <label htmlFor="date-picker" className="text-sm font-light text-gray-500 px-3 pt-1">
        Fecha
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <span>
          <Button id="date-picker" variant="ghost" type="button" className="w-full justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>Seleccionar Fecha</span>}
          </Button>
          </span>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 border-gray-300">
        <Calendar 
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
          disabled={(value) => value < new Date(new Date().setHours(0, 0, 0, 0))}
        />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;