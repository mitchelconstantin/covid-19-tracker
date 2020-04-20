import React, { useState, useEffect } from 'react';
import { BaseForm } from './InputForm/BaseForm';
import { TimeSeriesPlot } from './TimeSeriesPlot/TimeSeriesPlot';
import { ColorSelector } from './ColorSelector/ColorSelector';
import { DataTable } from './DataTable/DataTable';
import { CovidAPI } from './shared/CovidAPI';
import { CountryDictionary, defaultFormData, FormData } from './shared/Types';
import { AppBar, Tabs, Tab, Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    margin: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countrySelect: {
    width: '30%',
    margin: '10px',
  },
  appBar: {
    backgroundColor: 'lightGrey',
  },
  tabs: {
    color: 'black'
    // backgroundColor: 'white',
    // boxShadow: '0',
  },
}));

const filterData = (
  covidData: CountryDictionary,
  formData: FormData
): CountryDictionary => {
  const newData: CountryDictionary = {};
  formData.selectedCountries.forEach((country) => {
    const filteredData = covidData[country].filter(({ date }) => {
      // hacky way to remove date offset
      // https://stackoverflow.com/a/14569783
      // todo improve this
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
        </Tabs>
      </AppBar>
      <TabContent hidden={tabIndex !== 0}>
        <TimeSeriesPlot
          data={selectedCovidData}
          countryColors={formData.countryColors}
        />
        <DataTable
          data={selectedCovidData}
          countryColors={formData.countryColors}
        />
      </TabContent>
      <TabContent hidden={tabIndex !== 1}>
        <ColorSelector formData={formData} setFormData={setFormData} />
      </TabContent>
    </div>
  );
};

export default App;
