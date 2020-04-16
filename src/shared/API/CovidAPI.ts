import { CountryDictionary } from "../Types";
//todo cleanup unneeded calls
export class CovidAPI {
         static getAll = async (): Promise<CountryDictionary> => {
           const res = await fetch(
             'https://pomber.github.io/covid19/timeseries.json '
           );
           const json = await res.json();
           return json;
         };
        //  static getAllCountriesLatest = async (): Promise<any> => {
        //    const res = await fetch(
        //      'https://covidapi.info/api/v1/global/latest'
        //    );
        //    const json = await res.json();
        //    return json;
        //  };
       }
