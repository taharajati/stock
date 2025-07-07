import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calculation from '../calculation/Calculation';
import { IoMdCalculator } from "react-icons/io";
import { BiSolidDetail } from "react-icons/bi";
import OptionSidebar from '../nav/OptionSidebar';

const StrategiesTable = () => {
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isCalculationOpen, setIsCalculationOpen] = useState(false);
  const navigate = useNavigate();

  const columnNames = {
    name_fa: "استراتژی",
    market_expectation_fa: "مناسب برای بازار",
    volatility_fa: "مناسب برای",
    profit_limit_fa: "حد سود",
    loss_limit_fa: "حد ضرر",
    explain: "توضیحات"
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.optionscreener.ir/api/strategies/strategies_table');
        const data = await response.json();
        setStrategies(data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch strategies');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOpenCalculation = (rowData) => {
    setSelectedRowData(rowData);
    setIsCalculationOpen(true);
  };

  const handleCloseCalculation = () => {
    setIsCalculationOpen(false);
    setSelectedRowData(null);
  };

  const handleViewPositions = (url) => {
    navigate(`/strategies/${url}`);
  };

  return (
    <div className="flex">
      <OptionSidebar />
      <div className="flex-1 mx-auto p-6 w-full md:w-[80%] lg:w-[75%] xl:w-[65%]">
        {/* Error or loading message */}
        {loading && (
          <div className="w-full flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-700"></div>
            <span className="ml-4 text-gold">در حال بارگذاری...</span>
          </div>
        )}
        {error && (
          <div className="w-full text-center text-red-500 font-bold mb-4">{error}</div>
        )}
        {/* Table */}
        <div className="overflow-x-auto bg-navy shadow-lg rounded-lg border border-gold">
          <table className="w-full table-auto border-collapse text-sm text-gold" dir="rtl">
            <thead className="bg-navy-dark border-b-2 border-gold">
              <tr>
                {Object.keys(columnNames).map((key) => (
                  <th key={key} className="px-6 py-3 text-center font-semibold text-gold uppercase tracking-wider border-b border-gold">{columnNames[key]}</th>
                ))}
                <th className="px-6 py-3 text-center border-b border-gold"></th>
                <th className="px-6 py-3 text-center border-b border-gold"></th>
              </tr>
            </thead>
            <tbody>
              {strategies && strategies.length > 0 ? (
                strategies.map((strategy, index) => (
                  <tr key={index} className="border-b border-gold hover:bg-navy-dark/60 transition">
                    {Object.keys(columnNames).map((key) => (
                      <td key={key} className="px-6 py-4 text-center border-b border-gold">{strategy[key]}</td>
                    ))}
                    <td className="px-6 py-4 text-center border-b border-gold">
                      <button
                        className="py-2 px-4 rounded-md bg-gold hover:bg-navy hover:text-gold focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 text-navy font-bold border border-gold"
                        onClick={() => handleOpenCalculation(strategy)}>
                        <IoMdCalculator className="text-xl" />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-center border-b border-gold">
                      <button
                        className="py-2 px-4 rounded-md bg-gold hover:bg-navy hover:text-gold focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 text-navy font-bold border border-gold"
                        onClick={() => handleViewPositions(strategy.url)}>
                        <BiSolidDetail className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={Object.keys(columnNames).length + 2} className="text-center py-8 text-gold/70 font-bold text-lg">
                    هیچ داده‌ای برای نمایش وجود ندارد.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Calculation Modal */}
        {isCalculationOpen && (
          <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-60 flex justify-center items-center animate__animated animate__fadeIn">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-[1500px] w-full relative transform transition-all duration-300 ease-in-out scale-105">
              <button
                className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-900"
                onClick={handleCloseCalculation}>
                &times;
              </button>
              {/* Pass data to Calculation component */}
              <Calculation 
                prefillData={selectedRowData}
                onClose={handleCloseCalculation}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategiesTable;
