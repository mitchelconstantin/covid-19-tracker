import React from 'react';
import { FormData } from '../shared/Types';
import { GithubPicker } from 'react-color';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

interface Props {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
export const ColorSelector = ({ formData, setFormData }: Props) => {
  const classes = useStyles();
  const countryColors = formData.countryColors;
  const selectedCountries = formData.selectedCountries;

  //@ts-ignore
  const handleChangeComplete = (hex, country) => {
    setFormData((prev: FormData) => ({
      ...prev,
      countryColors: { ...countryColors, [country]: hex },
    }));
  };

  return (
    <Box className={classes.container} data-testid="color-selector">
      {!selectedCountries.length ? (
        <div>you must select some countries before customizing colors</div>
      ) : (
        selectedCountries.map((country) => (
          <Box className={classes.countrySelect} key={country}>
            <Typography>select a color for {country}</Typography>
            <GithubPicker
              color={countryColors[country] || undefined}
              onChangeComplete={(color) =>
                handleChangeComplete(color.hex, country)
              }
            />
          </Box>
        ))
      )}
    </Box>
  );
};
