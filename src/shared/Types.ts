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

export interface FormData {
  toDate: string;
  fromDate: string;
  selectedCountries: CountryList;
  countryColors: CountryColorDictionary;
}

export const defaultFormData: FormData = {
  toDate: today(),
  fromDate: tenDaysAgo(),
  selectedCountries: [],
  countryColors: {},
};
