import React from 'react';
import { DateSelect } from './DateSelect';
import { CountrySelect } from './CountrySelect';

export const InputForm = () => {
  return (
    <>
      <div>I am an input form</div>
      from:
      <DateSelect />
      to:
      <DateSelect />
      country:
      <CountrySelect />
    </>
  );
};
