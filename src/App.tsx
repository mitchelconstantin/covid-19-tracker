import React, { useState, useEffect } from 'react';
import './App.css';
import { BaseForm } from './InputForm/BaseForm';
import { TimeSeriesPlot } from './TimeSeriesPlot/TimeSeriesPlot';
import { ColorSelector } from './ColorSelector/ColorSelector';
import { DataTable } from './DataTable/DataTable';
import { CovidAPI } from './shared/API/CovidAPI';
import { CountryDictionary, CountryList, emptyFormState } from './shared/Types';

const App = () => {
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
    });
  }, []);

  useEffect(() => {
    //@ts-ignore
    let relevantData = [];
    formState.selectedCountries.forEach((country) => {
      //todo filter by dates
      relevantData.push(covidData[country]);
    });
    //@ts-ignore
    setSelectedCovidData(relevantData);
    //@ts-ignore
  }, [formState, covidData]);

  console.log('selected data', selectedCovidData);

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
