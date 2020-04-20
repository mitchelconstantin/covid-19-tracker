import React from 'react';
import { render } from '@testing-library/react';
import { BaseForm } from './BaseForm';
import { defaultFormData } from '../shared/Types';

test('renders learn react link', () => {
  const mockSetFormData = jest.fn();
  const { getByText } = render(
    <BaseForm formData={defaultFormData} setFormData={mockSetFormData} />
  );
  const linkElement = getByText('Countries');
  expect(linkElement).toBeInTheDocument();
});
