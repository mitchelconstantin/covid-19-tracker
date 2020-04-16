import React, { useState } from 'react';
import { DateSelect } from './Components/DateSelect';
import { CountrySelect } from './Components/CountrySelect';

const emptyFormState = {
  toDate: '',
  fromDate: '',
  countries: [],
};
export const BaseForm = () => {
  const [formState, setFormState] = useState(emptyFormState);

  const setFromDate = (fromDate: string) => {
    setFormState((prev) => ({ ...prev, fromDate }));
  };

  const setToDate = (toDate: string) => {
    setFormState((prev) => ({ ...prev, toDate }));
  };

  const setCountries = (countries: any) => {
    setFormState((prev) => ({ ...prev, countries }));
  };

  return (
    <>
      <DateSelect
        label="from"
        date={formState.fromDate}
        setDate={setFromDate}
      />
      <DateSelect
        label="to"
        date={formState.toDate}
        setDate={setToDate}
      />
      <CountrySelect 
      countries={formState.countries}
      setCountries={setCountries}/>
    </>
  );
};
