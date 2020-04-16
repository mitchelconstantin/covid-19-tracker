import React from 'react';
import TextField from '@material-ui/core/TextField';

interface Props {
  label: string;
  date: string;
  setDate: any;
}

// todo, replace with material ui picker https://material-ui.com/components/pickers/
export const DateSelect = ({ label, date, setDate }: Props) => {
// todo, add event like: 
//  event: React.ChangeEvent<{ value: unknown }>
  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  };
  
  return (
    <form noValidate>
      <TextField
        id="date"
        label={label}
        type="date"
        defaultValue={date}
        onChange={handleDateChange}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
};
