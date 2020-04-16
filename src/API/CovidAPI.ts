export class CovidAPI {
  static getAllCountriesLatest = async (): Promise<any> => {
    const res = await fetch('https://covidapi.info/api/v1/global/latest');
    const json = await res.json();
    return json;
  };
}
