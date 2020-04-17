import React from 'react';
import { FormState } from '../shared/Types';
import { GithubPicker } from 'react-color';
import { Box, Typography, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'static',
  },
  countrySelect: {
    width: '30%',
    margin: '10px',
  },
}));

//todo remove any
interface Props {
  formData: FormState;
  setFormData: any;
}
//todo fix any types
export const ColorSelector = ({ formData, setFormData }: Props) => {
  const classes = useStyles();
  const countryColors = formData.countryColors;
  const selectedCountries = formData.selectedCountries;

  //@ts-ignore
  const handleChangeComplete = (hex, country) => {
    setFormData((prev: any) => ({
      ...prev,
      countryColors: { ...countryColors, [country]: hex },
    }));
  };

  if (!selectedCountries.length) {
    return <div>you must select some countries before customizing colors</div>;
  }
  return (
    <Box className={classes.container}>
      {selectedCountries.map((country) => (
        <Box className={classes.countrySelect} key={country}>
          <Typography>select a color for {country}</Typography>
          <GithubPicker
            color={countryColors[country] || undefined}
            onChangeComplete={(color) =>
              handleChangeComplete(color.hex, country)
            }
          />
        </Box>
      ))}
    </Box>
  );
};
