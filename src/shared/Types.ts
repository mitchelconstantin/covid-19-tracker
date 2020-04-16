export interface CovidDataPoint {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}

export interface CountryDictionary {
  [countryName: string]: CovidDataPoint[];
}