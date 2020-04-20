import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('first tab should load by default, content should toggle when clicking tabs', () => {
  const { getByTestId, getByText } = render(<App />);

  const baseForm = getByTestId('base-form');
  const dataTable = getByTestId('data-table');
  const timeSeriesPlot = getByTestId('time-series-plot');
  const colorSelector = getByTestId('color-selector');

  const testDataViewTabRender = () => {
    expect(baseForm).toBeVisible();
    expect(timeSeriesPlot).toBeVisible();
    expect(dataTable).toBeVisible();
    expect(colorSelector).not.toBeVisible();
  };

  const testColorSelectTabRender = () => {
    expect(baseForm).toBeVisible();
    expect(timeSeriesPlot).not.toBeVisible();
    expect(dataTable).not.toBeVisible();
    expect(colorSelector).toBeVisible();
  };

  testDataViewTabRender();

  fireEvent.click(getByText('Choose Colors'));
  testColorSelectTabRender();

  fireEvent.click(getByText('Data View'));
  testDataViewTabRender();
});
