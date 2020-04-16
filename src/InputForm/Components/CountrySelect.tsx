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
  useTheme,
} from '@material-ui/core';
import { CountryList } from '../../shared/Types';

interface Props {
  countries: any;
  setCountries: any;
  countryList: CountryList;
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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const CountrySelect = ({ countries, setCountries, countryList }: Props) => {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const theme = useTheme();
  const classes = useStyles();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setPersonName(event.target.value as string[]);
  };

  // const handleSetcountries = (e: any) => {
  //   setCountries(e.target.value);
  // };
  // console.log('countries', countries);

  return (
    <>
      <div>please select your countries</div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
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
            <MenuItem
              key={country}
              value={country}
              style={getStyles(country, personName, theme)}
            >
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
