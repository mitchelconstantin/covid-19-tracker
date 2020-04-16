import React, { useState, useEffect } from 'react';
import './App.css';
import { BaseForm } from './InputForm/BaseForm';
import { TimeSeriesPlot } from './TimeSeriesPlot/TimeSeriesPlot';
import { ColorSelector } from './ColorSelector/ColorSelector';
import { DataTable } from './DataTable/DataTable';
import { CovidAPI } from './shared/API/CovidAPI';
import { CountryDictionary, CountryList, emptyFormState } from './shared/Types';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

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

  //todo replace with progress bar
  if (loading) return <div>loading</div>;
  // console.log('formState', formState);
  // console.log('selectedCovidData, ', selectedCovidData);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="App">
        <BaseForm
          formState={formState}
          setFormState={setFormState}
          countryList={countryList}
        />
        {/* <TimeSeriesPlot /> */}
        {/* <DataTable data={selectedCovidData} /> */}
        {/* <ColorSelector /> */}
      </div>
    </MuiPickersUtilsProvider>
  );
};

export default App;
