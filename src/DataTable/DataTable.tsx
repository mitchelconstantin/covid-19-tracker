import React, { useEffect, useState } from 'react';
import { CovidAPI } from '../shared/API/CovidAPI';
import { CountryAPI } from '../shared/API/CountryAPI';

export const DataTable = () => {
  const [data, setData] = useState(['empty']);
  const [countries, setCountries] = useState(['empty']);

  // useEffect(() => {
  //   CovidAPI.getAllCountriesLatest().then((res) => setData(res));
  // }, []);

  // useEffect(() => {
  //   CountryAPI.getAll().then((res) => setCountries(res));
  // }, []);

  console.log('your data', data);
  console.log('your countries', countries);
  return <div>I am a data table</div>;
};
