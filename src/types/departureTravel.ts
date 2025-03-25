export interface TravelFilter {
  date: string;
  city: number[];
  passengerNumber: number;
  passengerDisabilityNumber: number;
  orderTravel: number;
  orderMaxMinTravel: number;
  isPoint: boolean;
  currencyID: number;
  externalInitId: number;
  externalEndId: number;
  routeID: number | null;
  _rowId: number | null;
}

export interface DepartureTravelRequest {
  limit: number;
  page: number;
  filters: TravelFilter;
}

export interface DepartureTravel {
  id: number;
  dateInitFormat: string;
  HourInitFormat: string;
  dateEndFormat: string;
  HourEndFormat: string;
  travelTime: string;
  cityInitID: number;
  cityInit: string;
  cityEndID: number;
  cityEnd: string;
  addressInit: string;
  totalSeats: number;
  totalNivel: number;
  amount: string;
  companyName: string;
  companyLogo: string;
  currencyID: number;
  currency: string;
  itinerary: number | null;
}