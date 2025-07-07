import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCogs, FaChartBar, FaCalculator, FaListUl } from 'react-icons/fa';

const strategies = [
  { path: '/stock-market/strategies/covered_call_table', label: 'covered Call' },
  { path: '/stock-market/strategies/covered_put_table', label: 'covered put' },
  { path: '/stock-market/strategies/buy_straddle_table', label: 'buy Straddle' },
  { path: '/stock-market/strategies/sell_straddle_table', label: 'sell Straddle' },
  { path: '/stock-market/strategies/long_synthetic_table', label: 'long synthetic' },
  { path: '/stock-market/strategies/short_synthetic_table', label: 'short synthetic' },
  { path: '/stock-market/strategies/bull_call_spread_table', label: 'bull call spread' },
  { path: '/stock-market/strategies/bull_put_spread_table', label: 'bull put spread' },
  { path: '/stock-market/strategies/call_back_spread_table', label: 'call back spread' },
  { path: '/stock-market/strategies/put_back_spread_table', label: 'put back spread' },
  { path: '/stock-market/strategies/long_combo_table', label: 'long combo' },
  { path: '/stock-market/strategies/long_strangle_table', label: 'long strangle' },
  { path: '/stock-market/strategies/short_strangle_table', label: 'short strangle' },
  { path: '/stock-market/strategies/strap_table', label: 'strap' },
  { path: '/stock-market/strategies/strip_table', label: 'strip' },
  { path: '/stock-market/strategies/long_call_ladder_table', label: 'long call ladder' },
  { path: '/stock-market/strategies/long_put_ladder_table', label: 'long put ladder' },
  { path: '/stock-market/strategies/short_call_ladder_table', label: 'short call ladder' },
  { path: '/stock-market/strategies/short_put_ladder_table', label: 'short put ladder' },
  { path: '/stock-market/strategies/long_call_butterfly_table', label: 'long call butterfly' },
  { path: '/stock-market/strategies/long_put_butterfly_table', label: 'long put butterfly' },
  { path: '/stock-market/strategies/short_call_butterfly_table', label: 'short call butterfly' },
  { path: '/stock-market/strategies/short_put_butterfly_table', label: 'short put butterfly' },
  { path: '/stock-market/strategies/long_call_condor_table', label: 'long call condor' },
  { path: '/stock-market/strategies/long_put_condor_table', label: 'long put condor' },
  { path: '/stock-market/strategies/short_call_condor_table', label: 'short call condor' },
  { path: '/stock-market/strategies/short_put_condor_table', label: 'short put condor' },
  { path: '/stock-market/strategies/collar_table', label: 'collar' },
];

const OptionSidebar = () => {
  const location = useLocation();
  const [hovered, setHovered] = useState(false);

  // Helper to check if a path is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* حذف overlay */}
      <aside
        className={`
          fixed top-24 right-2 z-50 flex flex-col items-center bg-navy/90 shadow-2xl border border-gold rounded-2xl py-4 px-2
          transition-all duration-300 ease-in-out
          ${hovered ? 'w-64' : 'w-16'}
          ${hovered ? ' scale-100' : 'opacity-80 scale-95'}
          ${hovered ? '' : 'backdrop-blur-lg'}
        `}
        style={{ fontFamily: 'Vazir, tahoma, Arial, sans-serif' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* استراتژی های عملیاتی */}
        <Link
          to="/stock-market/operational_strategies"
          className={`group flex items-center gap-3 w-full mb-4 px-2 py-2 rounded-xl transition-colors
            ${isActive('/stock-market/operational_strategies')
              ? 'bg-gold text-navy'
              : 'text-white hover:bg-gold hover:text-navy'}
          `}
        >
          <span className="flex items-center justify-center w-8 h-8">
            <FaCogs size={22} className={`transition-colors duration-200 ${isActive('/stock-market/operational_strategies') ? 'text-navy' : 'text-white group-hover:text-navy'}`} />
          </span>
          <span className={`whitespace-nowrap font-bold text-base transition-opacity duration-200 ${hovered ? (isActive('/stock-market/operational_strategies') ? 'opacity-100 text-navy' : 'opacity-100 text-white group-hover:text-navy') : 'opacity-0 pointer-events-none'}`}>استراتژی های عملیاتی</span>
        </Link>
        {/* نمودار */}
        <Link
          to="/stock-market/ChartIV"
          className={`group flex items-center gap-3 w-full mb-4 px-2 py-2 rounded-xl transition-colors
            ${isActive('/stock-market/ChartIV')
              ? 'bg-gold text-navy'
              : 'text-white hover:bg-gold hover:text-navy'}
          `}
        >
          <span className="flex items-center justify-center w-8 h-8">
            <FaChartBar size={22} className={`transition-colors duration-200 ${isActive('/stock-market/ChartIV') ? 'text-navy' : 'text-white group-hover:text-navy'}`} />
          </span>
          <span className={`whitespace-nowrap font-bold text-base transition-opacity duration-200 ${hovered ? (isActive('/stock-market/ChartIV') ? 'opacity-100 text-navy' : 'opacity-100 text-white group-hover:text-navy') : 'opacity-0 pointer-events-none'}`}>نمودار</span>
        </Link>
        {/* ماشین حساب */}
        <Link
          to="/stock-market/Calculation"
          className={`group flex items-center gap-3 w-full mb-4 px-2 py-2 rounded-xl transition-colors
            ${isActive('/stock-market/Calculation')
              ? 'bg-gold text-navy'
              : 'text-white hover:bg-gold hover:text-navy'}
          `}
        >
          <span className="flex items-center justify-center w-8 h-8">
            <FaCalculator size={22} className={`transition-colors duration-200 ${isActive('/stock-market/Calculation') ? 'text-navy' : 'text-white group-hover:text-navy'}`} />
          </span>
          <span className={`whitespace-nowrap font-bold text-base transition-opacity duration-200 ${hovered ? (isActive('/stock-market/Calculation') ? 'opacity-100 text-navy' : 'opacity-100 text-white group-hover:text-navy') : 'opacity-0 pointer-events-none'}`}>ماشین حساب استراتژی</span>
        </Link>
        {/* موقعیت های موجود (بدون زیرمنو) */}
        <Link
          to="/stock-market/StrategiesTable"
          className={`group flex items-center gap-3 w-full px-2 py-2 rounded-xl transition-colors
            ${isActive('/stock-market/StrategiesTable')
              ? 'bg-gold text-navy'
              : 'text-white hover:bg-gold hover:text-navy'}
          `}
        >
          <span className="flex items-center justify-center w-8 h-8">
            <FaListUl size={22} className={`transition-colors duration-200 ${isActive('/stock-market/StrategiesTable') ? 'text-navy' : 'text-white group-hover:text-navy'}`} />
          </span>
          <span className={`whitespace-nowrap font-bold text-base transition-opacity duration-200 ${hovered ? (isActive('/stock-market/StrategiesTable') ? 'opacity-100 text-navy' : 'opacity-100 text-white group-hover:text-navy') : 'opacity-0 pointer-events-none'}`}>موقعیت های موجود</span>
        </Link>
      </aside>
    </>
  );
};

export default OptionSidebar; 