import React from 'react';
import MUIDataTable from 'mui-datatables';
import { CountryDictionary, CountryColorDictionary } from '../shared/Types';
import { Typography } from '@material-ui/core';
import { getDateHeaders } from '../shared/Behaviors';

interface Props {
  data: CountryDictionary;
  countryColors: CountryColorDictionary;
}

const formatData = (
  data: CountryDictionary,
  countryColors: CountryColorDictionary
) => {
  const columns = ['country', ...getDateHeaders(data)];

  const rows = Object.entries(data).map(([country, dataPoints]) => {
    const rowData = dataPoints.map((dataPoint) => dataPoint.confirmed);
    const styledCountry = (
      <Typography style={{ color: countryColors[country] || 'black' }}>
        {country}
      </Typography>
    );
    return [styledCountry, ...rowData];
  });
  return { columns, rows };
};
//todo see render errors in console and fix
export const DataTable = ({ data, countryColors }: Props) => {
  const { columns, rows } = formatData(data, countryColors);

  return (
    <MUIDataTable
      title={'Confirmed Cases by Date'}
      data={rows}
      columns={columns}
    />
  );
};
