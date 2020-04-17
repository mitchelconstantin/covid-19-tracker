import React from 'react';
import { DateSelect } from './Components/DateSelect';
import { CountrySelect } from './Components/CountrySelect';
import { CountryList } from '../shared/Types';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

interface Props {
  formData: any;
  setFormData: any;
  countryList: CountryList;
}
//todo fix any types
export const BaseForm = ({ formData, setFormData, countryList }: Props) => {
  const setFromDate = (fromDate: string) => {
    setFormData((prev: any) => ({ ...prev, fromDate }));
  };

  const setToDate = (toDate: string) => {
    setFormData((prev: any) => ({ ...prev, toDate }));
  };

  const setSelectedCountries = (selectedCountries: any) => {
    setFormData((prev: any) => ({ ...prev, selectedCountries }));
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateSelect
        label="from"
        date={formData.fromDate}
        setDate={setFromDate}
      />
      <DateSelect label="to" date={formData.toDate} setDate={setToDate} />
      <CountrySelect
        selectedCountries={formData.selectedCountries}
        setSelectedCountries={setSelectedCountries}
        countryList={countryList}
      />
    </MuiPickersUtilsProvider>
  );
};
