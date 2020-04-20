import React from 'react';
import { render } from '@testing-library/react';
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
});
