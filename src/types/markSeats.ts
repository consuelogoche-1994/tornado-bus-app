export interface MarkSeatRequest {
  tickeTypeID: number;
  ticketSessionId: number | null;
  cityInitID: number | null;
  cityEndID: number | null;
  itineraryID: number | null;
  busPlaceID: number[];
  tempTicketId: string | null;
  ticketRef: string | null;
  idMulti: string | null;
  isReturn: boolean;
  currencyID: number;
  mDestiny: string | null;
  mOrigin: string | null;
  mRow: string | null;
  timeZone: string;
  externalInitID: string | null;
  externalEndID: string | null;
}

export interface MarkSeatFilter {
  cityInitID: number | null;
  cityEndID: number | null;
  itineraryID: number | null;
  busPlaceID: number[];
}

export interface MarkSeat {
  ticket: any;
  busSketch: any[];
  ticketSessionId: number;
  totalDetail: any;
  expirationDate: string;
  expirationTime: number;
}