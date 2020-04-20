import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BaseForm } from './BaseForm';
import { defaultFormData } from '../shared/Types';

test('renders all three selector components', () => {
  const mockSetFormData = jest.fn();
  const { getByTestId } = render(
    <BaseForm formData={defaultFormData} setFormData={mockSetFormData} />
  );
  const fromDateSelector = getByTestId('from-input');
  const toDateSelector = getByTestId('to-input');
  const countrySelector = getByTestId('country-input');

  expect(fromDateSelector).toBeVisible();
  expect(toDateSelector).toBeVisible();
  expect(countrySelector).toBeVisible();

  fireEvent.change(fromDateSelector, { target: { value: '2020-01-01' } });
  expect(mockSetFormData.mock.calls[0][0]().fromDate).toBe('1/1/2020');
});

test('calls setFormData with a function that includes the selected from date', () => {
  const mockSetFormData = jest.fn();
  const { getByTestId } = render(
    <BaseForm formData={defaultFormData} setFormData={mockSetFormData} />
  );
  const fromDateSelector = getByTestId('from-input');

  fireEvent.change(fromDateSelector, { target: { value: '2020-01-01' } });
  expect(mockSetFormData.mock.calls[0][0]().fromDate).toBe('1/1/2020');
});

test('calls setFormData with a function that includes the selected to date', () => {
  const mockSetFormData = jest.fn();
  const { getByTestId } = render(
    <BaseForm formData={defaultFormData} setFormData={mockSetFormData} />
  );
  const toDateSelector = getByTestId('to-input');

  fireEvent.change(toDateSelector, { target: { value: '2020-01-30' } });
  expect(mockSetFormData.mock.calls[0][0]().toDate).toBe('1/30/2020');
});

//test for country selecter becomes very complicated because of select component
// https://stackoverflow.com/questions/55184037/react-testing-library-on-change-for-material-ui-select-component
// test('calls setFormData with a function that includes the selected countries', () => {
//   const mockSetFormData = jest.fn();
//   const { getByTestId } = render(
//     <BaseForm formData={defaultFormData} setFormData={mockSetFormData} />
//   );
//   const countrySelector = getByTestId('country-input').querySelector('input');

//   fireEvent.change(countrySelector, { target: { value: ['USA, China'] } });
//   console.log('calls', mockSetFormData.mock.calls);
//   expect(mockSetFormData.mock.calls[0][0]().selectedCountries).toBe([
//     'US',
//     'China',
//   ]);
// });
