import { CountryDictionary, CountryList } from './Types';

export class CovidAPI {
  static getAll = async (): Promise<{
    fullData: CountryDictionary;
    countries: CountryList;
  }> => {
    const res = await fetch(
      'https://pomber.github.io/covid19/timeseries.json '
    );
    const fullData = await res.json();
    const countries = Object.keys(fullData).sort();
    return { fullData, countries };
  };
}
