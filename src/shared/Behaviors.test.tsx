import { filterData } from './Behaviors';

const mockData = {
  US: [
    {
      date: '2020-4-11',
      confirmed: 526396,
      deaths: 20462,
      recovered: 31270,
    },
    {
      date: '2020-4-12',
      confirmed: 555313,
      deaths: 22019,
      recovered: 32988,
    },
    {
      date: '2020-4-13',
      confirmed: 580619,
      deaths: 23528,
      recovered: 43482,
    },
    {
      date: '2020-4-14',
      confirmed: 607670,
      deaths: 25831,
      recovered: 47763,
    },
  ],
  Germany: [
    {
      date: '2020-4-11',
      confirmed: 124908,
      deaths: 2736,
      recovered: 57400,
    },
    {
      date: '2020-4-12',
      confirmed: 127854,
      deaths: 3022,
      recovered: 60300,
    },
    {
      date: '2020-4-13',
      confirmed: 130072,
      deaths: 3194,
      recovered: 64300,
    },
    {
      date: '2020-4-14',
      confirmed: 131359,
      deaths: 3294,
      recovered: 68200,
    },
  ],
  China: [
    {
      date: '2020-4-11',
      confirmed: 83014,
      deaths: 3343,
      recovered: 77877,
    },
    {
      date: '2020-4-12',
      confirmed: 83134,
      deaths: 3343,
      recovered: 77956,
    },
    {
      date: '2020-4-13',
      confirmed: 83213,
      deaths: 3345,
      recovered: 78039,
    },
    {
      date: '2020-4-14',
      confirmed: 83306,
      deaths: 3345,
      recovered: 78200,
    },
  ],
};

const mockFormData = {
  toDate: '4/12/2020',
  fromDate: '4/11/2020',
  selectedCountries: ['US', 'Germany'],
  countryColors: {},
};

const mockResult = {
  US: [
    {
      date: '2020-4-11',
      confirmed: 526396,
      deaths: 20462,
      recovered: 31270,
    },
    {
      date: '2020-4-12',
      confirmed: 555313,
      deaths: 22019,
      recovered: 32988,
    },
  ],
  Germany: [
    {
      date: '2020-4-11',
      confirmed: 124908,
      deaths: 2736,
      recovered: 57400,
    },
    {
      date: '2020-4-12',
      confirmed: 127854,
      deaths: 3022,
      recovered: 60300,
    },
  ],
};
describe('shared app behaviors ', () => {
  it('filters data properly by date and country', () => {
    const filteredResult = filterData(mockData, mockFormData);
    expect(filteredResult).toMatchObject(mockResult);
  });
});
