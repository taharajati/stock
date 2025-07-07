        // MyTable.js

        import React, { useEffect, useState } from 'react';
        import axios from 'axios';
        import { IoIosAddCircle } from "react-icons/io";
        import { IoMdClose } from "react-icons/io"; // Icon for delete button
        import { TableSkeleton } from '../../../common/SkeletonLoader';

        import DataFilter from './DataFilter';
        import MyChart from '../../charts/MyChart';
        import Modal from './Modal';
        import SortableTableHeader from './SortableTableHeader';
        import DetailPopup from '../../option_detail/option_detail';
        import { FaChartLine } from "react-icons/fa6";
        import { IoMdCalculator } from "react-icons/io";
        import { CgDetailsMore} from "react-icons/cg";

        const MyTable = ({ filterValues }) => {

        const OpenTSE = (instrumentCode) => {
            const url = `https://tsetmc.ir/instInfo/${instrumentCode}`; // Replace with your specific URL pattern
            window.open(url, '_blank'); // Opens the URL in a new tab
            };


            const [showPopup, setShowPopup] = useState(false);

        const togglePopup = () => {
            setShowPopup(!showPopup);
        };
            const [intradata, setIntradata] = useState();
            const [data, setData] = useState();
            const [selectedGroup, setSelectedGroup] = useState('summary');
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState(null);
            const [columns, setColumns] = useState([]);
            const [validGroups, setValidGroups] = useState([]);
            const [showChart, setShowChart] = useState(false);
            const [chartData, setChartData] = useState(null);
            const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
            const [selectedInstrumentId, setSelectedInstrumentId] = useState(null);
            const [sortCriteria, setSortCriteria] = useState('');
            const [sortOrder, setSortOrder] = useState('asc');
            const [calculatorVisible, setCalculatorVisible] = useState(false);
            const [detailVisible, setDetailVisible] = useState(false);


            const [screenerData, setScreenerData] = useState([]); // State for screener data
            const [selectedWatchlist, setSelectedWatchlist] = useState('');
    const [openDropdown, setOpenDropdown] = useState({}); // To manage dropdown visibility per row+

        

            const columnStyles = {
            symbol_fa: { style: { textAlign: 'center', padding: '8px' } },
            a_factor: { style: { textAlign: 'center', padding: '8px' } },
            b_factor: { style: { textAlign: 'center', padding: '8px' } },
            c_factor: { style: { textAlign: 'center', padding: '8px' } },
            contract_size: { style: { textAlign: 'center', padding: '8px' } },
            today_return: { style: { textAlign: 'center', padding: '8px' } },
            strike_price_ua_price_difference: { style: { textAlign: 'center', padding: '8px' } },
            required_change_per_day: { style: { textAlign: 'center', padding: '8px' } },
            ua_final: { style: { textAlign: 'center', padding: '8px' } },
            ua_close: { style: { textAlign: 'center', padding: '8px' } },
            strike_price: { style: { textAlign: 'center', padding: '8px' } },
            end_date_fa: { style: { textAlign: 'center', padding: '8px' } },
            leverage: { style: { textAlign: 'center', padding: '8px' } },
            days_to_maturity: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_sell_price: { style: { textAlign: 'center', padding: '8px' } },
            ua_instrument_symbol_fa: { style: { textAlign: 'center', padding: '8px' } },
            days_to_maturity_business_days: { style: { textAlign: 'center', padding: '8px' } },
            begin_date: { style: { textAlign: 'center', padding: '8px' } },
            end_date: { style: { textAlign: 'center', padding: '8px' } },
            industry_code: { style: { textAlign: 'center', padding: '8px' } },
            industry_name: { style: { textAlign: 'center', padding: '8px' } },
            instrument_code: { style: { textAlign: 'center', padding: '8px' } },
            instrument_id: { style: { textAlign: 'center', padding: '8px' } },
            average_spread: { style: { textAlign: 'center', padding: '8px' } },
            average_spread_percent_of_mid_price: { style: { textAlign: 'center', padding: '8px' } },
            bid_ask_spread_percent: { style: { textAlign: 'center', padding: '8px' } },
            bid_ask_spread_score: { style: { textAlign: 'center', padding: '8px' } },
            bs_price_to_buy_price: { style: { textAlign: 'center', padding: '8px' } },
            bs_price_to_sell_price: { style: { textAlign: 'center', padding: '8px' } },
            buy_positions: { style: { textAlign: 'center', padding: '8px' } },
            buy_price: { style: { textAlign: 'center', padding: '8px' } },
            close: { style: { textAlign: 'center', padding: '8px' } },
            final: { style: { textAlign: 'center', padding: '8px' } },
            high: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_last: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_max_all: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_max_month: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_mean_month: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_min_all: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_min_month: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_rank: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_to_average_month: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_to_same_ua_implied_volatility_percent: { style: { textAlign: 'center', padding: '8px' } },
            implied_volatility_vs_realized_volatility_month: { style: { textAlign: 'center', padding: '8px' } },
            intrinsic_value_bs: { style: { textAlign: 'center', padding: '8px' } },
            is_tab: { style: { textAlign: 'center', padding: '8px' } },
            liquidity_score: { style: { textAlign: 'center', padding: '8px' } },
            low: { style: { textAlign: 'center', padding: '8px' } },
            open: { style: { textAlign: 'center', padding: '8px' } },
            notional_value: { style: { textAlign: 'center', padding: '8px' } },
            old: { style: { textAlign: 'center', padding: '8px' } },
            open_interest_score: { style: { textAlign: 'center', padding: '8px' } },
            option_status: { style: { textAlign: 'center', padding: '8px' } },
            option_type: { style: { textAlign: 'center', padding: '8px' } },
            option_type_fa: { style: { textAlign: 'center', padding: '8px' } },
            probability_of_profit: { style: { textAlign: 'center', padding: '8px' } },
            put_call_ratio: { style: { textAlign: 'center', padding: '8px' } },
            rho: { style: { textAlign: 'center', padding: '8px' } },
            theta: { style: { textAlign: 'center', padding: '8px' } },
            delta: { style: { textAlign: 'center', padding: '8px' } },
            gamma: { style: { textAlign: 'center', padding: '8px' } },
            vega: { style: { textAlign: 'center', padding: '8px' } },
            same_ua_average_implied_volatility: { style: { textAlign: 'center', padding: '8px' } },
            sell_positions: { style: { textAlign: 'center', padding: '8px' } },
            sell_price: { style: { textAlign: 'center', padding: '8px' } },
            trades_count: { style: { textAlign: 'center', padding: '8px' } },
            ua_instrument_code: { style: { textAlign: 'center', padding: '8px' } },
            ua_instrument_id: { style: { textAlign: 'center', padding: '8px' } },
            ua_instrument_symbol_fa: { style: { textAlign: 'center', padding: '8px' } },
            ua_volatility_day: { style: { textAlign: 'center', padding: '8px' } },
            ua_volatility_week: { style: { textAlign: 'center', padding: '8px' } },
            ua_volatility_year: { style: { textAlign: 'center', padding: '8px' } },
            ua_volume: { style: { textAlign: 'center', padding: '8px' } },
            ua_volume_count: { style: { textAlign: 'center', padding: '8px' } },
            volatility_skew_horizontal: { style: { textAlign: 'center', padding: '8px' } },
            volatility_skew_horizontal_value: { style: { textAlign: 'center', padding: '8px' } },
            volatility_skew_vertical: { style: { textAlign: 'center', padding: '8px' } },
            volatility_skew_vertical_value: { style: { textAlign: 'center', padding: '8px' } },
            volume: { style: { textAlign: 'center', padding: '8px' } },
            volume_count: { style: { textAlign: 'center', padding: '8px' } },
            volume_score: { style: { textAlign: 'center', padding: '8px' } },
        };

            const getCellStyle = (columnName, value) => {
                let baseStyle = columnStyles[columnName]?.style || {};

                // Example conditional styling logic
                if (columnName === 'delta' && value < 0) {
                    return { ...baseStyle, backgroundColor: 'red' };
                } else if (columnName === 'delta' && value >= 0) {
                    return { ...baseStyle, color: 'lightgreen' };
                } else if (columnName === 'bs_price_to_buy_price' && value >= 0) {
                    return { ...baseStyle, color: 'rgb(102,43,50)' ,backgroundColor:'rgb(196,132,146)'};
                } else if (columnName === 'bs_price_to_buy_price' && value < 0) {
                    return { ...baseStyle, color: 'rgb(40,102,50)' ,backgroundColor:'rgb(163,240,173)' };
                } else if (columnName === 'bs_price_to_sell_price' && value >= 0) {
                    return { ...baseStyle, color: 'rgb(34, 139, 34)' ,backgroundColor:'rgb(144, 238, 144)'};
                } else if (columnName === 'bs_price_to_sell_price' && value < 0) {
                    return { ...baseStyle, color: 'rgb(139, 0, 0)' ,backgroundColor:'rgb(255, 99, 71)' };
                }  else if (columnName === 'today_return' && value >=0) {
                    return { ...baseStyle, color: 'rgb(20,180,20)',fontWeight:'bold'}; //,backgroundColor:'rgb(163,240,173)'

                }  else if (columnName === 'today_return' && value < 0) {
                    return { ...baseStyle, color: 'rgb(180,20,50)', fontWeight:'bold'}; //,backgroundColor:'rgb(196,132,146)'
                    }
                else if (columnName === 'bid_ask_spread_percent' && value >=0) {
                    return { ...baseStyle, color: 'rgb(20,180,20)',fontWeight:'bold' //,backgroundColor:'rgb(163,240,173)'
                    }
                }  else if (columnName === 'bid_ask_spread_percent' && value < 0) {
                    return { ...baseStyle, color: 'rgb(180,20,50)', fontWeight:'bold' //,backgroundColor:'rgb(196,132,146)'
                    };
                }else if (columnName === 'option_status' && value ==='ITM') {
                    return { ...baseStyle, color: 'rgb(40,102,50)' ,backgroundColor:'rgb(163,240,173)'
                    };
                }else if (columnName === 'option_status' && value ==='OTM') {
                    return { ...baseStyle, color: 'rgb(102,43,50)' ,backgroundColor:'rgb(196,132,146)'
                    };
                }
                else if (columnName === 'option_status' && value ==='ATM') {
                    return { ...baseStyle, color: 'rgb(150,150,150)' ,backgroundColor:'rgb(100,100,100)'
                    };
                }


                return baseStyle; // Return the base style if no condition matches
            };

            useEffect(() => {
                fetchScreenerData(); // Call the function inside useEffect
            }, []);
            
            // Define fetchScreenerData outside of useEffect
            const fetchScreenerData = async () => {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                  console.error('No access token found');
                  return;
                }
                try {
                    const response = await axios.get('https://api.optionscreener.ir/api/user_screener/', {
                        headers: {
                            'accept': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setScreenerData(response.data.data); // Set the fetched screener data
                } catch (error) {
                    console.error('Error fetching screener data:', error);
                }
            };
            
            const handleAddToWatchlist = async (instrument_id, screener_id) => {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                  console.error('No access token found');
                  return;
                }
                try {
                    const response = await fetch('https://api.optionscreener.ir/api/user_screener/instrument', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`

                        },
                        body: JSON.stringify({ instrument_id, screener_id })
                    });
                    const result = await response.json();
                    console.log('Response:', result);
                    
                    toggleDropdown(); 
                    fetchScreenerData(); // Refetch watchpoints after adding
                } catch (error) {
                    console.error('Error adding to watchlist:', error);
                }
            };

            const handleRemoveFromFilter = async ( instrument_id,screener_id) => {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    console.error('No access token found');
                    return;
                }
                try {
                    const response = await fetch(`https://api.optionscreener.ir/api/user_screener/instrument`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({ instrument_id, screener_id })
                    });
            
                    if (response.ok) {
                        const result = await response.json();
                        console.log('Response:', result);
            
                        // Optional: Update UI or refetch data after successful removal
                        fetchScreenerData(); // Refetch watchpoints after deletion
                    } else {
                        console.error('Failed to remove from watchlist');
                    }
                } catch (error) {
                    console.error('Error removing from watchlist:', error);
                }
            };
            
            const toggleDropdown = (id) => {
                // Close all other dropdowns except the one being clicked
                setOpenDropdown((prev) => ({ [id]: !prev[id] }));
            };
            
            const handlePostRequest = async (selectedRowData) => {
            try {
                const postData = {
                    stock: [],
                    options: [
                        {
                            option_type: selectedRowData.option_type,
                            premium: selectedRowData.buy_price,
                            strike_price: selectedRowData.strike_price,
                            position: 'buyer',
                        },
                    ],
                };

                const postResponse = await fetch(`https://api.optionscreener.ir/api/options/chart`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(postData),
                });

                if (!postResponse.ok) {
                    throw new Error(`HTTP error! Status: ${postResponse.status}`);
                }

                const responseData = await postResponse.json();
                console.log('POST Response:', responseData);

                // Update chart data state
                setChartData({
                    data: responseData.data,
                    annotations: responseData.annotations,
                    width: responseData.width,
                    height: responseData.height,
                });

                // Open chart modal
                setShowChart(true);
            } catch (error) {
                console.error('Error in POST request:', error);
            }
        };

        useEffect(() => {
            console.log('Data loaded:', intradata, data);
        
            const fetchData = async () => {
                try {
                    // Fetch intradatacols data
                    const intradatacolsResponse = await fetch('https://api.optionscreener.ir/api/options/intradatacols');
                    if (!intradatacolsResponse.ok) {
                        throw new Error(`HTTP error! Status: ${intradatacolsResponse.status}`);
                    }
                    const intradatacolsData = await intradatacolsResponse.json();
        
                    // Update data only if fetch is successful
                    setData(intradatacolsData);
                    const groups = Object.keys(intradatacolsData.groups);
                    setValidGroups(groups);
        
                    const initialColumns = intradatacolsData.groupscolumn[selectedGroup] || [];
                    setColumns(initialColumns);
        
                    if (!groups.includes(selectedGroup)) {
                        console.error(`Invalid selectedGroup: ${selectedGroup}`);
                        return;
                    }
        
                    // Fetch intradata data
                    const intradataResponse = await fetch('https://api.optionscreener.ir/api/options/intradata');
                    if (!intradataResponse.ok) {
                        throw new Error(`HTTP error! Status: ${intradataResponse.status}`);
                    }
                    const intradataData = await intradataResponse.json();
        
                    // Update intradata only if fetch is successful
                    setIntradata(intradataData.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    // Do nothing to keep the last successful data
                } finally {
                    setLoading(false);
                }
            };
        
            // Initial fetch
            fetchData();
        
            // Set up interval for data refresh every 15 seconds
            const intervalId = setInterval(fetchData, 15000);
        
            // Clear the interval on component unmount
            return () => clearInterval(intervalId);
        }, [selectedGroup, filterValues.filter04]);
        

        if (loading) {
            return null;
        }
        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!intradata || !data || !data.groups || !data.groupscolumn) {
            return <div>No data available</div>;
        }

        const formatNumberWithSeparator = (number) => {
            if (number === null || number === undefined) {
                return ''; // Return an empty string or a placeholder if number is null or undefined
            }

            // Ensure that the number is indeed a number type
            const numericValue = Number(number);
            if (isNaN(numericValue)) {
                return ''; // Return an empty string or a placeholder if it's not a valid number
            }

            // Convert the number to a string with separators based on the locale
            const formattedNumber = numericValue.toLocaleString();

            // If the number is negative, ensure the minus sign is at the front
            if (numericValue < 0) {
                return `-${formattedNumber.replace('-', '')}`;
            }

            return formattedNumber;
        };


        // Filter data where volume > 1
        const filteredData = DataFilter({
            intradata,
            filterValues,
            columns,
        }).filter(item => item.volume >= 0)
          .filter(item => item.sell_price > 0 || item.buy_price > 0) 
          
          console.log('filteredData',filteredData)


        const sortData = (data, criteria, order) => {
            return data.sort((a, b) => {
                const valueA = typeof a[criteria] === 'number' ? a[criteria] : a[criteria]?.toLowerCase();
                const valueB = typeof b[criteria] === 'number' ? b[criteria] : b[criteria]?.toLowerCase();

                if (order === 'asc') {
                    return valueA > valueB ? 1 : -1;
                } else {
                    return valueA < valueB ? 1 : -1;
                }
            });
        };

        const handleSort = (criteria) => {
            if (sortCriteria === criteria) {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            } else {
                setSortCriteria(criteria);
                setSortOrder('asc');
            }
        };
      const handleRowClick = (instrumentId) => {
    console.log('Row clicked, instrumentId:', instrumentId);
    setSelectedInstrumentId(instrumentId);
    setDetailVisible(true); // Show the DetailPopup



        
        };


        const handleGroupSelect = (groupKey) => {
            setSelectedGroup(groupKey);
            setShowChart(false); // Hide the chart when selecting a group
        };

        const handleShowChart = () => {
            setShowChart(true);
            setChartData(filteredData); // Set the filtered data for the chart
            setSelectedGroup(null); // Clear the selected group when showing the chart
        };

       
        return (
            <div className=" mx-auto p-4  " dir="rtl">
                <div className="flex items-center justify-between mb-3 ">
                <div className="flex space-x-4">
                {/* Group Selection Buttons */}
            {data.groups && Object.keys(data.groups).map((groupKey) => (
            <button
                key={groupKey}
                type="button"
                className={`px-4 py-2 rounded-lg font-bold border transition duration-300 ${selectedGroup === groupKey ? 'bg-gold text-navy border-gold scale-105' : 'bg-navy text-gold border-navy hover:bg-gold hover:text-navy hover:border-gold'}`}
                onClick={() => handleGroupSelect(groupKey)}
            >
                {data.groups[groupKey] || 'Unknown Group'}
            </button>
        ))}

                {/* Button to show the chart */}
                <button
                    type="button"
                    className={`px-4 py-2  ${showChart ? 'bg-white text-[color:var(--color-bg-variant)] border-b-4 border-[color:var(--color-bg-variant)]' : 'bg-white text-gray-400 border-b-4 border-gray-300'}`}
                    onClick={handleShowChart}
                >
                    نمودار
                </button>

        </div>
    
                </div>

            <div className="overflow-x-auto bg-navy shadow-lg rounded-lg border border-gold">
                    <div className="table-container overflow-x-auto" onMouseLeave={() => setHoveredRowIndex(null)}>

                        {loading ? (
                            <div className="p-8">
                                <TableSkeleton rows={8} columns={6} />
                            </div>
                        ) : showChart ? (
                    <MyChart data={chartData} /> // Render the chart component
                ) : (
                <table className="min-w-full table-fixed border-collapse border border-gray-300">
                <thead className="bg-[color:var(--color-primary)] text-white sticky top-0 z-2">
                                <tr>
                                    <th></th>
                                    <th></th>
                                    {columns.map((column, index) => (
                                        <SortableTableHeader
                                            key={index}
                                            column={{ fieldName: column, farsiName: data.fields[column] }}
                                            criteria={sortCriteria}
                                            order={sortOrder}
                                            onSort={handleSort}
                                        />
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-[#F4F2F2] ">
                                  {sortData(filteredData, sortCriteria, sortOrder).map((item, itemIndex) => (
                                  <tr
                                  key={itemIndex}
                                  className={itemIndex % 2 === 0 ? 'bg-gray-100 ' : 'bg-white '}
                                  onMouseEnter={() => setHoveredRowIndex(itemIndex)}
                                  >


            {/* Render other columns if no icons are displayed */}
            <td className="py-2 gap-4  px-4 flex items-center space-x-2 mx-3 border-b border-gold text-gold" colSpan="4">
                    <span
                    className="cursor-pointer text-4xl text-gold hover:text-navy"
                    onClick={() => setDetailVisible(true)}
                    >
                        <CgDetailsMore
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRowClick(item.instrument_id);
                                                    }}
                                                    className="w-5 h-5 text-gold hover:text-navy cursor-pointer"
                                                />

                    </span>
             </td>
             <td>
    {filterValues.filter08.length > 0 && filterValues.filter08.includes(item.instrument_id) ? (
        <div className="flex items-center justify-center">
            {/* Assuming you want to show the delete button for the first screener */}
            {screenerData.length > 0 && (
                <button
                    key={screenerData[0]._id.$oid} // Use the first screener as an example
                    className="text-gold hover:text-navy"
                    onClick={() => handleRemoveFromFilter(item.instrument_id, screenerData[0]._id.$oid)} // Pass instrument_id and first screener_id
                >
                    <IoMdClose size={24} /> {/* Delete icon */}
                </button>
            )}
       
        </div>
    ) : (
        <div className="relative inline-block text-left">
            <button
                type="button"
                onClick={() => toggleDropdown(item._id.$oid)} // Toggle dropdown with the item's ID
                className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-bold text-gold bg-navy border border-gold hover:bg-gold hover:text-navy focus:outline-none"
                aria-haspopup="true"
                aria-expanded={openDropdown[item._id.$oid] ? "true" : "false"}
            >
                <IoIosAddCircle className="text-gold scale-125" />
            </button>

            {openDropdown[item._id.$oid] && (
                <div className="absolute right-0 z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {screenerData.map((screener) => (
                            <button
                                key={screener._id.$oid}
                                onClick={() => {
                                    handleAddToWatchlist(item.instrument_id, screener._id.$oid);
                                }}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {screener.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )}
</td>



            {//hoveredRowIndex !== itemIndex &&
                columns.map((column, columnIndex) => (

                <td key={columnIndex}
                className={`py-2 px-4 ${
                    hoveredRowIndex === itemIndex ? 'font-bold' : ''
                }`}
                style={{...getCellStyle(column, item[column]),whiteSpace: 'nowrap' }} dir="ltr">
                    {item[column] instanceof Date
                        ? item[column].toLocaleDateString()
                        : typeof item[column] === 'number'
                        ? column === 'today_return' || column === 'bid_ask_spread_percent'
                        ? `${formatNumberWithSeparator(item[column])} %`  // Add "%" for specific columns
                        : formatNumberWithSeparator(item[column])
                        : item[column]}

                </td>
                ))}
            </tr>
            ))}
        </tbody>
                        </table>
                        )}
                    </div>
                </div>

                {showPopup && <Modal onClose={togglePopup} />}
        
                {calculatorVisible && <CalculatorPopup onClose={() => setCalculatorVisible(false)} />}
                {detailVisible && (
                        <DetailPopup
                            instrumentId={selectedInstrumentId}
                            onClose={() => setDetailVisible(false)}
                        />
                    )}      </div>
        );
        };

        export default MyTable;