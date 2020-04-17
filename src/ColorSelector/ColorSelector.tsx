import React from 'react';
import { CountryColorDictionary, FormState } from '../shared/Types';
//@ts-ignore
import { SliderPicker } from 'react-color';

//todo remove any
interface Props {
  formData: FormState;
  setFormData: any;
}
//todo fix any types
export const ColorSelector = ({ formData, setFormData }: Props) => {
  const countryColors = formData.countryColors;
  const selectedCountries = formData.selectedCountries;
  
  //@ts-ignore
  const handleChangeComplete = (hex, country) => {
    console.log('got hex value', hex, ' for country ', country);
    //@ts-ignore
    setFormData((prev: any) => ({
      ...prev,
      countryColors: { ...countryColors, [country]: hex },
    }));
  };

  return (
    <>
      <div>select a color</div>
      {selectedCountries.map((country) => (
        <>
          <div>select a color for {country}</div>
          <SliderPicker
            color={countryColors[country] || undefined}
            onChangeComplete={(color) =>
              handleChangeComplete(color.hex, country)
            }
          />
        </>
      ))}
    </>
  );
};
