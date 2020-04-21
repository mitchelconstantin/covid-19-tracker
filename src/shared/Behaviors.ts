import { CountryDictionary, FormData } from './Types';

export const convertTime = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    day: 'numeric',
    month: 'numeric',
    timeZone: 'UTC',
  });
};

export const today = () => convertTime(new Date());

export const tenDaysAgo = () => {
  const newDate = new Date(today());
  newDate.setDate(newDate.getDate() - 10);
  return convertTime(newDate);
};

export const getDateHeaders = (data: CountryDictionary) => {
  for (let key in data) {
    const columnData = data[key].map(({ date }) => date);
    return columnData;
  }
  return [];
};

export const filterData = (
  covidData: CountryDictionary,
  formData: FormData
): CountryDictionary => {
  const newData: CountryDictionary = {};
  formData.selectedCountries.forEach((country) => {
    const filteredData = covidData[country].filter(({ date }) => {
      const convertedDate = convertTime(new Date(date));
      const formattedDataTime = Date.parse(convertedDate);
      const formattedFromDate = Date.parse(formData.fromDate);
      const formattedToDate = Date.parse(formData.toDate);

      return (
        formattedDataTime >= formattedFromDate &&
        formattedDataTime <= formattedToDate
      );
    });
    newData[country] = filteredData;
  });
  return newData;
};
