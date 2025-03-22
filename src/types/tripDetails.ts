export interface TripDetail {
    passenger: PassengerCount;
    cityInitID: number | null;
    cityEndID: number | null;
    date: Date | null;
  }

  export interface PassengerCount {
    adulto: number;
    niño: number;
    senior: number;
    total: number;
  }

