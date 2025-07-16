import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.js';

function Header() {
  // const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [productMenuOpen, setProductMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Handle scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setProductMenuOpen(false);
      }
    }
    if (productMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [productMenuOpen]);

  const navLinks = [
    { to: '/', label: 'خانه', match: (path) => path === '/' },
    { to: '/prices', label: 'قیمت‌ها', match: (path) => path.startsWith('/prices') },
    { to: '/academy', label: 'آکادمی', match: (path) => path.startsWith('/academy') },
    { to: '/articles', label: 'مقاله‌ها', match: (path) => path.startsWith('/articles') },
    { to: '/about', label: 'درباره ما', match: (path) => path.startsWith('/about') },
    { to: '/contact', label: 'تماس با ما', match: (path) => path.startsWith('/contact') },
  ];

  const isActive = (item) => item.match(location.pathname);

  const handleExit = () => {
    navigate('/');
  };

  return (
    <header className="bg-theme-main text-theme-accent h-14 sticky top-0 z-50 w-full transition-all duration-300" style={{fontFamily: 'Vazir, tahoma, Arial, sans-serif'}} dir="ltr">
      <div className="w-full px-4 md:px-8 flex flex-row-reverse items-center justify-between h-14">
        {/* Logo */}
        <button onClick={() => navigate('/')} className="flex items-center text-theme-accent font-bold text-xl tracking-wide select-none px-2 rounded-lg hover:bg-theme-accent/10 transition order-1 h-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-theme-accent transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 12h2v9H2v-9zm3-8h2v17H5V4zm3 4h2v13H8V8zm3-4h2v17h-2V4zm3 8h2v9h-2v-9zm3-8h2v17h-2V4z" />
          </svg>
          <span className="relative group leading-[48px]">
            تحلیل بورس
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-theme-accent rounded transition-all duration-300 group-hover:w-full"></span>
          </span>
        </button>
        {/* Desktop Nav */}
        <nav className="hidden md:flex flex-1 justify-end order-2" ref={navRef}>
          <ul className="flex flex-row-reverse items-center h-14">
            <li className="relative group h-full flex items-center">
              <button
                className={`flex items-center font-medium px-4 rounded-xl transition-colors duration-200 hover:bg-theme-accent/10 focus:outline-none h-12 ${productMenuOpen ? 'text-theme-accent' : 'text-theme-accent4/80'}`}
                onClick={() => setProductMenuOpen((v) => !v)}
                style={{height: '48px'}}
              >
                محصولات
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 mr-1 transition-transform duration-300 ${productMenuOpen ? 'rotate-180' : ''} text-theme-accent`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-theme-accent transition-all duration-300 group-hover:w-full"></span>
              </button>
              {/* Mega Menu */}
              {productMenuOpen && (
                <div className="absolute top-full right-0 mt-3 w-[600px] bg-theme-main text-theme-accent shadow-2xl rounded-2xl p-6 grid grid-cols-2 gap-6 animate-fadeIn z-50 border border-theme-accent" style={{transformOrigin: 'top center'}}>
                  <div>
                    <h3 className="text-lg font-bold text-theme-accent mb-4 border-r-4 border-theme-accent pr-2">محصولات اصلی</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link to="/products/fundamental" className="flex items-center text-theme-accent hover:text-theme-accent3 transition-colors">
                          <div className="ml-2 p-2 rounded-full bg-theme-accent text-theme-accent3">📊</div>
                          <div>
                            <div className="font-medium">تحلیل بنیادی</div>
                            <div className="text-xs text-theme-accent/80">تحلیل بنیادی بیش از ۳۰۰ شرکت تولیدی</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/nav" className="flex items-center text-theme-accent hover:text-theme-accent3 transition-colors">
                          <div className="ml-2 p-2 rounded-full bg-theme-accent text-theme-accent3">📈</div>
                          <div>
                            <div className="font-medium">تحلیل NAV</div>
                            <div className="text-xs text-theme-accent/80">تحلیل لحظه‌ای NAV شرکت‌های سرمایه‌گذاری</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/shareholders" className="flex items-center text-theme-accent hover:text-theme-accent3 transition-colors">
                          <div className="ml-2 p-2 rounded-full bg-theme-accent text-theme-accent3">👥</div>
                          <div>
                            <div className="font-medium">سهامداران</div>
                            <div className="text-xs text-theme-accent/80">اطلاعات کامل سهامداران و معاملات آنها</div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-theme-accent mb-4 border-r-4 border-theme-accent pr-2">محصولات ویژه</h3>
                    <ul className="space-y-3">
                      <li>
                        <Link to="/products/portfolio" className="flex items-center text-theme-accent hover:text-theme-accent3 transition-colors">
                          <div className="ml-2 p-2 rounded-full bg-theme-accent text-theme-accent3">💼</div>
                          <div>
                            <div className="font-medium">سبد پیشنهادی</div>
                            <div className="text-xs text-theme-accent/80">سبد سهام پیشنهادی با بازدهی بالا</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/codal" className="flex items-center text-theme-accent hover:text-theme-accent3 transition-colors">
                          <div className="ml-2 p-2 rounded-full bg-theme-accent text-theme-accent3">📝</div>
                          <div>
                            <div className="font-medium">کدال پلاس</div>
                            <div className="text-xs text-theme-accent/80">دسترسی کامل به گزارش‌های کدال</div>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link to="/products/options" className="flex items-center text-theme-accent hover:text-theme-accent3 transition-colors">
                          <div className="ml-2 p-2 rounded-full bg-theme-accent text-theme-accent3">🔄</div>
                          <div>
                            <div className="font-medium">اختیار معامله</div>
                            <div className="text-xs text-theme-accent/80">ابزارهای تحلیل اختیار معامله</div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="col-span-2 mt-4 p-3 bg-gradient-to-r from-theme-main to-theme-accent3 rounded-lg border border-theme-accent">
                    <p className="text-center text-sm text-theme-accent">
                      مشاوره رایگان و تخصصی برای انتخاب بهترین بسته متناسب با نیاز شما
                      <Link to="/contact" className="mr-2 inline-flex items-center text-theme-accent font-medium hover:underline">
                        تماس با کارشناسان
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </li>
            {navLinks.map((item, idx) => (
              <li key={item.to} className="relative group h-full flex items-center">
                <Link
                  to={item.to}
                  className={`font-medium px-4 rounded-xl transition-colors duration-200 h-12 flex items-center ${isActive(item) ? 'bg-theme-accent text-theme-accent3' : 'text-theme-accent4/80 hover:text-theme-accent hover:bg-theme-accent/10'}`}
                  style={{height: '48px'}}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-1 bg-theme-accent rounded transition-all duration-300 group-hover:w-full ${isActive(item) ? 'w-full' : 'w-0'}`}></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
   
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-theme-accent focus:outline-none h-12 flex items-center"
          onClick={() => setMenuOpen((v) => !v)}
          style={{height: '48px'}}
        >
          <div className="w-7 h-7 flex flex-col justify-between items-center">
            <span className={`w-full h-0.5 bg-theme-accent transform transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
            <span className={`w-full h-0.5 bg-theme-accent transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`w-full h-0.5 bg-theme-accent transform transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
          </div>
        </button>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-theme-main shadow-2xl border-t border-theme-accent mt-2 transition-all duration-300 ease-in-out overflow-hidden ${menuOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <ul className="py-2">
          <li>
            <button
              className="w-full text-right px-6 py-3 text-theme-accent font-bold hover:bg-theme-accent/10 transition"
              onClick={() => setProductMenuOpen((v) => !v)}
            >
              محصولات
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 inline ml-2 transition-transform duration-300 ${productMenuOpen ? 'rotate-180' : ''} text-theme-accent`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {/* Mobile Mega Menu */}
            {productMenuOpen && (
              <div className="bg-navy-dark border-t border-gold px-6 py-4 grid grid-cols-1 gap-4 animate-fadeIn">
                <div>
                  <h3 className="text-base font-bold text-gold mb-2 border-r-4 border-gold pr-2">محصولات اصلی</h3>
                  <ul className="space-y-2">
                    <li><Link to="/products/fundamental" className="block text-gold hover:text-navy transition-colors">تحلیل بنیادی</Link></li>
                    <li><Link to="/products/nav" className="block text-gold hover:text-navy transition-colors">تحلیل NAV</Link></li>
                    <li><Link to="/products/shareholders" className="block text-gold hover:text-navy transition-colors">سهامداران</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-base font-bold text-gold mb-2 border-r-4 border-gold pr-2">محصولات ویژه</h3>
                  <ul className="space-y-2">
                    <li><Link to="/products/portfolio" className="block text-gold hover:text-navy transition-colors">سبد پیشنهادی</Link></li>
                    <li><Link to="/products/codal" className="block text-gold hover:text-navy transition-colors">کدال پلاس</Link></li>
                    <li><Link to="/products/options" className="block text-gold hover:text-navy transition-colors">اختیار معامله</Link></li>
                  </ul>
                </div>
                <div className="col-span-2 mt-2 p-2 bg-gradient-to-r from-navy to-navy-dark rounded-lg border border-gold">
                  <p className="text-center text-xs text-gold">
                    مشاوره رایگان و تخصصی برای انتخاب بهترین بسته متناسب با نیاز شما
                    <Link to="/contact" className="mr-2 inline-flex items-center text-gold font-medium hover:underline">
                      تماس با کارشناسان
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </p>
                </div>
              </div>
            )}
          </li>
          {navLinks.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`block px-6 py-3 rounded-xl font-medium transition-colors duration-200 ${isActive(item) ? 'text-navy bg-gold' : 'text-gold/80 hover:text-gold hover:bg-gold/10'}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Header; 