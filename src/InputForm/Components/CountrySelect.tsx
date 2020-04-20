import React, { useState } from 'react';
import {
  makeStyles,
  Theme,
  createStyles,
  FormControl,
  InputLabel,
  Select,
  Input,
  Chip,
  MenuItem,
} from '@material-ui/core';
import { fullCountryList } from '../../shared/fullCountryList';
import { CountryList } from '../../shared/Types';

interface Props {
  selectedCountries: CountryList;
  setSelectedCountries: React.Dispatch<React.SetStateAction<CountryList>>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
    countrySelect: {
      minHeight: '40px',
      marginBottom: '8px'
    },
  })
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CountrySelect = ({
  selectedCountries,
  setSelectedCountries,
}: Props) => {
  const [localSelectedCountries, setLocalSelectedCountries] = useState<
    CountryList
  >(selectedCountries);
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: CountryList }>) => {
    setLocalSelectedCountries(event.target.value);
  };
  const handleClose = () => {
    setSelectedCountries(localSelectedCountries);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Countries</InputLabel>
      <Select
        className={classes.countrySelect}
        data-testid="country-input"
        multiple
        value={localSelectedCountries}
        onChange={handleChange}
        onClose={handleClose}
        input={<Input id="select-multiple-chip" />}
        renderValue={(countries: CountryList) => (
          <div className={classes.chips}>
            {countries.map((countryName) => (
              <Chip
                key={countryName}
                label={countryName}
                className={classes.chip}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {fullCountryList.map((country) => (
          <MenuItem key={country} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
