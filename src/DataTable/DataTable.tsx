import React from 'react';
import { CountryDictionary, FormState } from '../shared/Types';

interface Props {
  formState: FormState;
  data: CountryDictionary;
}
//todo move this method up so the graph can use it
//probably can be in a behaivor on the app itself
const getSelectedCountriesData = (
  data: CountryDictionary,
  countries: string[]
) => {
  return countries.map((country) => ({ [country]: data[country] }));
};

export const DataTable = ({ formState, data }: Props) => {
  const rowsToShow = getSelectedCountriesData(
    data,
    formState.selectedCountries
  );

  console.log('rows to show,', rowsToShow);
  return <>{formState.selectedCountries.map((country) => country)}</>;
};
