import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface PhoneNumberInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  subLabel: string;
  error?: string; // Added error prop for validation message
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  value,
  onChange,
  label,
  subLabel,
  error = '', // Default empty string if no error
}) => {
  return (
    <div className="relative pb-2">
      <label className="my-2 block text-sm font-[450] text-gray-500/70 tracking-wider">
        {label.toUpperCase()}{' '}
        <span className="text-black text-xs font-medium">
          {'('}
          {subLabel}
          {')'}
        </span>
      </label>

      <PhoneInput
        country={'gr'}
        value={value}
        onChange={onChange}
        inputStyle={{
          backgroundColor: 'rgb(229 231 235 / 0.5)',
          width: '100%',
          border: error ? '1px solid #f87171' : '0px', // Red border on error
          height: '50px',
        }}
      />

      {error && (
        <p className="absolute text-sm text-red-500 mt-1">{error}</p> // Display error message
      )}
    </div>
  );
};

export default PhoneNumberInput;
