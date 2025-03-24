import SeatIcon from "../icons/seat";
import { SeatLevel, Seat } from "../../types/seats"
import { toast } from "sonner";

interface busSeatSelectorProps {
  levels: SeatLevel[];
  maxSeats: number; // Maximum selectable seats
  onSeatSelect: (selectedSeatIds: Seat[]) => void;
  selectedSeats: Seat[];
}
const BusSeatSelector = ({ levels, maxSeats, onSeatSelect, selectedSeats }: busSeatSelectorProps) => {

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
  if(seat.seat === 0 && seat.icon) content = <div className="cursor-default">icon</div>
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
                    className={`w-10 h-10 flex items-center justify-center border border-gray-300 ${seat?getSeatColorText(seat):""}`}
                    onClick={() => seat?.id && seat?.seat >0 && seat.idStatus === 663  && toggleSeatSelection(seat)}
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
      ))}
    </div>
  );
};

export default BusSeatSelector;