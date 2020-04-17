import React from 'react';
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
import { countryList } from '../../shared/countryList';
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
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: CountryList }>) => {
    setSelectedCountries(event.target.value);
  };
// todo fix jank when selecting multiple countries
  return (
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Countries</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={selectedCountries}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {countryList.map((country) => (
            <MenuItem key={country} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
  );
};
