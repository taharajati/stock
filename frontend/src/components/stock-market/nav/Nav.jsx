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
    <header className="bg-navy text-gold  sticky top-0 z-50 w-full transition-all duration-300" style={{fontFamily: 'Vazir, tahoma, Arial, sans-serif'}} dir="ltr">
      <div className="w-full px-4 md:px-8 flex flex-row-reverse items-center justify-between">
        {/* Logo/Site Name - far right */}
        <button onClick={() => navigate('/stock-market/MainPage')} className="flex items-center text-gold font-bold text-2xl tracking-wide select-none px-2 py-1 rounded-lg hover:bg-gold/10 transition order-1">
          <span className="relative group">
            تحلیل آپشن
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
        {/* Main Navigation Links - right of logo */}
        <nav className="hidden md:flex flex-1 justify-end order-2">
          <ul className="flex flex-row-reverse items-center">
            <li className="ml-8 mr-8 relative group">
              <Link to="MainPage" className={`font-medium rounded-lg px-3 py-2 transition-colors ${isActive('/MainPage') ? 'bg-gold text-navy' : 'text-gold/80 hover:text-gold hover:bg-gold/10'} py-2`}>
                صفحه اصلی
                <span className="absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full w-0 ${isActive('/MainPage') ? 'w-full' : ''}"></span>
              </Link>
            </li>
            <li className="ml-8 relative group">
              <Link to="screener" className={`font-medium rounded-lg px-3 py-2 transition-colors ${isActive('/screener') ? 'bg-gold text-navy' : 'text-gold/80 hover:text-gold hover:bg-gold/10'} py-2`}>
                دیدبان
                <span className="absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full w-0 ${isActive('/screener') ? 'w-full' : ''}"></span>
              </Link>
            </li>
            <li className="ml-8 relative group">
              <button onClick={() => navigate('/stock-market/operational_strategies')} className={`font-bold flex items-center gap-1 rounded-lg px-3 py-2 transition-colors ${isActive(['/operational_strategies','/ChartIV','/Calculation','/StrategiesTable',...strategyPaths]) ? 'bg-gold text-navy' : 'text-gold/80 hover:text-gold hover:bg-gold/10'} py-2`}>
              اختیار
                <span className="absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full w-0 ${isActive(['/operational_strategies','/ChartIV','/Calculation','/StrategiesTable',...strategyPaths]) ? 'w-full' : ''}"></span>
              </button>
            </li>
            <li className="ml-8 relative group">
              <Link to="FundsTable" className={`font-medium rounded-lg px-3 py-2 transition-colors ${isActive('/FundsTable') ? 'bg-gold text-navy' : 'text-gold/80 hover:text-gold hover:bg-gold/10'} py-2`}>
                صندوق
                <span className="absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full w-0 ${isActive('/FundsTable') ? 'w-full' : ''}"></span>
              </Link>
            </li>
            <li className="relative group">
              <Link to="Blog" className={`font-medium rounded-lg px-3 py-2 transition-colors ${isActive(['/Blog', '/group', '/post']) ? 'bg-gold text-navy' : 'text-gold/80 hover:text-gold hover:bg-gold/10'} py-2`}>
                محتوا آموزشی
                <span className="absolute -bottom-1 left-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full w-0 ${isActive(['/Blog', '/group', '/post']) ? 'w-full' : ''}"></span>
              </Link>
            </li>
          </ul>
        </nav>
        {/* Exit Button - far left */}
        <button onClick={handleExit} className="p-2 px-6 text-lg text-gold font-bold hover:bg-gold/10 rounded transition order-3 ml-auto">
          خروج
        </button>
        {/* Hamburger for mobile */}
        <div className="flex gap-3 md:hidden order-4">
          <button className="text-gold" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="flex flex-col w-full bg-navy text-gold border-b-2 border-gold shadow-lg md:hidden">
          <button onClick={handleExit} className="p-3 text-center text-gold font-bold hover:bg-gold/10 rounded">خروج</button>
          <button onClick={() => navigate('/stock-market/MainPage')} className="p-3 text-center text-gold font-bold hover:bg-gold/10 rounded">تحلیل آپشن</button>
          <Link to="Blog" className={`p-3 text-center transition-colors border-b-4 ${isActive(['/Blog', '/group', '/post']) ? 'bg-gold text-navy rounded-md border-navy' : 'text-gold/80 hover:bg-gold/10 hover:text-gold rounded-lg border-transparent'}`}>محتوا آموزشی</Link>
          <Link to="FundsTable" className={`p-3 text-center transition-colors border-b-4 ${isActive('/FundsTable') ? 'bg-gold text-navy rounded-md border-navy' : 'text-gold/80 hover:bg-gold/10 hover:text-gold rounded-lg border-transparent'}`}>صندوق</Link>
          <details className="w-full">
            <summary className={`p-3 text-center cursor-pointer font-bold bg-gold/10 select-none flex items-center justify-between transition-colors border-b-4 ${isActive(['/operational_strategies','/ChartIV','/Calculation','/StrategiesTable',...strategyPaths]) ? 'bg-gold text-navy rounded-md border-navy' : 'text-gold/80 hover:bg-gold/10 hover:text-gold rounded-lg border-transparent'}`}>اختیار <svg className="w-4 h-4 ml-2 transition-transform duration-200 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></summary>
            <div className="flex flex-col bg-gold/10 rounded-b-lg border-t border-gold">
              <Link to="operational_strategies" className={`p-3 text-center transition-colors border-b-4 ${isActive('operational_strategies') ? 'bg-gold text-navy rounded-md border-navy' : 'text-gold/80 hover:bg-gold/20 hover:text-gold rounded-lg border-transparent'}`} onClick={()=>setIsMobileMenuOpen(false)}>استراتژی های عملیاتی</Link>
              <Link to="ChartIV" className={`p-3 text-center transition-colors border-b-4 ${isActive('ChartIV') ? 'bg-gold text-navy rounded-md border-navy' : 'text-gold/80 hover:bg-gold/20 hover:text-gold rounded-lg border-transparent'}`} onClick={()=>setIsMobileMenuOpen(false)}>نمودار</Link>
              <Link to="Calculation" className={`p-3 text-center transition-colors border-b-4 ${isActive('Calculation') ? 'bg-gold text-navy rounded-md border-navy' : 'text-gold/80 hover:bg-gold/20 hover:text-gold rounded-lg border-transparent'}`} onClick={()=>setIsMobileMenuOpen(false)}>ماشین حساب استراتژی</Link>
              <Link to="StrategiesTable" className={`p-3 text-center transition-colors border-b-4 ${isActive('StrategiesTable') ? 'bg-gold text-navy rounded-md border-navy' : 'text-gold/80 hover:bg-gold/20 hover:text-gold rounded-lg border-transparent'}`} onClick={()=>setIsMobileMenuOpen(false)}>موقعیت های موجود</Link>
              {/* Nested strategy links, each with onClick={()=>setIsMobileMenuOpen(false)} */}
              <Link to="/strategies/covered_call_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>covered Call</Link>
              <Link to="/strategies/covered_put_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>covered put</Link>
              <Link to="/strategies/buy_straddle_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>buy Straddle</Link>
              <Link to="/strategies/sell_straddle_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>sell Straddle</Link>
              <Link to="/strategies/long_synthetic_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>long synthetic</Link>
              <Link to="/strategies/short_synthetic_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>short synthetic</Link>
              <Link to="/strategies/bull_call_spread_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>bull call spread</Link>
              <Link to="/strategies/bull_put_spread_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>bull put spread</Link>
              <Link to="/strategies/call_back_spread_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>call back spread</Link>
              <Link to="/strategies/put_back_spread_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>put back spread</Link>
              <Link to="/strategies/long_combo_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>long combo</Link>
              <Link to="/strategies/long_strangle_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>long strangle</Link>
              <Link to="/strategies/short_strangle_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>short strangle</Link>
              <Link to="/strategies/strap_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>strap</Link>
              <Link to="/strategies/strip_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>strip</Link>
              <Link to="/strategies/long_call_ladder_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>long call ladder</Link>
              <Link to="/strategies/long_put_ladder_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>long put ladder</Link>
              <Link to="/strategies/short_call_ladder_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>short call ladder</Link>
              <Link to="/strategies/short_put_ladder_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>short put ladder</Link>
              <Link to="/strategies/long_call_butterfly_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>long call butterfly</Link>
              <Link to="/strategies/long_put_butterfly_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>long put butterfly</Link>
              <Link to="/strategies/short_call_butterfly_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>short call butterfly</Link>
              <Link to="/strategies/short_put_butterfly_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>short put butterfly</Link>
              <Link to="/strategies/long_call_condor_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>long call condor</Link>
              <Link to="/strategies/long_put_condor_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>long put condor</Link>
              <Link to="/strategies/short_call_condor_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>short call condor</Link>
              <Link to="/strategies/short_put_condor_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>short put condor</Link>
              <Link to="/strategies/collar_table" className="p-3 text-center rounded-lg hover:bg-gold/20 hover:text-gold transition text-gold/80" onClick={()=>setIsMobileMenuOpen(false)}>collar</Link>
            </div>
          </details>
          <Link to="screener" className={`p-3 text-center transition-colors border-b-4 ${isActive('/screener') ? 'bg-gold text-navy rounded-md border-navy' : 'text-gold/80 hover:bg-gold/10 hover:text-gold rounded-lg border-transparent'}`}>دیدبان</Link>
          <Link to="MainPage" className={`p-3 text-center transition-colors border-b-4 ${isActive('/MainPage') ? 'bg-gold text-navy rounded-md border-navy' : 'text-gold/80 hover:bg-gold/10 hover:text-gold rounded-lg border-transparent'}`}>صفحه اصلی</Link>
        </div>
      )}
    </header>
  );
};

export default Nav;
