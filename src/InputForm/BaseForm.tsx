import React from 'react';
import { DateSelect } from './Components/DateSelect';
import { CountrySelect } from './Components/CountrySelect';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { FormData, CountryList } from '../shared/Types';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export const BaseForm = ({ formData, setFormData }: Props) => {
  const classes = useStyles();
  const setFromDate = (fromDate: string) => {
    setFormData((prev: FormData) => ({ ...prev, fromDate }));
  };

  const setToDate = (toDate: string) => {
    setFormData((prev: FormData) => ({ ...prev, toDate }));
  };

  const setSelectedCountries = (selectedCountries: CountryList) => {
    setFormData((prev: FormData) => ({ ...prev, selectedCountries }));
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box data-testid="base-form" className={classes.container}>
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
      </Box>
    </MuiPickersUtilsProvider>
  );
};
