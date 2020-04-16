import React, { useState, useEffect } from 'react';
import './App.css';
import { BaseForm } from './InputForm/BaseForm';
import { TimeSeriesPlot } from './TimeSeriesPlot/TimeSeriesPlot';
import { ColorSelector } from './ColorSelector/ColorSelector';
import { DataTable } from './DataTable/DataTable';
import { CovidAPI } from './shared/API/CovidAPI';
import { CountryDictionary, CountryList, emptyFormState } from './shared/Types';

const App = () => {
  const [loading, setLoading] = useState(true);
  //todo rename to formData or similar
  const [formState, setFormState] = useState(emptyFormState);
  const [covidData, setCovidData] = useState<CountryDictionary>({});
  const [countryList, setCountryList] = useState<CountryList>([]);
  const [selectedCovidData, setSelectedCovidData] = useState<CountryDictionary>(
    {}
  );

  useEffect(() => {
    CovidAPI.getAll().then(({ fullData, countries }) => {
      setCovidData(fullData);
      setCountryList(countries);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    //todo split this out into seperate function
    let newData: CountryDictionary = {};
    formState.selectedCountries.forEach((country) => {
      let filteredData = covidData[country].filter(({date}) => {
        const formattedDataTime = new Date(date);
        const formattedFromDate = new Date(formState.fromDate);
        const formattedToDate = new Date(formState.toDate);
        return (
          formattedDataTime >= formattedFromDate &&
          formattedDataTime <= formattedToDate
        );
      });
      newData[country] = filteredData;
    });
    setSelectedCovidData(newData);
  }, [formState, covidData]);

  //todo replace with progress bar
  if (loading) return <div>loading</div>;
  // console.log('formState', formState);
  // console.log('selectedCovidData, ', selectedCovidData);
  return (
    <div className="App">
      <BaseForm
        formState={formState}
        setFormState={setFormState}
        countryList={countryList}
      />
      <TimeSeriesPlot />
      <DataTable data={selectedCovidData} />
      <ColorSelector />
    </div>
  );
};

export default App;
