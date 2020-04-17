import { CountryDictionary } from './Types';

export class CovidAPI {
  static getAll = async (): Promise<CountryDictionary> => {
    const res = await fetch(
      'https://pomber.github.io/covid19/timeseries.json '
    );
    const fullData = await res.json();
    return fullData;
  };
}
