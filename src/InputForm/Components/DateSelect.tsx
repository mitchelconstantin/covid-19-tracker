import React from 'react';
import { convertTime } from '../../shared/Behaviors';
import { KeyboardDatePicker } from '@material-ui/pickers';

interface Props {
  label: string;
  date: string;
  setDate: any;
}

export const DateSelect = ({ label, date, setDate }: Props) => {
  const handleDateChange = (date: Date | null) => {
    var result = date && convertTime(date);
    setDate(result);
  };
  //todo add to/from before/after validation
  return (
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format="MM/dd/yyyy"
        margin="normal"
        id="date-picker-inline"
        label={label}
        value={date}
        onChange={handleDateChange}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
  );
};
