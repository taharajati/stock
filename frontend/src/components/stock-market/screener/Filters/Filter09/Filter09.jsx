import React, { useState, useEffect } from 'react';

const Filter09 = ({ onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [intradata, setIntradata] = useState([]);
  const [uaInstrumentId, setUaInstrumentId] = useState('');
  const [filteredSymbols, setFilteredSymbols] = useState([]);
  const [isDropdownDisabled, setIsDropdownDisabled] = useState(false); // State to track dropdown status

  // Fetch intradata when the component mounts
  useEffect(() => {
    const fetchIntradata = async () => {
      try {
        const response = await fetch('https://api.optionscreener.ir/api/options/intradata');
        const data = await response.json();
        setIntradata(data.data); // assuming data is in the 'data' field
        setFilteredSymbols(data.data); // Initially, show all data
      } catch (error) {
        console.error('Error fetching intradata:', error);
      }
    };

    fetchIntradata();
  }, []);

  // Handle search term change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === '') {
      // If the search term is empty, reset to show all data and enable the dropdown
      setFilteredSymbols(intradata);
      setIsDropdownDisabled(false); // Enable the dropdown
      setUaInstrumentId('');
      onFilterChange(''); // Reset the filter (i.e., send no value to the parent)
    } else {
      // Filter symbols that start with the search term (case-insensitive)
      const filtered = intradata.filter(item =>
        item.symbol_fa.startsWith(value)
      );

      setFilteredSymbols(filtered);

      if (filtered.length > 0) {
        // If there's a match, set the first item’s instrument_id
        setUaInstrumentId(filtered[0].instrument_id);
        onFilterChange(filtered[0].instrument_id); // Send the instrument_id to parent
      } else {
        setUaInstrumentId('');
        onFilterChange(''); // Send empty value to parent when no match is found
      }
    }
  };

  // Handle symbol selection from the dropdown
  const handleSymbolSelect = (item) => {
    setSearchTerm(item.symbol_fa); // Set the selected symbol as search term
    setUaInstrumentId(item.instrument_id);
    onFilterChange(item.instrument_id); // Send the instrument_id to parent
    setIsDropdownDisabled(true); // Disable dropdown after selection
  };

  return (
    <div className="my-3 mr-6 text-right">
      <input
        type="text"
        placeholder="...جستجوی نماد"
        value={searchTerm}
        onChange={handleSearchChange}
        className="px-4 py-2 border rounded-md text-right"
      />

      {/* Show dropdown only if there are filtered symbols and dropdown is not disabled */}
      {searchTerm.trim() !== '' && filteredSymbols.length > 0 && !isDropdownDisabled && (
        <div
          className="mt-2 border border-gray-300 rounded-md max-h-40 overflow-y-auto"
          style={{ maxHeight: '200px' }} // Optional: Customize the max height of the dropdown
        >
          {filteredSymbols.map((item) => (
            <div
              key={item.instrument_id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSymbolSelect(item)} // Handle selection
            >
              {item.symbol_fa}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter09;
