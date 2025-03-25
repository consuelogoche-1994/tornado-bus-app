import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/button";
import { Seat } from "@/types/seats";
import TripSummary from '../TripSummary';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats: Seat[];
}

const TripConfirmationModal: React.FC<ModalProps> = ({ isOpen, onClose, selectedSeats }) => {
  const navigate = useNavigate();
  const handleConfirm = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogOverlay className="fixed inset-0 bg-black/50 z-1" />
      <DialogContent className="fixed top-[50%] left-[50%] z-2 transform -translate-x-[50%] -translate-y-[50%] bg-white p-8 w-[90%] md:w-[auto]">
        <DialogTitle className="text-xl font-semibold">¡Casi Listo para Tu Aventura! 🚀</DialogTitle>
        <DialogDescription className="my-4 text-sm text-muted-foreground">
          Revisa los detalles finales de tu viaje para asegurarte de que todo esté perfecto.
        </DialogDescription>
        <div>
          <TripSummary selectedSeats={selectedSeats}/>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button  onClick={handleConfirm}>Confirmar Boletos</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TripConfirmationModal;