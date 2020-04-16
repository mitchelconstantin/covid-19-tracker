import React, { useState, useEffect } from 'react';
import './App.css';
import { BaseForm } from './InputForm/BaseForm';
import { TimeSeriesPlot } from './TimeSeriesPlot/TimeSeriesPlot';
import { ColorSelector } from './ColorSelector/ColorSelector';
import { DataTable } from './DataTable/DataTable';
import { CovidAPI } from './shared/API/CovidAPI';
import { CountryDictionary } from './shared/Types';

const extractCountryNames = (data: CountryDictionary) => {
  return Object.keys(data);
};

const App = () => {
  const [covidData, setCovidData] = useState<CountryDictionary>();
  const [countryList, setCountryList] = useState<string[]>();
  useEffect(() => {
    CovidAPI.getAll().then((res) => {
      setCovidData(res);
      setCountryList(extractCountryNames(res));
    });
  }, []);
  if (covidData) {
    console.log('covidData', covidData['Afghanistan']);
  }
  console.log('countryList', countryList);

  return (
    <div className="App">
      <BaseForm />
      <TimeSeriesPlot />
      <DataTable />
      <ColorSelector />
    </div>
  );
};

export default App;
