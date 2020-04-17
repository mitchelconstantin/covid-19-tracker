import React from 'react';
import MUIDataTable from 'mui-datatables';
import { CountryDictionary } from '../shared/Types';

interface Props {
  data: CountryDictionary;
}

const formatData = (data: CountryDictionary) => {
  const columns = ['country'];
  for (let key in data) {
    const columnData = data[key].map(({ date }) => date);
    columns.push(...columnData);
    break;
  };
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
