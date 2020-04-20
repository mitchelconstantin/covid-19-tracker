import React from 'react';
import { convertTime } from '../../shared/Behaviors';
import { KeyboardDatePicker } from '@material-ui/pickers';

interface Props {
  label: string;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
}

export const DateSelect = ({ label, date, setDate }: Props) => {
  const handleDateChange = (date: Date | null) => {
    var result = date && convertTime(date);
    setDate(result);
  };
  return (
    <KeyboardDatePicker
      disableToolbar
      data-testid={`${label}-input`}
      variant="inline"
      format="yyyy-MM-dd"
      margin="normal"
      label={label}
      value={date}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        'aria-label': 'change date',
      }}
    />
  );
};
