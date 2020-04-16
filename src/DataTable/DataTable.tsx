import React from 'react';
import MUIDataTable from 'mui-datatables';
import { CountryDictionary, FormState } from '../shared/Types';

interface Props {
  formState: FormState;
  data: CountryDictionary;
}

//todo move this method up so the graph can use it
//probably can be in a behaivor on the app itself
const getSelectedCountriesData = (
  data: CountryDictionary,
  formState: FormState
) => {
  // const selectedCountries = countries.map((country) => ({
  //   [country]: data[country],
  // }));

  //todo consider another way to make an enum of types
  const columns = ['country', 'date', 'confirmed', 'deaths', 'recovered'];

  //todo add types for rows
  //@ts-ignore
  const rows = [];

  formState.selectedCountries.forEach((country) => {
    data[country].forEach((dataPoint) => {
      rows.push([
        country,
        dataPoint.date,
        dataPoint.confirmed,
        dataPoint.deaths,
        dataPoint.recovered,
      ]);
    });
  });
  //@ts-ignore
  return { columns, rows };
};

export const DataTable = ({ formState, data }: Props) => {
  const { columns, rows } = getSelectedCountriesData(data, formState);

  return (
      <MUIDataTable title={'Raw data'} data={rows} columns={columns} />
  );
};
