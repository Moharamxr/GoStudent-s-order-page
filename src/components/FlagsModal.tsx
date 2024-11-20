import React, { useContext, useState } from 'react';
import Flag from 'react-world-flags'; 
import { gState } from '../context/Context';

interface Country {
  code: string;
}

const FlagModal: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('GB');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const countries: Country[] = [
    { code: 'GB' }, 
    { code: 'EG' },         
    { code: 'GR' },        
    { code: 'IT' },         
    { code: 'JP' },         
    { code: 'KR' },   
    { code: 'RU' },        
    { code: 'US' }, 
    { code: 'AR' }, 
    { code: 'SA' }, 
    { code: 'AE' },
  ];

  // Access context and handle undefined case
  const context = useContext(gState);
  if (!context) return null; // or render a fallback if the context is not available

  const { setRtl } = context;

  const handleSelect = (code: string): void => {
    setSelectedCountry(code);
    setRtl(code === 'AR' || code === 'IL' || code === 'SA' || code === 'AE' || code === 'EG');
    setIsOpen(false); 
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="relative inline-block text-left ">
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-10 h-8 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
          id="menu-button"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-haspopup="true"
          onClick={toggleDropdown} // Toggle visibility on button click
        >
          <Flag code={selectedCountry} style={{ width: 24, height: 16 }} />
        </button>
      </div>

      {/* Conditionally render dropdown based on isOpen state */}
      {isOpen && (
        <div
          className="origin-top-left absolute left-0 mt-2  rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div role="none">
            {countries.map((country) => (
              <a
                key={country.code}
                href="#"
                className="text-gray-700 block p-1 ps-2 text-sm"
                role="menuitem"
                onClick={() => handleSelect(country.code)}
              >
                <Flag code={country.code} style={{ width: 24, height: 16, marginRight: 8 }} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FlagModal;
