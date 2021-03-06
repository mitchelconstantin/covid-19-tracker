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
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

  const handleChangeComplete = (hex: string, country: string) => {
    setFormData((prev: FormData) => ({
      ...prev,
      countryColors: { ...countryColors, [country]: hex },
    }));
  };

  return (
    <Box className={classes.container} data-testid="color-selector">
      {!selectedCountries.length ? (
        <Typography>
          you must select some countries before customizing colors
        </Typography>
      ) : (
        selectedCountries.map((country) => (
          <Box className={classes.countrySelect} key={country}>
            <Typography
              style={{ color: countryColors[country], maxWidth: '100%' }}
            >
              select a color for {country}
            </Typography>
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
