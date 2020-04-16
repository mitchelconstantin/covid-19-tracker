import { CountryDictionary, CountryList } from '../Types';
//todo cleanup unneeded calls
export class CovidAPI {
         static getAll = async (): Promise<{
           fullData: CountryDictionary;
           countries: CountryList;
         }> => {
           const res = await fetch(
             'https://pomber.github.io/covid19/timeseries.json '
           );
           const fullData = await res.json();
           const countries = Object.keys(fullData);
           return { fullData, countries };
         };
         //  static getAllCountriesLatest = async (): Promise<any> => {
         //    const res = await fetch(
         //      'https://covidapi.info/api/v1/global/latest'
         //    );
         //    const json = await res.json();
         //    return json;
         //  };
       }
