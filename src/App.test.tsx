import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('first tab should load by default, content should toggle when clicking tabs', () => {
  const { getByTestId, getByText } = render(<App />);

  const baseForm = getByTestId('base-form');
  const dataTable = getByTestId('data-table');
  const timeSeriesPlot = getByTestId('time-series-plot');
  const colorSelector = getByTestId('color-selector');
  const aboutSection = getByTestId('about');

  const testDataViewTabRender = () => {
    expect(baseForm).toBeVisible();
    expect(timeSeriesPlot).toBeVisible();
    expect(dataTable).toBeVisible();
    expect(colorSelector).not.toBeVisible();
    expect(aboutSection).not.toBeVisible();
  };

  const testColorSelectTabRender = () => {
    expect(baseForm).toBeVisible();
    expect(timeSeriesPlot).not.toBeVisible();
    expect(dataTable).not.toBeVisible();
    expect(colorSelector).toBeVisible();
    expect(aboutSection).not.toBeVisible();
  };

  const testAboutTabRender = () => {
    expect(baseForm).toBeVisible();
    expect(timeSeriesPlot).not.toBeVisible();
    expect(dataTable).not.toBeVisible();
    expect(colorSelector).not.toBeVisible();
    expect(aboutSection).toBeVisible();
  };

  testDataViewTabRender();

  fireEvent.click(getByText('Choose Colors'));
  testColorSelectTabRender();

  fireEvent.click(getByText('Data View'));
  testDataViewTabRender();

  fireEvent.click(getByText('About'));
  testAboutTabRender();
});
