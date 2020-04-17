import React from 'react';
import MUIDataTable from 'mui-datatables';
import { CountryDictionary } from '../shared/Types';

interface Props {
  data: CountryDictionary;
}

// const formatData = (data: CountryDictionary) => {
//   //todo consider another way to make an enum of types
//   // columns should be ['country', then date, date, date, date etc.]
//   const columns = ['country', 'date', 'confirmed', 'deaths', 'recovered'];
//   const dataSets = Object.entries(data).map(([country, dataPoints]) => {
//     return dataPoints.map((dataPoint) => [
//       country,
//       dataPoint.date,
//       dataPoint.confirmed,
//       dataPoint.deaths,
//       dataPoint.recovered,
//     ]);
//   });

//   //combine sub arrays into one large array
//   const rows = dataSets.flat();
//   return { columns, rows };
// };
const formatData = (data: CountryDictionary) => {
  const columns = ['country', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  //@ts-ignore
  const rows = Object.entries(data).map(([country, dataPoints]) => {
    const rowData = dataPoints.map((dataPoint) => dataPoint.confirmed);
    return [country, ...rowData];
  });

  return { columns, rows };
};
//todo see render errors in console and fix
export const DataTable = ({ data }: Props) => {
  const { columns, rows } = formatData(data);

  return (
    <MUIDataTable
      title={'Confirmed Cases by date'}
      data={rows}
      columns={columns}
    />
  );
};
