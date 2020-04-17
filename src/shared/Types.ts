import { today, tenDaysAgo } from './Behaviors';

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
export interface CountryColorDictionary {
  [countryName: string]: string;
}
//todo rename formstate
export interface FormState {
  toDate: string;
  fromDate: string;
  selectedCountries: CountryList;
  countryColors: CountryColorDictionary;
}

export const defaultFormData = {
  toDate: today(),
  fromDate: tenDaysAgo(),
  selectedCountries: [],
  countryColors: {},
};
