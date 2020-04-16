import React, { useState, useEffect } from 'react';
import './App.css';
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

const filterData = (
  covidData: CountryDictionary,
  formData: FormState
): CountryDictionary => {
  const newData: CountryDictionary = {};
  formData.selectedCountries.forEach((country) => {
    const filteredData = covidData[country].filter(({ date }) => {
      const formattedDataTime = new Date(date);
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

  //todo replace with progress bar
  if (loading) return <div>loading</div>;

  return (
    <div className="App">
      <BaseForm
        formData={formData}
        setFormData={setFormData}
        countryList={countryList}
      />
      <TimeSeriesPlot data={selectedCovidData} />
      <DataTable data={selectedCovidData} />
      <ColorSelector />
    </div>
  );
};

export default App;
