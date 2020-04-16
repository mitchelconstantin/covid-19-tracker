import React, { useState } from 'react';
import { DateSelect } from './Components/DateSelect';
import { CountrySelect } from './Components/CountrySelect';
import { CountryList } from '../shared/Types';

interface Props {
  formState: any;
  setFormState: any;
  countryList: CountryList;
}
//todo fix any types 
export const BaseForm = ({ formState, setFormState, countryList }: Props) => {
  const setFromDate = (fromDate: string) => {
    setFormState((prev: any) => ({ ...prev, fromDate }));
  };

  const setToDate = (toDate: string) => {
    setFormState((prev: any) => ({ ...prev, toDate }));
  };

  const setSelectedCountries = (selectedCountries: any) => {
    setFormState((prev: any) => ({ ...prev, selectedCountries }));
  };

  console.log('formState', formState);

  return (
    <>
      <DateSelect
        label="from"
        date={formState.fromDate}
        setDate={setFromDate}
      />
      <DateSelect label="to" date={formState.toDate} setDate={setToDate} />
      <CountrySelect
        selectedCountries={formState.selectedCountries}
        setSelectedCountries={setSelectedCountries}
        countryList={countryList}
      />
    </>
  );
};
