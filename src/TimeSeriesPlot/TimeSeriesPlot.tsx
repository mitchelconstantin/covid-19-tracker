import React from 'react';
import { CountryDictionary, CountryColorDictionary } from '../shared/Types';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { getDateHeaders } from '../shared/Behaviors';

interface Props {
  data: CountryDictionary;
  countryColors: CountryColorDictionary;
}

const getOptions = (
  data: CountryDictionary,
  countryColors: CountryColorDictionary
) => {
  const categories = getDateHeaders(data);

  const series = Object.entries(data).map(([country, dataPoints]) => {
    let data = dataPoints.map((dataPoint) => dataPoint.confirmed);
    return { name: country, color: countryColors[country] || undefined, data };
  });
  return {
    title: {
      text: 'Confirmed COVID-19 Cases',
    },
    series,
    xAxis: {
      categories,
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
    credits: { enabled: false },
  };
};

export const TimeSeriesPlot = ({ data, countryColors }: Props) => {
  return (
    <div data-testid="time-series-plot">
      <HighchartsReact
        highcharts={Highcharts}
        options={getOptions(data, countryColors)}
      />
    </div>
  );
};
