import React, { useState, useEffect } from 'react';
import { BaseForm } from './InputForm/BaseForm';
import { TimeSeriesPlot } from './TimeSeriesPlot/TimeSeriesPlot';
import { ColorSelector } from './ColorSelector/ColorSelector';
import { DataTable } from './DataTable/DataTable';
import { CovidAPI } from './shared/CovidAPI';
import {
  CountryDictionary,
  CountryList,
  defaultFormData,
  FormState,
} from './shared/Types';
import { AppBar, Tabs, Tab, Box, LinearProgress } from '@material-ui/core';

const filterData = (
  covidData: CountryDictionary,
  formData: FormState
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
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(defaultFormData);
  const [covidData, setCovidData] = useState<CountryDictionary>({});
  const [countryList, setCountryList] = useState<CountryList>([]);
  const [selectedCovidData, setSelectedCovidData] = useState<CountryDictionary>(
    {}
  );
  const [tabIndex, setTabIndex] = useState(0);
  const TabContent = Box;
  const handleChangeTab = (
    event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  useEffect(() => { //initial data fetch
    CovidAPI.getAll().then(({ fullData, countries }) => {
      setCovidData(fullData);
      setCountryList(countries);
      setLoading(false);
    });
  }, []);
  useEffect(() => { //update filtered data when user input changes
   Object.keys(covidData).length && setSelectedCovidData(filterData(covidData, formData));
  }, [formData, covidData]);

  if (loading) return <LinearProgress />;
  
  return (
    <div className="App">
      <BaseForm
        formData={formData}
        setFormData={setFormData}
        countryList={countryList}
      />
      <AppBar position="static">
        <Tabs value={tabIndex} onChange={handleChangeTab}>
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
