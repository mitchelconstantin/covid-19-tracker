import React from 'react';
import MUIDataTable from 'mui-datatables';
import { CountryDictionary, CountryColorDictionary } from '../shared/Types';
import { Typography } from '@material-ui/core';
import { getDateHeaders } from '../shared/Behaviors';

interface Props {
  data: CountryDictionary;
  countryColors: CountryColorDictionary;
}

const coloredText = (text: string | number, color: string) => (
  <Typography style={{ color }}>{text}</Typography>
);

const formatData = (
  data: CountryDictionary,
  countryColors: CountryColorDictionary
) => {
  const columns = ['Country', ...getDateHeaders(data)];

  const rows = Object.entries(data).map(([country, dataPoints]) => {
    const countryColor = countryColors[country] || 'black';
    const rowData = dataPoints.map((dataPoint) =>
      coloredText(dataPoint.confirmed, countryColor)
    );

    return [coloredText(country, countryColor), ...rowData];
  });
  return { columns, rows };
};

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
