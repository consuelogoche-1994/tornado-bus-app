export interface City {
    id: number;
    name: string;
    nameExternal: string | null;
    key: string;
    isExternalCityEnd: number;
    baseEndId: number | null;
    nameEnd: string | null;
    isMultiroute: number;
    abrev: string;
  }