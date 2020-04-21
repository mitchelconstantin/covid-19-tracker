import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BaseForm } from './BaseForm';
import { defaultFormData } from '../shared/Types';

describe('BaseForm rendering and functionality', () => {
  it('renders all three selector components', () => {
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

  it('calls setFormData with a function that includes the selected from date', () => {
    const mockSetFormData = jest.fn();
    const { getByTestId } = render(
      <BaseForm formData={defaultFormData} setFormData={mockSetFormData} />
    );
    const fromDateSelector = getByTestId('from-input');

    fireEvent.change(fromDateSelector, { target: { value: '2020-01-01' } });
    expect(mockSetFormData.mock.calls[0][0]().fromDate).toBe('1/1/2020');
  });

  it('calls setFormData with a function that includes the selected to date', () => {
    const mockSetFormData = jest.fn();
    const { getByTestId } = render(
      <BaseForm formData={defaultFormData} setFormData={mockSetFormData} />
    );
    const toDateSelector = getByTestId('to-input');

    fireEvent.change(toDateSelector, { target: { value: '2020-01-30' } });
    expect(mockSetFormData.mock.calls[0][0]().toDate).toBe('1/30/2020');
  });
});
