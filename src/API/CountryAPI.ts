export class CountryAPI {
  static getAll = async (): Promise<any> => {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await res.json();
    return json;
  };
}
