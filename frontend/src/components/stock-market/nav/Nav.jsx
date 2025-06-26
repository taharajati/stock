import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { PermissionsContext, AuthStatusContext, LogoutContext } from '../../StockMarketApp';
import { FaChartBar, FaCalculator, FaCogs, FaListUl, FaChevronLeft } from 'react-icons/fa';

const Nav = () => {
  const permissions = useContext(PermissionsContext);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setPermissions } = useContext(LogoutContext);
  const authStatus = useContext(AuthStatusContext);
  const { setAuthStatus } = useContext(LogoutContext);
  const [isStrategyOpen, setIsStrategyOpen] = useState(false);
  const [isMoqeiatOpen, setIsMoqeiatOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const strategyPaths = [
    '/Calculation', '/StrategiesTable', '/strategies/covered_call_table', '/strategies/covered_put_table', 
    '/strategies/buy_straddle_table', '/strategies/sell_straddle_table', '/strategies/long_synthetic_table', 
    '/strategies/short_synthetic_table', '/strategies/bull_call_spread_table', '/strategies/bull_put_spread_table', 
    '/strategies/call_back_spread_table', '/strategies/put_back_spread_table', '/strategies/long_combo_table', 
    '/strategies/long_strangle_table', '/strategies/short_strangle_table', '/strategies/strap_table', 
    '/strategies/strip_table', '/strategies/long_call_ladder_table', '/strategies/long_put_ladder_table', 
    '/strategies/short_call_ladder_table', '/strategies/short_put_ladder_table', '/strategies/long_call_butterfly_table', 
    '/strategies/long_put_butterfly_table', '/strategies/short_call_butterfly_table', '/strategies/short_put_butterfly_table', 
    '/strategies/long_call_condor_table', '/strategies/long_put_condor_table', '/strategies/short_call_condor_table', 
    '/strategies/short_put_condor_table', '/strategies/collar_table',
  ];

  // Close dropdown on outside click (desktop)
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsStrategyOpen(false);
        setIsMoqeiatOpen(false);
      }
    }
    if (isStrategyOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isStrategyOpen]);

  useEffect(() => {
    setIsStrategyOpen(false);
    setIsMoqeiatOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAuthStatus(null);
    navigate("/login");
  };
  const handleExit = () => {
    navigate('/');
  };
  const isActive = (paths) => {
    if (Array.isArray(paths)) {
      return paths.some(path => location.pathname.includes(path));
    }
    return location.pathname.includes(paths);
  };

  return (
    <div className="sticky top-0 z-50 w-full shadow-lg bg-[color:var(--color-primary)] rtl">
      <div className="flex flex-row-reverse items-center justify-between px-2 md:px-8 py-2 w-full">
        {/* Logo/Site Name - rightmost, clickable */}
        <button onClick={() => navigate('/stock-market/MainPage')} className="flex items-center text-[color:var(--color-text)] font-bold text-lg md:text-2xl tracking-wide select-none px-2 py-1 rounded-lg hover:bg-[color:var(--color-bg-variant)] transition" style={{fontFamily: 'Lalezar, Vazir, sans-serif'}}>
          تحلیل آپشن
        </button>
        {/* Main Navigation Links */}
        <div className="flex gap-2 md:gap-5 items-center">
          <Link to="Blog" className={`p-2 rounded-lg font-medium transition ${isActive(['/Blog', '/group', '/post']) ? 'bg-[color:var(--color-bg-variant)] text-[color:var(--color-text)]' : 'text-[color:var(--color-light)] hover:bg-[color:var(--color-bg-variant)] hover:text-[color:var(--color-text)]'}`}>محتوا آموزشی</Link>
          <Link to="FundsTable" className={`p-2 rounded-lg font-medium transition ${isActive('/FundsTable') ? 'bg-[color:var(--color-bg-variant)] text-[color:var(--color-text)]' : 'text-[color:var(--color-light)] hover:bg-[color:var(--color-bg-variant)] hover:text-[color:var(--color-text)]'}`}>صندوق</Link>
          {/* Dropdown for اختیار */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsSidebarOpen((open) => !open)}
              className={`p-2 rounded-lg font-bold flex items-center gap-1 transition ${isActive(['/operational_strategies','/ChartIV','/Calculation','/StrategiesTable',...strategyPaths]) ? 'bg-[color:var(--color-bg-variant)] text-[color:var(--color-text)]' : 'text-[color:var(--color-light)] hover:bg-[color:var(--color-bg-variant)] hover:text-[color:var(--color-text)]'}`}
              style={{minWidth: '90px'}}
              aria-expanded={isSidebarOpen}
            >
              اختیار
              <svg className={`w-4 h-4 transition-transform duration-200 ${isSidebarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          <Link to="screener" className={`p-2 rounded-lg font-medium transition ${isActive('/screener') ? 'bg-[color:var(--color-bg-variant)] text-[color:var(--color-text)]' : 'text-[color:var(--color-light)] hover:bg-[color:var(--color-bg-variant)] hover:text-[color:var(--color-text)]'}`}>دیدبان</Link>
          <Link to="MainPage" className={`p-2 rounded-lg font-medium transition ${isActive('/MainPage') ? 'bg-[color:var(--color-bg-variant)] text-[color:var(--color-text)]' : 'text-[color:var(--color-light)] hover:bg-[color:var(--color-bg-variant)] hover:text-[color:var(--color-text)]'}`}>صفحه اصلی</Link>
        </div>
        {/* Exit Button - leftmost */}
        <button onClick={handleExit} className="p-2 text-[color:var(--color-text)] font-bold hover:bg-[color:var(--color-bg-variant)] rounded transition order-first mr-2">خروج</button>
        {/* Hamburger for mobile */}
        <div className="flex gap-3 md:hidden">
          <button 
            className="text-[color:var(--color-light)]" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col w-full bg-[color:var(--color-primary)] md:hidden border-b-2 border-[color:var(--color-bg-variant)] shadow-lg">
          <button onClick={handleExit} className="p-3 text-center text-[color:var(--color-text)] font-bold hover:bg-[color:var(--color-bg-variant)] rounded">خروج</button>
          <button onClick={() => navigate('/stock-market/MainPage')} className="p-3 text-center text-[color:var(--color-text)] font-bold hover:bg-[color:var(--color-bg-variant)] rounded">تحلیل آپشن</button>
          <Link to="Blog" className="p-3 text-center text-[color:var(--color-light)] hover:bg-[color:var(--color-bg-variant)] hover:text-[color:var(--color-text)] rounded-lg">محتوا آموزشی</Link>
          <Link to="FundsTable" className="p-3 text-center text-[color:var(--color-light)] hover:bg-[color:var(--color-bg-variant)] hover:text-[color:var(--color-text)] rounded-lg">صندوق</Link>
          {/* Dropdown for اختیار in mobile */}
          <details className="w-full">
            <summary className="p-3 text-center cursor-pointer text-[color:var(--color-text)] font-bold bg-[color:var(--color-bg-variant)] rounded-t-lg select-none flex items-center justify-between">اختیار <svg className="w-4 h-4 ml-2 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></summary>
            <div className="flex flex-col bg-[color:var(--color-bg-variant)] rounded-b-lg border-t border-[color:var(--color-primary)]">
              <Link to="operational_strategies" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>استراتژی های عملیاتی</Link>
              <Link to="ChartIV" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>نمودار</Link>
              <Link to="Calculation" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>ماشین حساب استراتژی</Link>
              <Link to="StrategiesTable" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>موقعیت های موجود</Link>
              {/* Nested strategy links, each with onClick={()=>setIsMobileMenuOpen(false)} */}
              <Link to="/strategies/covered_call_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>covered Call</Link>
              <Link to="/strategies/covered_put_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>covered put</Link>
              <Link to="/strategies/buy_straddle_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>buy Straddle</Link>
              <Link to="/strategies/sell_straddle_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>sell Straddle</Link>
              <Link to="/strategies/long_synthetic_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>long synthetic</Link>
              <Link to="/strategies/short_synthetic_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>short synthetic</Link>
              <Link to="/strategies/bull_call_spread_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>bull call spread</Link>
              <Link to="/strategies/bull_put_spread_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>bull put spread</Link>
              <Link to="/strategies/call_back_spread_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>call back spread</Link>
              <Link to="/strategies/put_back_spread_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>put back spread</Link>
              <Link to="/strategies/long_combo_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>long combo</Link>
              <Link to="/strategies/long_strangle_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>long strangle</Link>
              <Link to="/strategies/short_strangle_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>short strangle</Link>
              <Link to="/strategies/strap_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>strap</Link>
              <Link to="/strategies/strip_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>strip</Link>
              <Link to="/strategies/long_call_ladder_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>long call ladder</Link>
              <Link to="/strategies/long_put_ladder_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>long put ladder</Link>
              <Link to="/strategies/short_call_ladder_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>short call ladder</Link>
              <Link to="/strategies/short_put_ladder_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>short put ladder</Link>
              <Link to="/strategies/long_call_butterfly_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>long call butterfly</Link>
              <Link to="/strategies/long_put_butterfly_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>long put butterfly</Link>
              <Link to="/strategies/short_call_butterfly_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>short call butterfly</Link>
              <Link to="/strategies/short_put_butterfly_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>short put butterfly</Link>
              <Link to="/strategies/long_call_condor_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>long call condor</Link>
              <Link to="/strategies/long_put_condor_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>long put condor</Link>
              <Link to="/strategies/short_call_condor_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>short call condor</Link>
              <Link to="/strategies/short_put_condor_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>short put condor</Link>
              <Link to="/strategies/collar_table" className="p-3 text-center rounded-lg hover:bg-[color:var(--color-primary)] hover:text-[color:var(--color-text)] transition" onClick={()=>setIsMobileMenuOpen(false)}>collar</Link>
            </div>
          </details>
          <Link to="screener" className="p-3 text-center text-[color:var(--color-light)] hover:bg-[color:var(--color-bg-variant)] hover:text-[color:var(--color-text)] rounded-lg">دیدبان</Link>
          <Link to="MainPage" className="p-3 text-center text-[color:var(--color-light)] hover:bg-[color:var(--color-bg-variant)] hover:text-[color:var(--color-text)] rounded-lg">صفحه اصلی</Link>
        </div>
      )}
      {/* Sidebar شناور */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed top-20 right-6 w-80 max-h-[70vh] z-50 flex flex-col p-6 rounded-3xl border border-gray-200 animate-fadeIn"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 60%, rgba(230,245,255,0.95) 100%)',
              boxShadow: '0 12px 48px 0 rgba(31, 38, 135, 0.25)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              transition: 'all 0.3s',
              overflowY: 'auto',
            }}
          >
            <button
              className="self-end text-xl w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[color:var(--color-primary)] hover:text-white text-gray-500 shadow transition mb-4"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="بستن سایدبار"
            >
              <FaChevronLeft />
            </button>
            <Link to="operational_strategies" className="flex items-center gap-2 px-4 py-3 text-right rounded-xl font-bold text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white transition mb-2 shadow-sm" onClick={()=>setIsSidebarOpen(false)}>
              <FaCogs className="text-lg" /> استراتژی های عملیاتی
            </Link>
            <Link to="ChartIV" className="flex items-center gap-2 px-4 py-3 text-right rounded-xl font-bold text-[color:var(--color-primary)] hover:bg-blue-200 hover:text-blue-900 transition mb-2 shadow-sm" onClick={()=>setIsSidebarOpen(false)}>
              <FaChartBar className="text-lg" /> نمودار
            </Link>
            <Link to="Calculation" className="flex items-center gap-2 px-4 py-3 text-right rounded-xl font-bold text-[color:var(--color-primary)] hover:bg-green-200 hover:text-green-900 transition mb-2 shadow-sm" onClick={()=>setIsSidebarOpen(false)}>
              <FaCalculator className="text-lg" /> ماشین حساب استراتژی
            </Link>
            <div className="mt-3">
              <div className="font-extrabold px-4 py-2 text-gray-700 text-base mb-1 flex items-center gap-2"><FaListUl className="text-base" /> موقعیت های موجود</div>
              <div className="pl-2">
                <Link to="/strategies/covered_call_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>covered Call</Link>
                <Link to="/strategies/covered_put_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>covered put</Link>
                <Link to="/strategies/buy_straddle_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>buy Straddle</Link>
                <Link to="/strategies/sell_straddle_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>sell Straddle</Link>
                <Link to="/strategies/long_synthetic_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>long synthetic</Link>
                <Link to="/strategies/short_synthetic_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>short synthetic</Link>
                <Link to="/strategies/bull_call_spread_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>bull call spread</Link>
                <Link to="/strategies/bull_put_spread_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>bull put spread</Link>
                <Link to="/strategies/call_back_spread_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>call back spread</Link>
                <Link to="/strategies/put_back_spread_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>put back spread</Link>
                <Link to="/strategies/long_combo_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>long combo</Link>
                <Link to="/strategies/long_strangle_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>long strangle</Link>
                <Link to="/strategies/short_strangle_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>short strangle</Link>
                <Link to="/strategies/strap_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>strap</Link>
                <Link to="/strategies/strip_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>strip</Link>
                <Link to="/strategies/long_call_ladder_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>long call ladder</Link>
                <Link to="/strategies/long_put_ladder_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>long put ladder</Link>
                <Link to="/strategies/short_call_ladder_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>short call ladder</Link>
                <Link to="/strategies/short_put_ladder_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>short put ladder</Link>
                <Link to="/strategies/long_call_butterfly_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>long call butterfly</Link>
                <Link to="/strategies/long_put_butterfly_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>long put butterfly</Link>
                <Link to="/strategies/short_call_butterfly_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>short call butterfly</Link>
                <Link to="/strategies/short_put_butterfly_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>short put butterfly</Link>
                <Link to="/strategies/long_call_condor_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>long call condor</Link>
                <Link to="/strategies/long_put_condor_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>long put condor</Link>
                <Link to="/strategies/short_call_condor_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>short call condor</Link>
                <Link to="/strategies/short_put_condor_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>short put condor</Link>
                <Link to="/strategies/collar_table" className="block px-4 py-2 text-right rounded-lg hover:bg-gray-200 font-medium transition mb-1 text-gray-700 hover:text-[color:var(--color-primary)]" onClick={()=>setIsSidebarOpen(false)}>collar</Link>
              </div>
            </div>
          </div>
          {/* لایه برای بستن سایدبار با کلیک بیرون */}
          <div className="fixed inset-0 z-40" onClick={()=>setIsSidebarOpen(false)} style={{background:'transparent'}}></div>
        </>
      )}
    </div>
  );
};

export default Nav;
