import { create } from 'zustand';
import { markSeat } from '@/api/markSeat';
import { MarkSeatRequest, MarkSeatFilter } from '@/types/markSeats';

interface MarkSeatState {
  loading: boolean;
  ticketSessionId: number | null;
  markSeat: (filters: MarkSeatFilter) => Promise<any | null>;
  clearTicketSessionId: () => void;
}

export const useMarkSeatStore = create<MarkSeatState>((set, get) => {
  const markSeatAction = async (filters: MarkSeatFilter): Promise<any | null> => {
    const { loading, ticketSessionId } = get();
    if (loading) return null;

    set({ loading: true });

    const params: MarkSeatRequest = {
      tickeTypeID: filters.tickeTypeID,
      ticketSessionId: ticketSessionId,
      cityInitID: filters.cityInitID,
      cityEndID: filters.cityEndID,
      itineraryID: filters.itineraryID,
      busPlaceID: filters.busPlaceID,
      tempTicketId: null,
      ticketRef: null,
      idMulti: null,
      isReturn: false,
      currencyID: 567,
      mDestiny: null,
      mOrigin: null,
      mRow: null,
      timeZone: 'America/Lima',
      externalInitID: null,
      externalEndID: null,
    };

    try {
      const response = await markSeat(params);
      if (response?.ticketSessionId && !ticketSessionId) {
        set({ ticketSessionId: response.ticketSessionId });
      }
      return response;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      set({ loading: false });
    }
  };

  const clearTicketSessionId = () => {
    set({ ticketSessionId: null });
  };

  return {
    loading: false,
    ticketSessionId: null,
    markSeat: markSeatAction,
    clearTicketSessionId,
  };
});