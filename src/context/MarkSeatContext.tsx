import { createContext, useState, ReactNode } from 'react';
import { MarkSeatRequest, MarkSeatFilter } from '../types/markSeats';
import { markSeat } from '../api/markSeat';

interface MarkSeatContextType {
  loading: boolean;
  ticketSessionId: number | null;
  markSeat: (filters: MarkSeatFilter) => Promise<any | null>;
  clearTicketSessionId: () => void;
}

export const MarkSeatContext = createContext<MarkSeatContextType | undefined>(undefined);

export const MarkSeatProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [ticketSessionId, setTicketSessionId] = useState<number | null>(null);

  const handleMarkSeat = async (filters: MarkSeatFilter): Promise<any | null> => {
    if (loading) return null;

    setLoading(true);

    const params: MarkSeatRequest = {
      tickeTypeID: 219,
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
      if (response && response.ticketSessionId) {
        // ticketSessionId
        if (!ticketSessionId) {
        // set ticketSessionId
          setTicketSessionId(response.ticketSessionId);
        }
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearTicketSessionId = () => {
    setTicketSessionId(null);
  };

  return (
    <MarkSeatContext.Provider
      value={{
        loading,
        ticketSessionId,
        markSeat: handleMarkSeat,
        clearTicketSessionId,
      }}
    >
      {children}
    </MarkSeatContext.Provider>
  );
};