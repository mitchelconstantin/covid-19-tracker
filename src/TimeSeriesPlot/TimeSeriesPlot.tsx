import React from 'react';
import { CountryDictionary } from '../shared/Types';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

interface Props {
  data: CountryDictionary;
}
const getOptions = (data: CountryDictionary) => {
  const series = Object.entries(data).map(([country, dataPoints]) => {
    let data = dataPoints.map((dataPoint) => dataPoint.confirmed);
    return { name: country, data };
  });
  return {
    title: {
      text: 'Confirmed COVID-19 cases by country',
    },
    series,
    xAxis: {
      type: 'datetime',
      // dateTimeLabelFormats: {
      //   // don't display the dummy year
      //   month: '%e. %b',
      //   year: '%b',
      // },
      title: {
        text: 'Date',
      },
    },
    yAxis: {
      title: {
        text: 'Confirmed Cases',
      },
      min: 0,
    },
  };
};
// todo fix X axis dates
export const TimeSeriesPlot = ({ data }: Props) => {
  return <HighchartsReact highcharts={Highcharts} options={getOptions(data)} />;
};
