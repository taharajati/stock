import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.js';

function Header() {
  // const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePath, setActivePath] = useState('');

  // Handle scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active path for navigation highlighting
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <header className={`bg-white rtl sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? 'shadow-md py-2' : 'py-4'}`}>
      <div className="w-full px-4 md:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold fade-in">
            <Link to="/" className="text-blue-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-2 transition-transform duration-500 hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 12h2v9H2v-9zm3-8h2v17H5V4zm3 4h2v13H8V8zm3-4h2v17h-2V4zm3 8h2v9h-2v-9zm3-8h2v17h-2V4z" />
              </svg>
              <span className="relative group">
                تحلیل بورس
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            </Link>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center">
            <li className="relative group ml-8">
              <button 
                className="flex items-center font-medium hover:text-blue-500 transition-colors py-2"
                onClick={() => setProductMenuOpen(!productMenuOpen)}
              >
                محصولات
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 transition-transform duration-300 ${productMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              
              {/* Mega Menu */}
              {productMenuOpen && (
                <div className="absolute top-full right-0 mt-1 w-[600px] bg-white shadow-xl rounded-lg p-6 grid grid-cols-2 gap-6 opacity-0 animate-[fadeIn_0.2s_ease_forwards]" style={{transformOrigin: 'top center'}}>
                  <div className="slide-in-left stagger-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-r-4 border-blue-500 pr-2">محصولات اصلی</h3>
                    <ul className="space-y-3">
                      <li className="transform transition-transform duration-200 hover:-translate-x-1">
                        <Link to="/products/fundamental" className="flex items-center text-gray-700 hover:text-blue-600">
                          <div className="ml-2 p-2 rounded-full bg-blue-50 text-blue-600">📊</div>
                          <div>
                            <div className="font-medium">تحلیل بنیادی</div>
                            <div className="text-xs text-gray-500">تحلیل بنیادی بیش از ۳۰۰ شرکت تولیدی</div>
                          </div>
                        </Link>
                      </li>
                      <li className="transform transition-transform duration-200 hover:-translate-x-1">
                        <Link to="/products/nav" className="flex items-center text-gray-700 hover:text-blue-600">
                          <div className="ml-2 p-2 rounded-full bg-blue-50 text-blue-600">📈</div>
                          <div>
                            <div className="font-medium">تحلیل NAV</div>
                            <div className="text-xs text-gray-500">تحلیل لحظه‌ای NAV شرکت‌های سرمایه‌گذاری</div>
                          </div>
                        </Link>
                      </li>
                      <li className="transform transition-transform duration-200 hover:-translate-x-1">
                        <Link to="/products/shareholders" className="flex items-center text-gray-700 hover:text-blue-600">
                          <div className="ml-2 p-2 rounded-full bg-blue-50 text-blue-600">👥</div>
                          <div>
                            <div className="font-medium">سهامداران</div>
                            <div className="text-xs text-gray-500">اطلاعات کامل سهامداران و معاملات آنها</div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="slide-in-right stagger-2">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 border-r-4 border-blue-500 pr-2">محصولات ویژه</h3>
                    <ul className="space-y-3">
                      <li className="transform transition-transform duration-200 hover:-translate-x-1">
                        <Link to="/products/portfolio" className="flex items-center text-gray-700 hover:text-blue-600">
                          <div className="ml-2 p-2 rounded-full bg-blue-50 text-blue-600">💼</div>
                          <div>
                            <div className="font-medium">سبد پیشنهادی</div>
                            <div className="text-xs text-gray-500">سبد سهام پیشنهادی با بازدهی بالا</div>
                          </div>
                        </Link>
                      </li>
                      <li className="transform transition-transform duration-200 hover:-translate-x-1">
                        <Link to="/products/codal" className="flex items-center text-gray-700 hover:text-blue-600">
                          <div className="ml-2 p-2 rounded-full bg-blue-50 text-blue-600">📝</div>
                          <div>
                            <div className="font-medium">کدال پلاس</div>
                            <div className="text-xs text-gray-500">دسترسی کامل به گزارش‌های کدال</div>
                          </div>
                        </Link>
                      </li>
                      <li className="transform transition-transform duration-200 hover:-translate-x-1">
                        <Link to="/products/options" className="flex items-center text-gray-700 hover:text-blue-600">
                          <div className="ml-2 p-2 rounded-full bg-blue-50 text-blue-600">🔄</div>
                          <div>
                            <div className="font-medium">اختیار معامله</div>
                            <div className="text-xs text-gray-500">ابزارهای تحلیل اختیار معامله</div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-span-2 mt-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 slide-in-bottom stagger-3">
                    <p className="text-center text-sm text-blue-800">
                      مشاوره رایگان و تخصصی برای انتخاب بهترین بسته متناسب با نیاز شما
                      <Link to="/contact" className="mr-2 inline-flex items-center text-blue-600 font-medium hover:underline">
                        تماس با کارشناسان
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </li>
            
            <li className="ml-8 relative group">
              <Link 
                to="/prices" 
                className={`font-medium ${activePath === '/prices' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-500 transition-colors py-2`}
              >
                قیمت‌ها
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            
            <li className="ml-8 relative group">
              <Link 
                to="/academy" 
                className={`font-medium ${activePath === '/academy' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-500 transition-colors py-2`}
              >
                آکادمی
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            
            <li className="ml-8 relative group">
              <Link 
                to="/articles" 
                className={`font-medium ${activePath === '/articles' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-500 transition-colors py-2`}
              >
                مقاله‌ها
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            
            <li className="ml-8 relative group">
              <Link 
                to="/about" 
                className={`font-medium ${activePath === '/about' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-500 transition-colors py-2`}
              >
                درباره ما
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            
            <li className="relative group">
              <Link 
                to="/contact" 
                className={`font-medium ${activePath === '/contact' ? 'text-blue-600' : 'text-gray-800'} hover:text-blue-500 transition-colors py-2`}
              >
                تماس با ما
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-between items-center">
            <span className={`w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`w-full h-0.5 bg-gray-600 transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-full h-0.5 bg-gray-600 transform transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-white shadow-lg mt-2 transform transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <ul className="py-2">
          <li>
            <Link to="/" className={`block px-4 py-3 ${activePath === '/' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' : 'text-gray-800'} hover:bg-blue-50 hover:text-blue-600 transition-all duration-200`}>خانه</Link>
          </li>
          <li>
            <div className={`px-4 py-3 ${activePath.includes('/products') ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' : 'text-gray-800'} hover:bg-blue-50 hover:text-blue-600 flex justify-between items-center cursor-pointer transition-all duration-200`} onClick={() => setProductMenuOpen(!productMenuOpen)}>
              محصولات
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transform transition-transform duration-300 ${productMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className={`bg-gray-50 transition-all duration-300 overflow-hidden ${productMenuOpen ? 'max-h-80 py-2' : 'max-h-0 py-0'}`}>
              <Link to="/products/fundamental" className="block px-8 py-2 text-gray-700 hover:text-blue-600 transition-colors">تحلیل بنیادی</Link>
              <Link to="/products/nav" className="block px-8 py-2 text-gray-700 hover:text-blue-600 transition-colors">تحلیل NAV</Link>
              <Link to="/products/shareholders" className="block px-8 py-2 text-gray-700 hover:text-blue-600 transition-colors">سهامداران</Link>
              <Link to="/products/portfolio" className="block px-8 py-2 text-gray-700 hover:text-blue-600 transition-colors">سبد پیشنهادی</Link>
              <Link to="/products/codal" className="block px-8 py-2 text-gray-700 hover:text-blue-600 transition-colors">کدال پلاس</Link>
              <Link to="/products/options" className="block px-8 py-2 text-gray-700 hover:text-blue-600 transition-colors">اختیار معامله</Link>
            </div>
          </li>
          <li>
            <Link to="/prices" className={`block px-4 py-3 ${activePath === '/prices' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' : 'text-gray-800'} hover:bg-blue-50 hover:text-blue-600 transition-all duration-200`}>قیمت‌ها</Link>
          </li>
          <li>
            <Link to="/academy" className={`block px-4 py-3 ${activePath === '/academy' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' : 'text-gray-800'} hover:bg-blue-50 hover:text-blue-600 transition-all duration-200`}>آکادمی</Link>
          </li>
          <li>
            <Link to="/articles" className={`block px-4 py-3 ${activePath === '/articles' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' : 'text-gray-800'} hover:bg-blue-50 hover:text-blue-600 transition-all duration-200`}>مقاله‌ها</Link>
          </li>
          <li>
            <Link to="/about" className={`block px-4 py-3 ${activePath === '/about' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' : 'text-gray-800'} hover:bg-blue-50 hover:text-blue-600 transition-all duration-200`}>درباره ما</Link>
          </li>
          <li>
            <Link to="/contact" className={`block px-4 py-3 ${activePath === '/contact' ? 'text-blue-600 bg-blue-50 border-r-4 border-blue-600' : 'text-gray-800'} hover:bg-blue-50 hover:text-blue-600 transition-all duration-200`}>تماس با ما</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header; 