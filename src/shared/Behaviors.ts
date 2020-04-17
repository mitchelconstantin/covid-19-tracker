import { CountryDictionary } from './Types';

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
  const yesterday = new Date(today());
  yesterday.setDate(yesterday.getDate() - 10);
  return convertTime(yesterday);
};

export const getDateHeaders = (data: CountryDictionary)=> {
  for (let key in data) {
    const columnData = data[key].map(({ date }) => date);
    return columnData;
  }
  return [];
};
