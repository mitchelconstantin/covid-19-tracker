import React, { useState, useEffect } from 'react';
import { BaseForm } from './InputForm/BaseForm';
import { TimeSeriesPlot } from './TimeSeriesPlot/TimeSeriesPlot';
import { ColorSelector } from './ColorSelector/ColorSelector';
import { DataTable } from './DataTable/DataTable';
import { CovidAPI } from './shared/CovidAPI';
import { About } from './About/About';
import { CountryDictionary, defaultFormData, FormData } from './shared/Types';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'lightGrey',
  },
  tabs: {
    color: 'black',
  },
  dataTab: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  loading: {
    marginTop: '35vh',
  },
}));

const filterData = (
  covidData: CountryDictionary,
  formData: FormData
): CountryDictionary => {
  const newData: CountryDictionary = {};
  formData.selectedCountries.forEach((country) => {
    const filteredData = covidData[country].filter(({ date }) => {
      // https://stackoverflow.com/a/14569783
      const offsetDate = new Date(date);
      const formattedDataTime = new Date(
        offsetDate.getTime() - offsetDate.getTimezoneOffset() * -60000
      );

      const formattedFromDate = new Date(formData.fromDate);
      const formattedToDate = new Date(formData.toDate);

      return (
        formattedDataTime >= formattedFromDate &&
        formattedDataTime <= formattedToDate
      );
    });
    newData[country] = filteredData;
  });
  return newData;
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(defaultFormData);
  const [covidData, setCovidData] = useState<CountryDictionary>({});
  const [selectedCovidData, setSelectedCovidData] = useState<CountryDictionary>(
    {}
  );
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();
  const TabContent = Box;
  const handleChangeTab = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  //initial data fetch
  useEffect(() => {
    CovidAPI.getAll().then((fullData) => {
      setCovidData(fullData);
      setLoading(false);
    });
  }, []);
  //update filtered data when user input changes
  useEffect(() => {
    Object.keys(covidData).length &&
      setSelectedCovidData(filterData(covidData, formData));
  }, [formData, covidData]);
  return (
    <div className="App">
      <AppBar position="static" className={classes.appBar}>
        <BaseForm formData={formData} setFormData={setFormData} />
        <Tabs
          className={classes.tabs}
          value={tabIndex}
          centered
          onChange={handleChangeTab}
        >
          <Tab label="Data View" />
          <Tab label="Choose Colors" />
          <Tab label="About" />
        </Tabs>
      </AppBar>
      <TabContent hidden={tabIndex !== 0}>
        <Box className={classes.dataTab}>
          {loading ? (
            <CircularProgress
              className={classes.loading}
              disableShrink
              color="secondary"
            />
          ) : (
            <>
              <TimeSeriesPlot
                data={selectedCovidData}
                countryColors={formData.countryColors}
              />
              <DataTable
                data={selectedCovidData}
                countryColors={formData.countryColors}
              />
            </>
          )}
        </Box>
      </TabContent>
      <TabContent hidden={tabIndex !== 1}>
        <ColorSelector formData={formData} setFormData={setFormData} />
      </TabContent>
      <TabContent hidden={tabIndex !== 2}>
        <About />
      </TabContent>
    </div>
  );
};

export default App;
