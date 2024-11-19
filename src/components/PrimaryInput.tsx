// PrimaryInput.tsx

import React from 'react';

interface PrimaryInputProps {
  value: string | number;
  onChange: (value: string) => void;
  inputType: 'text' | 'email' | 'number';
  placeholder?: string;
  id?: string;
  name?: string;
  required?: boolean;
  error?: string; // Added error prop to display validation error messages
}

const PrimaryInput: React.FC<PrimaryInputProps> = ({
  value,
  onChange,
  inputType,
  placeholder = '',
  id = '',
  name = '',
  required = false,
  error = '', // Default empty string if no error
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative pb-2 w-full">
      <input
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        id={id}
        name={name}
        required={required}
        className={`bg-gray-200/50 outline-none w-full h-[50px] px-4 rounded-md ${
          error ? 'border-red-500 border' : '' // Add border color if there's an error
        }`}
      />
      {error && (
        <p className="absolute text-sm text-red-500 mt-1 line-clamp-1">{error}</p> // Display the error message
      )}
    </div>
  );
};

export default PrimaryInput;
