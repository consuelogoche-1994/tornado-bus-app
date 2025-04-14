import SeatIcon from "../icons/seat";
import { SeatLevel, Seat } from "@/types/seats"
import { useMarkSeatStore } from "@/stores/useMarkSeatStore";

import { UserIcon } from '@heroicons/react/24/outline';
import { useSelectedTripStore } from '@/stores/useSelectedTripStore';
import { toast } from "sonner";

interface busSeatSelectorProps {
  levels: SeatLevel[];
  maxSeats: number; // Maximum selectable seats
  onSeatSelect: (selectedSeatIds: Seat[]) => void;
  selectedSeats: Seat[];
}
const BusSeatSelector = ({ levels, maxSeats, onSeatSelect, selectedSeats }: busSeatSelectorProps) => {

const {loading, markSeat } = useMarkSeatStore();
const { selectedTrip } = useSelectedTripStore();


const handleSelectSeat = async (seat: Seat) => {
  const filter = {
    cityInitID: selectedTrip?.cityInitID ?? null,
    cityEndID: selectedTrip?.cityEndID ?? null,
    itineraryID: selectedTrip?.id ?? 0,
    busPlaceID: [seat.id],
  };
  const response = await markSeat(filter);
  if(response !== null){
    toggleSeatSelection(seat);
  }else{
    toast.error(`No se pudo reservar el asiento N° ${seat.seat}.`);
  }
};

// Toggles seat selection while respecting the maxSeats limit
const toggleSeatSelection = (seat: Seat) => {
  let updatedSeats;
  if (selectedSeats.some(selected => selected.id === seat.id)) {
    updatedSeats = selectedSeats.filter(selected => selected.id !== seat.id);
  } else {
    if (selectedSeats.length >= maxSeats) {
      toast.error(`Solo puedes seleccionar hasta ${maxSeats} asientos.`);
      return;
    }
    updatedSeats = [...selectedSeats, seat];
  }
  onSeatSelect(updatedSeats);
};

const getSeatForType = (seat: Seat) => {
  let content;
  if(seat.isEmpty === 0 && seat.seat > 0) content = <SeatIcon className={`text-[${seat.colorGroup}] cursor-default`} isAvailable={true}/>;
  if(seat.seat === 0 && seat.icon === "chofer") content = <div className="cursor-default"><UserIcon className="h-6 w-6 text-gray-300" /></div>
  if(seat.seat > 0 && seat.idStatus === 663) content = <SeatIcon className="text-primary cursor-pointer" isAvailable={true}/>;
  const isSelected = selectedSeats.some(selectedSeat => selectedSeat.id === seat.id);
  if (isSelected) content = <SeatIcon className="text-primary cursor-pointer" isAvailable={false} />;
  return content;
}

const getSeatColorText = (seat: Seat) => {
  let colorText;
  if(seat.isEmpty === 0 && seat.seat > 0) colorText = `text-[${seat.colorGroup}] cursor-defaul`;
  if(seat.seat > 0 && seat.idStatus === 663) colorText = "text-primary cursor-pointer";
  const isSelected = selectedSeats.some(selectedSeat => selectedSeat.id === seat.id);
  if(isSelected) colorText = "text-white cursor-pointer";
  return colorText;
}

  return (
    <div className="flex gap-6 flex-wrap justify-center">
      {levels?.map((level) => (
        <div key={level.nivel} className="">
          <h2 className="mb-2 mt-4">Nivel {level.nivel}</h2>
          <div className="relative">
            {loading &&
              <div className="bg-[rgba(255,255,255,0.5)] z-10 w-full h-full absolute flex items-center justify-center rounded-xl">
                <div className="w-8 h-8 border-3 border-gray-300 border-t-primary rounded-full animate-spin"></div>
              </div>}
            <div
              className="p-4 border border-gray-300 rounded-xl gap-2"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${level.columns}, 40px)`,
                gridTemplateRows: `repeat(${level.rows}, 40px)`,
              }}
            >
              {Array.from({ length: level.rows }).map((_, rowIndex) =>
                Array.from({ length: level.columns }).map((_, colIndex) => {
                  const seat = level.seats.find(
                    (seat) => seat.column === rowIndex + 1 && seat.row === colIndex + 1
                  );

                  return (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`w-10 h-10 flex items-center justify-center ${seat?getSeatColorText(seat):""}`}
                      onClick={() => seat?.id && seat?.seat >0 && seat.idStatus === 663  && handleSelectSeat(seat)}
                    >
                      <div className="relative">
                        {seat?getSeatForType(seat):""}
                        { (seat?.seat && seat.seat > 0) ? <div className="absolute text-xs top-1/3 left-[49%] transform -translate-x-1/2 -translate-y-1/2">{seat.seat}</div> : "" }
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BusSeatSelector;