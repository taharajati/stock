import React, { useEffect, useState } from 'react';
import 'chartjs-plugin-annotation';  // Ensure to import the plugin

import Select from 'react-select';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';

import OptionSidebar from '../nav/OptionSidebar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
  

const Calculation = () => {
  const [strategies, setStrategies] = useState([]);
  const [strategyList, setStrategyList] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [editableData, setEditableData] = useState([]);
  const [strategyDetails, setStrategyDetails] = useState(null);
  const [intraData, setIntraData] = useState([]);
  const [selectedKind, setSelectedKind] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const [selectedEndDates, setSelectedEndDates] = useState([]); // Store selected end dates

  const [selectedSymbol, setSelectedSymbol] = useState([]);
  const [groupSymbols, setGroupSymbols] = useState({}); // Stores symbols for each instrument group
  const [sigma, setSigma] = useState(0.3); // Default sigma value
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [multiplier, setMultiplier] = useState(1); // default to 1 to avoid multiplying by 0


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before the fetch
      try {
        // Fetch strategy details
        const strategyResponse = await fetch('https://api.optionscreener.ir/api/strategies/');
        const strategiesData = await strategyResponse.json();
        setStrategies(strategiesData);

        // Fetch strategy names
        const strategyListResponse = await fetch('https://api.optionscreener.ir/api/strategies/strategies_list');
        const strategyListData = await strategyListResponse.json();
        setStrategyList(Array.isArray(strategyListData) ? strategyListData : []);

        // Fetch instrument list
        const instrumentsResponse = await fetch('https://api.optionscreener.ir/api/options/uainstruments');
        const instrumentsData = await instrumentsResponse.json();
        setInstruments(instrumentsData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchData();
  }, []);

  const handleInstrumentChange = (event) => {
    const selected = instruments.find(instrument => instrument.ua_instrument_id === event.target.value);
    setSelectedInstrument(selected);

    if (editableData.length > 0 && selected) {
      const updatedData = [...editableData];
      updatedData[0].assetType = selected.ua_instrument_symbol_fa;
      setEditableData(updatedData);
    }
  };


  
  const handleStrategyChange = (event) => {
    const selectedStrategyName = event.target.value;
    const selected = strategies[selectedStrategyName];
  
    setSelectedStrategy(selectedStrategyName);
  
    if (selected) {
      const updatedInstruments = selected.instruments.map((instrument) => {
        // Check if the asset type is "stock"
        if (instrument.asset_type === 'stock') {
          const stockData = intraData.find(item => item.ua_instrument_id === selectedInstrument.ua_instrument_id);
          // If stockData is found, update the price with the ua_close value, else set as 'N/A'
          instrument.price = stockData ? stockData.ua_close : 'N/A';
        }
        return instrument;
      });
      setEditableData(updatedInstruments);
      setStrategyDetails(selected);
    } else {
      setEditableData([]);
      setStrategyDetails(null);
    }
  };
  

  const handleFieldChange = (index, field, value) => {
    const updatedData = [...editableData];
    updatedData[index][field] = value;
  
    // Check if the field being changed is 'symbol'
    if (field === 'symbol') {
      const selectedSymbol = value;
      const symbolData = intraData.find(item => item.symbol_fa === selectedSymbol);
  
      if (symbolData) {
        // If action is 'sell' and sell_price is 0, or action is 'buy' and buy_price is 0, show the symbol
        if ((updatedData[index].action === 'sell' && symbolData.sell_price === 0) || 
            (updatedData[index].action === 'buy' && symbolData.buy_price === 0)) {
          updatedData[index].price = 'N/A';  // Or set any default value if needed
          // Optionally, you can highlight or mark the symbol here, e.g., display a message
          console.log(`Symbol ${selectedSymbol} meets condition: ${updatedData[index].action} action and price is 0.`);
        } else {
          updatedData[index].price = symbolData.sell_price || symbolData.buy_price || 'N/A'; // Update with the appropriate price
        }
      } else {
        updatedData[index].price = 'N/A'; // If no matching symbol found, set price to 'N/A'
      }
    }
  
    // Handle 'action' or 'endDate' changes
    else if (field === 'action' || field === 'endDate') {
      const selectedIntraData = intraData.find(item => item.end_date_fa === updatedData[index].endDate);
      if (selectedIntraData) {
        updatedData[index].price = updatedData[index].action === 'sell'
          ? selectedIntraData.sell_price || 'N/A'
          : selectedIntraData.buy_price || 'N/A';
      } else {
        updatedData[index].price = 'N/A';
      }
    }
  
    setEditableData(updatedData);
  };
  

  useEffect(() => {
    if (selectedInstrument) {
      const fetchIntraData = async () => {
        setLoading(true); // Set loading to true before the fetch
        try {
          const response = await fetch(`https://api.optionscreener.ir/api/options/intradata?ua_instrument_id=${selectedInstrument.ua_instrument_id}`);
          const data = await response.json();
          setIntraData(data.data);
        } catch (error) {
          console.error('Error fetching intra data:', error);
        } finally {
          setLoading(false); // Set loading to false after the fetch is complete
        }
      };

      fetchIntraData();
    }
  }, [selectedInstrument]);

  const handleEndDateChange = (index, value) => {
    // Update the selected end date for the specific index
    const updatedEndDates = [...selectedEndDates];
    updatedEndDates[index] = value;
    setSelectedEndDates(updatedEndDates);
  
    // Update the symbols based on the selected end date
    updateSymbolsBasedOnEndDate(index, value);
  
    // Handle editable data update
    handleFieldChange(index, 'endDate', value);
  };
  
  const updateSymbolsBasedOnEndDate = (index, endDate) => {
    // Filter the intraData to only include items with the selected end date
    const filteredItems = intraData.filter(item => item.end_date_fa === endDate);
  
    if (filteredItems.length > 0) {
      const symbols = filteredItems.map(item => item.symbol_fa);
      
      // Update group symbols to only include matching symbols for this index
      setGroupSymbols(prevSymbols => ({
        ...prevSymbols,
        [index]: symbols,
      }));
  
      // Update editableData for this index to only include the first symbol
      const updatedEditableData = [...editableData];
      updatedEditableData[index].symbol = symbols[0] || ''; // Set the first symbol or an empty string if none
      setEditableData(updatedEditableData);
    } else {
      // If no items match the selected end date, clear the symbols and editable data
      setGroupSymbols(prevSymbols => ({
        ...prevSymbols,
        [index]: [],
      }));
  
      const updatedEditableData = [...editableData];
      updatedEditableData[index].symbol = ''; // Clear the symbol field
      setEditableData(updatedEditableData);
    }
  };
  



  // Function to get unique end dates
  const getUniqueEndDates = (data) => {
    const uniqueDates = [...new Set(data.map(item => item.end_date_fa))];
    return uniqueDates;
  };

  // POST request handler
  const handleCalculate = async () => {
    if (!editableData || !Array.isArray(editableData)) {
        console.error('editableData is not valid:', editableData);
        return;
    }

    // Format the strategy data based on 'editableData'
    const formattedStrategy = editableData.map(item => {
        // Handling the 'stock' type
        if (item?.asset_type === 'stock') {
            return {
                type: 'stock',
                n: item.n ?? 0,
                action: item.action ?? 'buy',
                price: item.price ?? 0,
            };
        }
        // Handling the 'option' type (call or put)
        
        else if (item?.asset_type === 'option') {
          const strikeData = intraData.find((data) => data.symbol_fa === item.symbol);
      
          // Check if strikeData exists
          if (!strikeData) {
              console.error(`No strike data found for symbol: ${item.symbol}`);
              alert('لطفا یک گزینه را انتخاب کنید.');
              return null; // or handle the error accordingly
          }
      
          return {
              type: item.kind === 'call' ? 'call' : 'put',
              n: item.n ?? 0,
              premium: item.price,
              action: item.action ?? 'buy',
              strike: strikeData.strike_price,
              price: strikeData.ua_close,
          };
      }
        return null; // In case the asset_type is neither 'stock' nor 'option'
    }).filter(Boolean); // Remove null entries from the result

    // Prepare the payload to send to the API
    const requestData = {
        strategy: formattedStrategy,
        sigma, // Assuming 'sigma' is already defined somewhere in your component
    };

    console.log('Request payload:', requestData);

    setLoading(true);
    try {
        // Making the API call
        const response = await fetch('https://api.optionscreener.ir/api/strategies/calculator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
        });

        const data = await response.json();
        setResponse(data);
        console.log('Calculation result:', data);
    } catch (error) {
        console.error('Error during calculation:', error);
    } finally {
        setLoading(false);
    }
};
    
// Dynamically determine background colors based on the profit values
const colors = (response?.strategy_profit || []).map((value) =>
 value >= 0 ? 'rgba(75, 192, 192, 0.8)' : 'rgba(255, 99, 132, 0.8)'
);



const chartData = {
  labels: response?.stock_price_array || [], // X-axis: Stock prices
  datasets: [
    {
      label: 'Profit (Above Zero)',
      data: (response?.strategy_profit || []).map((profit) => (profit > 0 ? profit : 0)), // Fill only positive values
      backgroundColor: 'rgba(75, 192, 192, 0.5)', // Green fill
       pointBackgroundColor: colors, 
    pointBorderColor: colors, 
      fill: true, // Enable fill for positive profits
      tension: 0.3, // Smooth curve
    },
    {
      label: 'Loss (Below Zero)',
      data: (response?.strategy_profit || []).map((profit) => (profit < 0 ? profit : 0)), // Fill only negative values
      borderColor: 'rgba(255, 99, 132, 1)', // Red line
      backgroundColor: 'rgba(255, 99, 132, 0.5)', // Red fill
         pointBackgroundColor: colors, 
    pointBorderColor: colors, 
      fill: true, // Enable fill for negative losses
      tension: 0.3, // Smooth curve
    },
  ],
};



// Options to make scales larger and adjust line thickness
const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
    title: { display: true, text: 'Strategy Profit vs Stock Price' },
    annotation: { // Add annotation configuration
      annotations: {
        line0: {
          type: 'line',
          yMin: 0, // y position where the line will be drawn
          yMax: 0, // y position where the line will end
          borderColor: 'black', // Line color
          borderWidth: 2, // Line thickness
          borderDash: [5, 5], // Optional: add dashes to the line
          label: {
            content: 'Zero Line', // Label for the line
            enabled: true,
            position: 'center', // Position the label at the center of the line
            font: {
              size: 12, // Font size for the label
              
            },
            backgroundColor: 'rgba(255, 255, 255, 0.7)', // Label background color
          },
        },
      },
    },
  },
  scales: {
    x: {
      title: { 
        display: true, 
        text: 'Stock Price', 
        font: { size: 20 }, // Increase the font size for the X-axis title
        family: "Vazir-Medium",

      },
      ticks: {
        font: { size: 17 }, // Increase font size of X-axis labels
        family: "Vazir-Medium",

      },
    },
    y: {
      title: { 
        display: true, 
        text: 'Profit', 
        font: { size: 20 }, // Increase the font size for the Y-axis title
        family: "Vazir-Medium",

      },
      ticks: {
        font: { size: 17 }, // Increase font size of Y-axis labels
        family: "Vazir-Medium",

      },
    },
  },
};


    // Handler for multiplier input
    const handleMultiplierChange = (event) => {
      setMultiplier(Number(event.target.value));
  };

    // Function to calculate quantity based on multiplier
    const calculateQuantity = (n) => n * multiplier;


    // Helper function to map instrument data to dropdown options
const instrumentOptions = (Array.isArray(instruments) ? instruments : []).map(instrument => ({
  value: instrument.ua_instrument_id,
  label: instrument.ua_instrument_symbol_fa,
}));



  return (
    <div className="flex">
      <OptionSidebar />
      <div className="flex-1">
        <div className="p-4  mx-auto float-right mr-[60px]" dir="rtl">
         
          <h1 className="text-xl font-bold mb-4 text-right">ماشین حساب</h1>
      {/* Dropdown for Instruments */}
  <div className="mb-6 max-w-[300px]">
    <label className="block text-lg font-semibold mb-3 text-right text-gray-700">دارایی پایه</label>
    <Select
      options={instrumentOptions}
      onChange={(selectedOption) => {
        const selected = instruments.find(instrument => instrument.ua_instrument_id === selectedOption.value);
        setSelectedInstrument(selected);
        if (editableData.length > 0 && selected) {
          const updatedData = [...editableData];
          updatedData[0].assetType = selected.ua_instrument_symbol_fa;
          setEditableData(updatedData);
        }
      }}
      placeholder="انتخاب کنید..."
      isSearchable
      className="rtl text-right border border-gold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold bg-navy text-gold placeholder:text-gold/60"
    />
  </div>

  {/* Dropdown for Strategies */}
  <div className="mb-6 max-w-[300px] ">
    <label className="block text-lg font-semibold mb-3 text-right text-gray-700">استراتژی</label>
    <Select
      options={(Array.isArray(strategyList) ? strategyList : []).map(strategy => ({
        value: strategy,
        label: strategy,
      }))}
      onChange={(selectedOption) => {
        handleStrategyChange({ target: { value: selectedOption.value } });
      }}
      placeholder="انتخاب کنید..."
      isSearchable
      className="rtl text-right border border-gold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gold bg-navy text-gold placeholder:text-gold/60"
    />
  </div>

  {/* Multiplier Input */}
  <div className="mb-6 max-w-[300px] ">
    <label className="block text-lg font-semibold mb-3 text-right text-gray-700">تعداد :</label>
    <input
      type="number"
      value={multiplier}
      onChange={handleMultiplierChange}
      placeholder="Multiplier"
      className="border border-gold p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gold bg-navy text-gold placeholder:text-gold/60"
    />
  </div>
      
    {/* Display strategy details in a horizontal layout */}
  {selectedStrategy && (
    <div className="mb-6 max-w-screen-xl mx-auto px-4">
      <h2 className="text-lg font-semibold my-4 text-right text-gray-800">جزئیات استراتژی:</h2>
      {editableData.map((data, index) => (
        <div key={index} className="mb-6 p-6 border rounded-lg bg-white shadow-xl grid grid-cols-5 gap-6">
          
          {/* Asset Type */}
          <div className="flex flex-col">
            <label className="block font-semibold text-right text-gray-700">نوع دارایی:</label>
            <input
              type="text"
              placeholder="نوع دارایی را وارد کنید"
              className="border border-gold p-3 rounded-md w-full bg-navy text-gold placeholder:text-gold/60"
              value={data.asset_type === "stock" ? "سهام" : data.asset_type === "option" ? "اختیار" : ''}
              readOnly
            />
          </div>

          {/* Asset Type */}
          <div className="flex flex-col">
            <label className="block font-semibold text-right text-gray-700">دارایی پایه:</label>
            <input
              type="text"
              placeholder="نوع دارایی را وارد کنید"
              className="border border-gold p-3 rounded-md w-full bg-navy text-gold placeholder:text-gold/60"
              value={data.assetType || selectedInstrument?.ua_instrument_symbol_fa || ''}
              readOnly
            />
          </div>

          {/* Option Type */}
          <div className="flex flex-col">
            <label className="block font-semibold text-right text-gray-700">نوع اختیار:</label>
            {data.asset_type === "stock" ? (
              <span className="p-3 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed">
                {data.kind || "انتخاب نوع اختیار"}
              </span>
            ) : (
              <select
                className="p-3 border border-gold rounded-md w-full bg-navy text-gold placeholder:text-gold/60"
                value={data.kind || ''}
                onChange={(e) => handleFieldChange(index, 'kind', e.target.value)}
              >
                <option value="" disabled>انتخاب نوع اختیار</option>
                <option value="call">Call</option>
                <option value="put">Put</option>
              </select>
            )}
          </div>

          {/* Action */}
          <div className="flex flex-col">
            <label className="block font-semibold text-right text-gray-700">عملیات:</label>
            <select
              className="border border-gold p-3 rounded-md w-full bg-navy text-gold placeholder:text-gold/60"
              value={data.action || ''}
              onChange={(e) => {
                const actionValue = e.target.value;
                handleFieldChange(index, 'action', actionValue);
                const selectedIntraData = intraData.find(item => item.end_date_fa === data.endDate);
                if (selectedIntraData) {
                  const price = actionValue === 'sell'
                    ? selectedIntraData.sell_price
                    : selectedIntraData.buy_price;
                  handleFieldChange(index, 'price', price);
                }
              }}
            >
              <option value="" disabled>انتخاب عملیات</option>
              <option value="buy">خرید</option>
              <option value="sell">فروش</option>
            </select>
          </div>

          {/* Quantity (n) */}
          <div className="flex flex-col">
            <label className="block font-semibold text-right text-gray-700">تعداد (n):</label>
            <input
              type="number"
              placeholder="تعداد را وارد کنید"
              className="border border-gold p-3 rounded-md w-full bg-navy text-gold placeholder:text-gold/60"
              value={calculateQuantity(data.n) || ''}
              readOnly
            />
          </div>

          {/* End Date Dropdown */}
          <div className="flex flex-col">
            <label className="block font-semibold text-right text-gray-700">تاریخ سررسید:</label>
            {data.asset_type !== "stock" ? (
              <select
                className="border border-gold p-3 rounded-md w-full bg-navy text-gold placeholder:text-gold/60"
                value={selectedEndDates[index] || ""}
                onChange={(e) => handleEndDateChange(index, e.target.value)}
              >
                <option value="" disabled>انتخاب تاریخ سررسید</option>
                {(Array.isArray(getUniqueEndDates(intraData)) ? getUniqueEndDates(intraData) : []).map((date, idx) => (
                  <option key={idx} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            ) : (
              <span className="p-3 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed">انتخاب تاریخ سررسید</span>
            )}
          </div>

          {/* Symbol Selection */}
          <div className="flex flex-col">
            <label className="block font-semibold text-right text-gray-700">نماد:</label>
            {data.kind ? (
              <select
                className="w-full border border-gold p-3 rounded-md bg-navy text-gold placeholder:text-gold/60"
                value={editableData[index]?.symbol || ''}
                onChange={(e) => handleFieldChange(index, 'symbol', e.target.value)}
              >
                <option value="" disabled>انتخاب نماد</option>
                {(Array.isArray(groupSymbols[index]) ? groupSymbols[index] : []).filter(symbol =>
                  intraData.some(item => item.symbol_fa === symbol && item.option_type === data.kind)
                ).map((symbol, idx) => (
                  <option key={idx} value={symbol}>{symbol}</option>
                ))}
              </select>
            ) : (
              <span className="p-3 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed">انتخاب نماد</span>
            )}
          </div>

          {/* Editable Price Input Field */}
          <div className="flex flex-col">
            <label className="block font-semibold text-right text-gray-700">قیمت:</label>
            <input
              type="number"
              placeholder="قیمت را وارد کنید"
              className="border border-gold p-3 rounded-md w-full bg-navy text-gold placeholder:text-gold/60"
              value={data.price || ''}
              onChange={(e) => handleFieldChange(index, 'price', e.target.value)}
            />
          </div>

          {/* Sigma Input */}
          <div className="flex flex-col">
            <label className="block font-semibold text-right text-gray-700">سیگما:</label>
            <input
              type="number"
              step="0.01"
              className="p-3 border border-gold rounded-md w-full bg-navy text-gold placeholder:text-gold/60"
              value={sigma}
              onChange={(e) => setSigma(parseFloat(e.target.value))}
            />
          </div>
        </div>
      ))}
      
      {/* POST Button */}
      <button
        onClick={handleCalculate}
        className="bg-gold hover:bg-navy hover:text-gold text-navy py-3 px-6 rounded-md transition-all mt-6 shadow-lg w-full sm:w-auto font-bold border border-gold"
      >
        محاسبه
      </button>
    </div>
  )}

      
  {response && (
    <div className="mt-6 p-8 border border-gold rounded-xl bg-navy text-gold shadow-xl hover:shadow-2xl transition-all duration-300">
      <h3 className="font-extrabold text-2xl text-right text-gold border-b-4 pb-3 mb-6 border-gold">نتیجه استراتژی</h3>
      
  {/* Strategy Summary Section */}
  <div className="mt-6">
    <h4 className="font-bold text-xl text-right text-gray-800 border-b pb-2 mb-4">استراتژی خلاصه</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 "> 
      
      {/* Titles Column */}
      <div className="text-right">
        <p className="text-base mb-1"> {/* کاهش فاصله زیر هر عنوان */}
          <span className="text-blue-600 text-lg">حداکثر بازده</span>
        </p>
        <p className="text-base mb-1"> {/* کاهش فاصله زیر هر عنوان */}
          <span className="text-blue-600 text-lg">حداکثر ضرر</span>
        </p>
        <p className="text-base mb-1"> {/* کاهش فاصله زیر هر عنوان */}
          <span className="text-blue-600 text-lg">هزینه استراتژی</span>
        </p>
      </div>
      
      {/* Answers Column */}
      <div className="text-right mr-[-260px]">
        <p className="text-base mb-1"> {/* کاهش فاصله زیر جواب‌ها */}
          <span className="text-gray-900 text-lg">{response.max_return.toLocaleString('fa-IR')}</span>
        </p>
        <p className="text-base mb-1"> {/* کاهش فاصله زیر جواب‌ها */}
          <span className="text-gray-900 text-lg">{response.max_loss.toLocaleString('fa-IR')}</span>
        </p>
        <p className="text-base mb-1"> {/* کاهش فاصله زیر جواب‌ها */}
          <span className="text-gray-900 text-lg">{response.strategy_cost.toLocaleString('fa-IR')}</span>
        </p>
      </div>
    </div>
  </div>


      {/* Delta Section */}
      <div className="mt-6">
        <h4 className="font-bold text-xl text-right text-gray-800 border-b pb-2 mb-6">دلتا</h4>
        {Array.isArray(response.delta) && response.delta.length > 0 ? (
          <ul className="list-disc list-inside text-right text-gray-700 space-y-2">
            {response.delta.map((value, index) => (
              <li key={index} className="leading-6 text-lg">
                {value.toLocaleString('fa-IR')}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">داده‌ای برای نمایش وجود ندارد</p>
        )}
      </div>

      {/* Strategy Profit Chart */}
      <div className="mt-8">
        <h4 className="font-semibold text-xl text-gray-800">سود استراتژی:</h4>
        {response && !loading && (
          <div className="mt-8">
            <Line data={chartData} options={options} />
          </div>
        )}
      </div>
    </div>
  )}
        </div>
      </div>
    </div>
  );
};

export default Calculation;