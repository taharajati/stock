import React from 'react';



    const DataFilter = ({  intradata, filterValues, columns, parseDate }) => {
        console.log('filterValues', filterValues);
        
        const filteredData = intradata.filter((item) => {
            // Check filter01
            if (filterValues.filter01 && item.ua_instrument_id.toString().toLowerCase() !== filterValues.filter01.toString().toLowerCase()) {
                console.log(`ua_instrument_id Filter: ${item.ua_instrument_id} !== ${filterValues.filter01}`);
                return false;
            }
    
            // Check filter02
            if (filterValues.filter02 && item.option_status.toLowerCase() !== filterValues.filter02.toLowerCase()) {
                console.log(`Filter02: ${item.option_status} !== ${filterValues.filter02}`);
                return false;
            }
    
            // Check option type filter (filter04)
            if (filterValues.filter04 && !item.option_type.toLowerCase().includes(filterValues.filter04.toLowerCase())) {
                console.log(`Option type Filter: ${item.option_type} does not include ${filterValues.filter04}`);
                return false;
            }
    
            // Check due date filter
            if (filterValues.dueDate && item.end_date_fa_month !== filterValues.dueDate) {
                return false;
            }
    
            // Check the volume filter (filter07)
            if (filterValues.filter07 && item.volume <= 0) {
                return false;
            }
    
            // Check filter08 for instrument_id matching (bypass if empty)
            if (Array.isArray(filterValues.filter08) && filterValues.filter08.length > 0) {
                const isInstrumentIdMatch = filterValues.filter08.some(filterValue =>
                    item.instrument_id.toString().toLowerCase() === filterValue.toString().toLowerCase()
                );
    
                if (!isInstrumentIdMatch) {
                    console.log(`instrument_id Filter: ${item.instrument_id} is not in filter08`);
                    return false;
                }
            }
    
              // Check filter09 for symbol_fa matching
        if (filterValues.filter09 && item.instrument_id.toLowerCase() !== filterValues.filter09.toLowerCase()) {
            console.log(`symbol_fa Filter: ${item.instrument_id} !== ${filterValues.filter09}`);
            return false;
        }
            return true; // Include this item if all filters pass
        });

    return filteredData;
};

export default DataFilter;
