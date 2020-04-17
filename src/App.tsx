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
import { AppBar, Tabs, Tab, Box } from '@material-ui/core';

//todo make sure this filters inclusively
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

  useEffect(() => {
    CovidAPI.getAll().then(({ fullData, countries }) => {
      setCovidData(fullData);
      setCountryList(countries);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setSelectedCovidData(filterData(covidData, formData));
  }, [formData, covidData]);

  console.log('selectedCovidData', selectedCovidData);
  //todo replace with progress bar
  if (loading) return <div>loading</div>;

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
