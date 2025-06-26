import React, { useState } from 'react';
import MyTable from './mainTable/MyTable';
import Filter01 from './Filters/Filter01/Filter01';
import Filter02 from './Filters/Filter02/Filter02';
import Filter04 from './Filters/Filter04/Filter04';
import DateFilter from './Filters/datefilter/DateFilter';
import Filter06 from './Filters/Filter06/Filter06';
import Filter07 from './Filters/Filter07/Filter07'; // Import Filter07
import Filter08 from './pdidban/Filter08'; // Import Filter07
import Filter09 from './Filters/Filter09/Filter09'; // Import Filter09


const Dashboard = () => {
    const [filterValues, setFilterValues] = useState({
        filter01: '',
        filter02: '',
        dueDate: '', // Updated to include dueDate
        filter04: '',
        filter06: 1,
        filter07: true, // Add state for Filter07 (checkbox)
        filter08: [], // Change to an array to hold multiple instruments
        filter09: '', // Add filter09 to the state

    });

    const [dropdownOpen, setDropdownOpen] = useState(true); // Dropdown state
    const [selectedInstrumentId, setSelectedInstrumentId] = useState('');


    const handleFilter02Change = (value) => {
        setFilterValues({ ...filterValues, filter02: value });
    };

    const handleDateFilterChange = (dateFilterValues) => {
        setFilterValues({ ...filterValues, ...dateFilterValues });
    };

    const handleFilter04Change = (optionType) => {
        setFilterValues({ ...filterValues, filter04: optionType });
        console.log('Filter04 Value:', optionType);
    };

    const handleFilter06Change = (value) => {
        setFilterValues({ ...filterValues, filter06: value });
    };

    const handleFilter07Change = (value) => {
        setFilterValues({ ...filterValues, filter07: value });
    };

    const handleFilter08Change = (values) => {
        // Clear filter08 when no instruments are selected
        setFilterValues({ ...filterValues, filter08: values.length === 0 ? [] : values });
    };

    const handleFilter09Change = (value) => { // Handler for filter09
        setFilterValues({ ...filterValues, filter09: value });
    };

    
console.log('filterValues',filterValues)

    return (
        <>
            <div className=''>
                <div className='float-right mx-6 rounded-lg scale-105 text-black p-3'>
                    {dropdownOpen && (
                        <div className="filter-dropdown mt-12 mb-12 border-r-4 border-gray-500">
                            <Filter01 setFilterValue={(value) => setFilterValues({ ...filterValues, filter01: value })} />
                            <Filter04 onFilterChange={handleFilter04Change} />

                            <DateFilter onFilterChange={handleDateFilterChange} />  


 <div className="filter-dropdown mt-[58px] ">

 <Filter07 value={filterValues.filter07} onFilterChange={handleFilter07Change} />

                </div>
                            <Filter02 onFilterChange={handleFilter02Change} />
          
                         
                        </div>
                    )}
              
                    
                        <div className="filter-dropdown mt-12 border-r-4 border-gray-500">

                        <Filter08 setFilterValue={handleFilter08Change} /> {/* Use the new handler */}

                </div>
                <div className="filter-dropdown mt-12 border-r-4 border-gray-500">
                        <Filter09 value={filterValues.filter09} onFilterChange={handleFilter09Change} /> {/* Use the new handler for filter09 */}
                    </div>
                </div>

                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

                <div className='float-end mt-6 border-r-4 border-gray-500 mr-4'>
                <MyTable instrumentId={selectedInstrumentId} filterValues={filterValues} />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
