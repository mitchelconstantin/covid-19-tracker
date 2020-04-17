import React from 'react';
import { DateSelect } from './Components/DateSelect';
import { CountrySelect } from './Components/CountrySelect';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FormState, CountryList } from '../shared/Types';

interface Props {
  formData: FormState;
  setFormData: React.Dispatch<React.SetStateAction<FormState>>;
}

export const BaseForm = ({ formData, setFormData }: Props) => {
  const setFromDate = (fromDate: string) => {
    setFormData((prev: FormState) => ({ ...prev, fromDate }));
  };

  const setToDate = (toDate: string) => {
    setFormData((prev: FormState) => ({ ...prev, toDate }));
  };

  const setSelectedCountries = (selectedCountries: CountryList) => {
    setFormData((prev: FormState) => ({ ...prev, selectedCountries }));
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
      />
    </MuiPickersUtilsProvider>
  );
};
