import { Button } from "@/components/ui/button"
import CitySelect from "../SearchSelect"
import DatePicker from "../DatePicker"
import { PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid'
import {  UserIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

function TripSelector() {
    const [date, setDate] = useState<Date | undefined>();

  return (
    <div className="flex flex-col gap-2 rounded-lg md:grid md:grid-cols-6 lg:flex lg:flex-row">
        <div className="flex-1 p-1 text-center rounded-md border border-gray-300 md:col-span-3">
            <CitySelect />
        </div>
        <div className="flex-1 p-1 text-center rounded-md border border-gray-300 md:col-span-3">
            <CitySelect />
        </div>
        <div className="flex-1 p-1 text-center rounded-md border border-gray-300 md:col-span-2 lg:col-span-1">
            <DatePicker value={date} onChange={setDate} />
        </div>
        <div className="flex-1 p-1 text-center rounded-md border border-gray-300 md:col-span-2 lg:col-span-1">
            <div className="flex flex-col text-start text-text w-full">
                {/* Label */}
                <label htmlFor="city-select" className="text-sm font-light text-gray-500 px-3 pt-1">
                Pasajeros
                </label>
                <div className="flex justify-between items-center gap-4 w-full">
                    <div>
                        <UserIcon className="h-5 w-6" />   
                    </div>
                    <div className="flex items-center gap-2">
                        <PlusCircleIcon className="h-7 w-7 text-primary hover:text-primary/90 cursor-pointer" />
                        <span>1</span>
                        <MinusCircleIcon className="h-7 w-7 text-primary hover:text-primary/90 cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center md:col-span-2 lg:col-span-1">
            <Button className="w-full md:w-[80%]">Buscar</Button>
        </div>
    </div>
  )
}

export default TripSelector