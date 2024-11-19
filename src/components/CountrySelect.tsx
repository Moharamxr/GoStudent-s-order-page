// CountrySelect.tsx

import React from "react";
import { countries } from "countries-list";

interface CountrySelectProps {
  value: string;
  onChange: (country: string) => void;
  error?: string; // Added error prop for validation message
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange, error = '' }) => {
  const countryList = Object.values(countries).map((country) => country.name);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative pb-2">
      <select
        value={value}
        onChange={handleCountryChange}
        className={`bg-gray-200/50 outline-none w-full text-gray-400 h-[50px] px-4 rounded-md ${
          error ? 'border-red-500' : '' // Apply red border if there's an error
        }`}
        style={{border: error ? '1px solid #f87171' : '0px',}}
      >
        <option value="" disabled>
          Country
        </option>
        {countryList.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select>
      {error && (
        <p className="absolute text-sm text-red-500 mt-1">{error}</p> // Show error message if any
      )}
    </div>
  );
};

export default CountrySelect;
