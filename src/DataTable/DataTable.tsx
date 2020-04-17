import React from 'react';
import MUIDataTable from 'mui-datatables';
import { CountryDictionary } from '../shared/Types';

interface Props {
  data: CountryDictionary;
}

const formatData = (data: CountryDictionary) => {
  const columns = [];
  for (let key in data) {
    const columnData = data[key].map(({ date }) => date);
    columns.push('country', ...columnData);
    break;
  };

  
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
      title={'Confirmed Cases by Date'}
      data={rows}
      columns={columns}
    />
  );
};
