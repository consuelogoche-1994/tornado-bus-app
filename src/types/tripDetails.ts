export interface TripDetail {
    passengersCount:  PassengerCountType[],
    totalPassengers: number,
    cityInitID: number | null;
    cityEndID: number | null;
    date: Date | null;
  }

  export interface PassengerCountType {
    id: number;
    name: string;
    default: Boolean;
    ageMin: number;
    ageMax: number;
    total: number;
  }

