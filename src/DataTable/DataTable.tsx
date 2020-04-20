import React from 'react';
import MUIDataTable from 'mui-datatables';
import { CountryDictionary, CountryColorDictionary } from '../shared/Types';
import { Box, Typography, makeStyles } from '@material-ui/core';
import { getDateHeaders } from '../shared/Behaviors';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '20px',
    marginBottom: '20px',
    width: '80vw'
  },
}));

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
  const classes = useStyles();
  const { columns, rows } = formatData(data, countryColors);
  const options = {
    selectableRows: 'none',
  };

  return (
    <Box className={classes.container} data-testid={'data-table'}>
      <MUIDataTable
        title={'Confirmed Cases by Date'}
        data={rows}
        columns={columns}
        //@ts-ignore
        options={options}
      />
    </Box>
  );
};
