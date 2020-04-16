import { today, tenDaysAgo } from "./Behaviors";

export interface CovidDataPoint {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
}
export type CountryList = string[];

export interface CountryDictionary {
  [countryName: string]: CovidDataPoint[];
}

export interface FormState {
  toDate: string;
  fromDate: string;
  selectedCountries: CountryList;
}


export const emptyFormState = {
  toDate: today(),
  fromDate: tenDaysAgo(),
  selectedCountries: [],
};
