import React, { useState } from 'react';
import { DateSelect } from './Components/DateSelect';
import { CountrySelect } from './Components/CountrySelect';
import { CountryList } from '../shared/Types';

const emptyFormState = {
  toDate: '',
  fromDate: '',
  countries: [],
};

interface Props {
 countryList: CountryList;
}


export const BaseForm = ({countryList}: Props) => {
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
      <DateSelect label="to" date={formState.toDate} setDate={setToDate} />
      <CountrySelect
        countries={formState.countries}
        setCountries={setCountries}
        countryList={countryList}
      />
    </>
  );
};
