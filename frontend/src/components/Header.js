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
            لادیس
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
                <div className="absolute top-full right-0 mt-3 w-[600px] bg-theme-main text-theme-accent shadow-2xl rounded-2xl p-6 animate-fadeIn z-50 border border-theme-accent" style={{transformOrigin: 'top center'}}>
                  <div className="col-span-2">
                    <ul className=" " dir='rtl'>
                      <li>
                        <Link to="/products/intro" className="flex items-center text-theme-accent hover:text-theme-accent3 transition-colors py-2 pr-4 rounded-lg justify-start text-right">
                          <span className="p-2 rounded-full bg-theme-accent text-theme-accent3 flex-shrink-0 ml-2">📦</span>
                          <span className="font-medium">معرفی محصولات</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/articles" className="flex items-center text-theme-accent hover:text-theme-accent3 transition-colors py-2 pr-4 rounded-lg justify-start text-right">
                          <span className="p-2 rounded-full bg-theme-accent text-theme-accent3 flex-shrink-0 ml-2">📚</span>
                          <span className="font-medium">مقالات آموزشی و تخصصی</span>
                        </Link>
                      </li>
                      <li>
                        <div className="flex items-center text-theme-accent/70 cursor-not-allowed py-2 pr-4 rounded-lg justify-start text-right">
                          <span className="p-2 rounded-full bg-theme-accent text-theme-accent3 flex-shrink-0 ml-2">🏦</span>
                          <span>
                            <span className="font-medium flex items-center gap-2">تحلیل صندوق‌های سرمایه‌گذاری <span className="text-xs bg-theme-accent2 text-theme-dark px-2 py-0.5 rounded">به زودی</span></span>
                            <div className="text-xs text-theme-accent/80 mt-1">تحلیل عملکرد و وضعیت انواع صندوق‌های سرمایه‌گذاری</div>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center text-theme-accent/70 cursor-not-allowed py-2 pr-4 rounded-lg justify-start text-right">
                          <span className="p-2 rounded-full bg-theme-accent text-theme-accent3 flex-shrink-0 ml-2">📝</span>
                          <span>
                            <span className="font-medium flex items-center gap-2">اختیار معامله <span className="text-xs bg-theme-accent2 text-theme-dark px-2 py-0.5 rounded">به زودی</span></span>
                            <div className="text-xs text-theme-accent/80 mt-1">تحلیل عملکرد و وضعیت انواع صندوق‌های سرمایه‌گذاری</div>
                          </span>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center text-theme-accent/70 cursor-not-allowed py-2 pr-4 rounded-lg justify-start text-right">
                          <span className="p-2 rounded-full bg-theme-accent text-theme-accent3 flex-shrink-0 ml-2">📄</span>
                          <span>
                            <span className="font-medium flex items-center gap-2">کدال <span className="text-xs bg-theme-accent2 text-theme-dark px-2 py-0.5 rounded">به زودی</span></span>
                            <div className="text-xs text-theme-accent/80 mt-1">ارائه کامل گزارشات کدال</div>
                          </span>
                        </div>
                      </li>
                    
                    </ul>
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
              <div className="bg-navy-dark border-t border-gold px-6 py-4 animate-fadeIn">
                <ul className="space-y-2 text-right">
                  <li>
                    <Link to="/products/intro" className="flex items-center text-gold hover:text-navy transition-colors py-2 pr-4 rounded-lg justify-start text-right"> <span className="p-2 rounded-full bg-gold text-navy flex-shrink-0 mr-2">📦</span> <span>معرفی محصولات</span></Link>
                  </li>
                  <li>
                    <Link to="/articles" className="flex items-center text-gold hover:text-navy transition-colors py-2 pr-4 rounded-lg justify-start text-right"> <span className="p-2 rounded-full bg-gold text-navy flex-shrink-0 mr-2">📚</span> <span>مقالات آموزشی و تخصصی</span></Link>
                  </li>
                  <li>
                    <span className="flex items-center text-gold/60 cursor-not-allowed py-2 pr-4 rounded-lg justify-start text-right"> <span className="p-2 rounded-full bg-gold text-navy flex-shrink-0 mr-2">🏦</span> تحلیل صندوق‌های سرمایه‌گذاری <span className="text-xs bg-gold/30 text-navy px-2 py-0.5 rounded mr-2">به زودی</span></span>
                    <div className="text-xs text-gold/50 text-right pr-10">تحلیل عملکرد و وضعیت انواع صندوق‌های سرمایه‌گذاری</div>
                  </li>
                  <li>
                    <span className="flex items-center text-gold/60 cursor-not-allowed py-2 pr-4 rounded-lg justify-start text-right"> <span className="p-2 rounded-full bg-gold text-navy flex-shrink-0 mr-2">📝</span> اختیار معامله <span className="text-xs bg-gold/30 text-navy px-2 py-0.5 rounded mr-2">به زودی</span></span>
                    <div className="text-xs text-gold/50 text-right pr-10">تحلیل عملکرد و وضعیت انواع صندوق‌های سرمایه‌گذاری</div>
                  </li>
                  <li>
                    <span className="flex items-center text-gold/60 cursor-not-allowed py-2 pr-4 rounded-lg justify-start text-right"> <span className="p-2 rounded-full bg-gold text-navy flex-shrink-0 mr-2">📄</span> کدال <span className="text-xs bg-gold/30 text-navy px-2 py-0.5 rounded mr-2">به زودی</span></span>
                    <div className="text-xs text-gold/50 text-right pr-10">ارائه کامل گزارشات کدال</div>
                  </li>
                  <li>
                    <Link to="/contact" className="flex items-center text-gold hover:text-navy transition-colors py-2 pr-4 rounded-lg justify-start text-right"> <span className="p-2 rounded-full bg-gold text-navy flex-shrink-0 mr-2">☎️</span> <span>تماس با کارشناسان</span></Link>
                  </li>
                </ul>
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