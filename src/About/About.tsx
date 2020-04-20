import React from 'react';
import { Box, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    maxWidth: '50%',
    marginTop: '15px',
  },
}));

export const About = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container} data-testid="about">
      <Typography className={classes.text}>
        This is a dashboard used for visualizing COVID-19 infections on a
        per-country basis. The data is pulled from
        https://github.com/pomber/covid19
      </Typography>
      <Typography className={classes.text}>
        To use it, select one or more countries from the dropdown above. The
        dates are defaulted to a range form 10 days ago to today. Please note
        today's data may not be available yet.
      </Typography>
      <Typography className={classes.text}>
        If you want to assign custom colors to the countries you have selected,
        click on the 'choose colors' tab above. Those colors will be reflected in
        the chart and graph in the 'Data View' tab.
      </Typography>
    </Box>
  );
};
