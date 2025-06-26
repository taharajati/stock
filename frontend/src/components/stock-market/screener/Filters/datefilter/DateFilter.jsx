import React, { useState, useEffect } from 'react';

// Function to fetch intradata from the API
const fetchIntradata = async () => {
  try {
    const response = await fetch('https://api.optionscreener.ir/api/options/intradata'); // Replace with your actual endpoint
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.data; // Assuming the API returns an object with a 'data' array
  } catch (error) {
    console.error('Error fetching intradata:', error);
    return []; // Return an empty array in case of an error
  }
};

const DateFilter = ({ onFilterChange }) => {
  const [dueDateOptions, setDueDateOptions] = useState([]);
  const [selectedDueDate, setSelectedDueDate] = useState('');

  // Fetch unique end_date_fa_month values from intradata
  useEffect(() => {
    const fetchDueDateOptions = async () => {
      try {
        const intradata = await fetchIntradata();

        // Filter and extract unique end_date_fa_month values
        const uniqueDays = Array.from(
          new Set(
            intradata
              .filter(item => item.end_date_fa_month) // Include only items with a valid end_date_fa_month
              .map(item => item.end_date_fa_month)
          )
        );

        setDueDateOptions(uniqueDays);
      } catch (error) {
        console.error('Error fetching due date options:', error);
      }
    };

    fetchDueDateOptions();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDueDate(prevSelectedDueDate => {
      const newSelectedDate = prevSelectedDueDate === date ? '' : date; // Toggle selection
      onFilterChange({ dueDate: newSelectedDate }); // Pass the updated selection to the parent
      return newSelectedDate; // Update state
    });
  };

  return (
    <div className='flex float-end mr-6'>
      <div className='flex items-center mb-4'>
        {dueDateOptions.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(date)}
            className={`text-sm px-2 py-1 border-b-2 ${
              selectedDueDate === date
                ? 'font-bold text-[color:var(--color-bg-variant)] border-[color:var(--color-text)]'
                : 'text-gray-400 border-transparent'
            }`}
          >
            {date}
          </button>
        ))}
        <span className="my-1 text-right float-right ms-3 mr-[56px]"></span>
        <label className='ml-2'> تاریخ سررسید</label>
      </div>
    </div>
  );
};

export default DateFilter;
