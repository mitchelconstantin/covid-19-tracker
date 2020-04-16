import React from 'react';
import MUIDataTable from 'mui-datatables';
import { CountryDictionary } from '../shared/Types';

interface Props {
  data: CountryDictionary;
}

const formatData = (data: CountryDictionary) => {
  //todo consider another way to make an enum of types
  const columns = ['country', 'date', 'confirmed', 'deaths', 'recovered'];
  const dataSets = Object.entries(data).map(([country, dataPoints]) => {
    return dataPoints.map((dataPoint) => [
      country,
      dataPoint.date,
      dataPoint.confirmed,
      dataPoint.deaths,
      dataPoint.recovered,
    ]);
  });
  //todo consider keeping seperate and having distinct graphs for each country

  //combine sub arrays into one large array
  const rows = dataSets.flat();
  return { columns, rows };
};
//todo see render errors in console and fix
export const DataTable = ({ data }: Props) => {
  const { columns, rows } = formatData(data);

  return <MUIDataTable title={'Raw data'} data={rows} columns={columns} />;
};
