import React from 'react';
import { FormState } from '../shared/Types';
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
    setFormData((prev: any) => ({
      ...prev,
      countryColors: { ...countryColors, [country]: hex },
    }));
  };

  if (!selectedCountries.length) {
    return <div>you must select some countries before customizing colors</div>;
  }
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
