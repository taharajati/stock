import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Calculation from '../calculation/Calculation';
import { IoMdCalculator } from "react-icons/io";
import { BiSolidDetail } from "react-icons/bi";

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

  if (loading) return <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-700"></div>
  </div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

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
    <div className="mx-auto p-6 w-full md:w-[80%] lg:w-[75%] xl:w-[65%]">
      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full table-auto border-collapse text-sm text-gray-700" dir="rtl">
          <thead className="bg-gray-100 border-b-2 border-gray-300">
            <tr>
              {Object.keys(columnNames).map((key) => (
                <th key={key} className="px-6 py-3 text-center font-semibold text-gray-600 uppercase tracking-wider">{columnNames[key]}</th>
              ))}
              <th className="px-6 py-3 text-center"></th>
              <th className="px-6 py-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {strategies.map((strategy, index) => (
              <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                {Object.keys(columnNames).map((key) => (
                  <td key={key} className="px-6 py-4 text-center">{strategy[key]}</td>
                ))}
                <td className="px-6 py-4 text-center">
                  <button
                    className="py-2 px-4 rounded-md bg-[color:var(--color-primary)] hover:bg-[color:var(--color-bg-variant)] focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 text-white"
                    onClick={() => handleOpenCalculation(strategy)}>
                    <IoMdCalculator className="text-xl" />
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    className="py-2 px-4 rounded-md bg-[color:var(--color-primary)] hover:bg-[color:var(--color-bg-variant)] focus:outline-none transition duration-300 ease-in-out transform hover:scale-105 text-white"
                    onClick={() => handleViewPositions(strategy.url)}>
                    <BiSolidDetail className="text-xl" />
                  </button>
                </td>
              </tr>
            ))}
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
  );
};

export default StrategiesTable;
