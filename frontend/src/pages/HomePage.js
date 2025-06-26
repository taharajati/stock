import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { initScrollRevealAnimations, createRippleEffect } from '../utils/animationUtils.js';

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);
  
  // Counter state for statistics
  const [counts, setCounts] = useState({
    users: 0,
    individuals: 0,
    companies: 0
  });
  
  // Target values for the counters
  const targetCounts = {
    users: 15000,
    individuals: 5000,
    companies: 100
  };
  
  const heroSlides = [
    {
      title: "سرعت تحلیل خود را ۱۰۰ برابر کنید",
      description: "دسترسی به ابزارهای هوشمند تحلیل بازار سرمایه"
    },
    {
      title: "سودآوری خود را در بورس افزایش دهید",
      description: "با استفاده از تحلیل‌های دقیق و به‌روز"
    },
    {
      title: "به اطلاعات خاص بازار دسترسی داشته باشید",
      description: "کامل‌ترین داده‌های مالی شرکت‌ها و بازار سرمایه"
    }
  ];
  
  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollRevealAnimations();
    
    // Auto rotate hero slides
    const slideInterval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    
    // Parallax effect on scroll
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setParallaxY(scrollPosition * 0.15); // Adjust the multiplier for speed
      
      // Check if stats section is visible
      if (statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible && !statsVisible) {
          setStatsVisible(true);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      cleanup();
      clearInterval(slideInterval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [heroSlides.length, statsVisible]);
  
  // Count up animation for statistics
  useEffect(() => {
    if (statsVisible) {
      const duration = 2000; // ms
      const interval = 16; // ms (60fps)
      const steps = duration / interval;
      
      const increments = {
        users: targetCounts.users / steps,
        individuals: targetCounts.individuals / steps,
        companies: targetCounts.companies / steps
      };
      
      let currentStep = 0;
      
      const timer = setInterval(() => {
        currentStep++;
        
        setCounts(prevCounts => ({
          users: Math.min(Math.round(increments.users * currentStep), targetCounts.users),
          individuals: Math.min(Math.round(increments.individuals * currentStep), targetCounts.individuals),
          companies: Math.min(Math.round(increments.companies * currentStep), targetCounts.companies)
        }));
        
        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [statsVisible]);
  
  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="rtl">
      {/* Hero Section with Carousel */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-800 via-blue-600 to-blue-700 text-white min-h-[90vh] flex items-center">
        {/* Animated Background Elements with Parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 -mr-20 -mt-20 animate-pulse-slow"
            style={{ transform: `translateY(${parallaxY * 0.5}px)` }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full opacity-20 -ml-40 -mb-40 animate-pulse-slow" 
            style={{ animationDelay: '1s', transform: `translateY(${-parallaxY * 0.3}px)` }}
          ></div>
          <div 
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-float" 
            style={{ animationDelay: '0.5s', transform: `translateY(${parallaxY * 0.7}px)` }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-30 animate-float" 
            style={{ animationDelay: '1.5s', transform: `translateY(${-parallaxY * 0.6}px)` }}
          ></div>
          <div 
            className="absolute top-3/4 left-1/2 w-8 h-8 bg-blue-300 rounded-full opacity-30 animate-float" 
            style={{ animationDelay: '1s', transform: `translateY(${parallaxY * 0.4}px)` }}
          ></div>
          
          {/* Grid Pattern with subtle parallax */}
          <div 
            className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHY2QTEyIDEyIDAgMDAzMCAxOGg2eiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-10"
            style={{ transform: `translateY(${parallaxY * 0.1}px)` }}
          ></div>
          
          {/* Light Flare with parallax */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-400 rounded-full opacity-20 blur-3xl"
            style={{ transform: `translate(-50%, ${parallaxY * 0.2}px)` }}
          ></div>
        </div>
        
        <div className="w-full px-4 relative z-10 py-20">
          <div className="max-w-7xl mx-auto">
            {/* Content Container */}
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* Text Content */}
              <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-right">
                <div className="relative mb-8">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8 fade-in text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">
                    با تحلیل بورس؛
                  </h1>
                  
                  {/* Carousel Container */}
                  <div className="relative h-24 md:h-32 overflow-hidden">
                    {heroSlides.map((slide, index) => (
                      <div 
                        key={index}
                        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                          index === activeSlide 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10 pointer-events-none'
                        }`}
                      >
                        <h2 className="text-2xl md:text-4xl font-bold">
                          {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl mt-2 text-blue-100 opacity-90">
                          {slide.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-10">
                  <Link 
                    to="/login"
                    className="btn-shine relative overflow-hidden bg-white text-blue-700 hover:bg-blue-50 py-4 px-10 rounded-lg text-lg md:text-xl font-bold transition duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    onClick={createRippleEffect}
                  >
                    ثبت‌ نام
                  </Link>
                </div>
                
                {/* Slide Indicators */}
                <div className="flex justify-center md:justify-start space-x-2 space-x-reverse mt-8">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeSlide ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'
                      }`}
                      onClick={() => handleSlideChange(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Hero Image/Graphic */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]" style={{ transform: `translateY(${-parallaxY * 0.2}px)` }}>
                  {/* Main circle */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-spin-slow"></div>
                  
                  {/* Inner circles */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full border-2 border-white/15 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 rounded-full border border-white/10 animate-spin-slow" style={{ animationDuration: '10s' }}></div>
                  
                  {/* Orbiting Elements */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 animate-spin-slow" style={{ animationDuration: '20s' }}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400/30 to-indigo-600/30 backdrop-blur-md rotate-45 shadow-lg flex items-center justify-center border border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 -rotate-45 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 animate-spin-slow" style={{ animationDuration: '25s', animationDelay: '1s' }}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400/30 to-indigo-600/30 backdrop-blur-md rotate-45 shadow-lg flex items-center justify-center border border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 -rotate-45 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 animate-spin-slow" style={{ animationDuration: '30s', animationDelay: '2s' }}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400/30 to-indigo-600/30 backdrop-blur-md rotate-45 shadow-lg flex items-center justify-center border border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 -rotate-45 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 animate-spin-slow" style={{ animationDuration: '35s', animationDelay: '3s' }}>
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400/30 to-indigo-600/30 backdrop-blur-md rotate-45 shadow-lg flex items-center justify-center border border-white/10">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 -rotate-45 text-white drop-shadow-md" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Center Icon */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-600/20 backdrop-blur-md flex items-center justify-center shadow-2xl border border-white/20 animate-pulse-slow">
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-500/10 to-indigo-600/10 blur-sm"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 21H4.6C3.17 21 2 19.83 2 18.4V4" />
                      <path d="M21 7L13 15L9 11L3 17" />
                      <path d="M21 12V7H16" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#f9fafb" fillOpacity="1" d="M0,128L48,149.3C96,171,192,213,288,224C384,235,480,213,576,181.3C672,149,768,107,864,106.7C960,107,1056,149,1152,165.3C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Statistics Section */}
      <section ref={statsRef} className="py-16 bg-gray-50">
        <div className="w-full px-6 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 reveal reveal-top">مشتریان تحلیل بورس</h2>
          <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto reveal reveal-bottom">
            آیا می‌دانستید %80 افرادی که بیش از 100 میلیارد تومان در بورس دارایی دارند از تحلیل بورس استفاده می‌کنند؟
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white rounded-xl p-10 shadow-lg flex flex-col items-center justify-center text-center reveal reveal-left scale-hover transition-all duration-500">
              <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse-slow"></div>
                <div className="absolute inset-2 rounded-full bg-blue-50 border border-blue-200"></div>
                <div className="text-5xl font-bold text-blue-600 relative z-10">
                  {counts.users.toLocaleString()}+
                </div>
              </div>
              <div className="text-xl font-medium text-gray-700">کاربر فعال</div>
            </div>
            
            <div className="bg-white rounded-xl p-10 shadow-lg flex flex-col items-center justify-center text-center reveal reveal-bottom scale-hover transition-all duration-500" style={{ transitionDelay: '0.1s' }}>
              <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse-slow" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute inset-2 rounded-full bg-blue-50 border border-blue-200"></div>
                <div className="text-5xl font-bold text-blue-600 relative z-10">
                  {counts.individuals.toLocaleString()}+
                </div>
              </div>
              <div className="text-xl font-medium text-gray-700">مشتری حقیقی</div>
            </div>
            
            <div className="bg-white rounded-xl p-10 shadow-lg flex flex-col items-center justify-center text-center reveal reveal-right scale-hover transition-all duration-500" style={{ transitionDelay: '0.2s' }}>
              <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-blue-100 animate-pulse-slow" style={{ animationDelay: '0.6s' }}></div>
                <div className="absolute inset-2 rounded-full bg-blue-50 border border-blue-200"></div>
                <div className="text-5xl font-bold text-blue-600 relative z-10">
                  {counts.companies.toLocaleString()}+
                </div>
              </div>
              <div className="text-xl font-medium text-gray-700">مشتری حقوقی</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gradient-to-br from-white to-blue-50 relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute top-1/3 right-0 w-72 h-72 bg-blue-300 rounded-full opacity-10 -mr-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-400 rounded-full opacity-10 -ml-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-blue-200 rounded-full opacity-20 transform -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        
        <div className="w-full px-3 relative z-10">
          <h2 className="text-3xl font-bold mb-5 text-center text-gray-800 reveal reveal-top">محصولات تحلیل بورس</h2>
          <p className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto reveal reveal-bottom" style={{ transitionDelay: '0.1s' }}>
            مرجع تحلیل بنیادی بورس ایران و ارائه‌دهنده ابزارهای پیشرفته تحلیل بازار سرمایه
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/80 relative overflow-hidden reveal reveal-left transform transition-all duration-500 hover:scale-105 hover:shadow-blue-100" style={{ transitionDelay: '0.1s' }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-2xl"></div>
              <div className="text-blue-600 mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg transform -rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 opacity-30 blur-lg transform -rotate-6"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">تحلیل بنیادی</h3>
              <p className="text-gray-600 mb-6">تحلیل بنیادی بیش از ۳۰۰ شرکت تولیدی با قابلیت تغییر مفروضات و شخصی‌سازی</p>
              <Link to="/login" className="text-blue-600 font-medium flex items-center group">
                <span className="group-hover:mr-2 transition-all duration-300">مشاهده بیشتر</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/80 relative overflow-hidden reveal reveal-bottom transform transition-all duration-500 hover:scale-105 hover:shadow-blue-100" style={{ transitionDelay: '0.2s' }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-2xl"></div>
              <div className="text-blue-600 mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg transform -rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 opacity-30 blur-lg transform -rotate-6"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">سبد پیشنهادی</h3>
              <p className="text-gray-600 mb-6">پیشنهاد سبد سهام با سود بالا و ریسک کم همراه با تحلیل سهم‌های پیشنهادشده</p>
              <Link to="/login" className="text-blue-600 font-medium flex items-center group">
                <span className="group-hover:mr-2 transition-all duration-300">مشاهده بیشتر</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/80 relative overflow-hidden reveal reveal-right transform transition-all duration-500 hover:scale-105 hover:shadow-blue-100" style={{ transitionDelay: '0.3s' }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-2xl"></div>
              <div className="text-blue-600 mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg transform -rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 opacity-30 blur-lg transform -rotate-6"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">تحلیل NAV</h3>
              <p className="text-gray-600 mb-6">تحلیل لحظه‌ای NAV بیش از ۱۰۰ شرکت سرمایه‌گذاری و ارزش‌گذاری پیوسته پورتفوی</p>
              <Link to="/login" className="text-blue-600 font-medium flex items-center group">
                <span className="group-hover:mr-2 transition-all duration-300">مشاهده بیشتر</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/80 relative overflow-hidden reveal reveal-left transform transition-all duration-500 hover:scale-105 hover:shadow-blue-100" style={{ transitionDelay: '0.4s' }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-2xl"></div>
              <div className="text-blue-600 mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg transform -rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 opacity-30 blur-lg transform -rotate-6"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">سهامداران</h3>
              <p className="text-gray-600 mb-6">مشاهده لیست سهامداران شرکت‌ها، عملکرد و بازدهی سهامداران و بازیگران بازار</p>
              <Link to="/login" className="text-blue-600 font-medium flex items-center group">
                <span className="group-hover:mr-2 transition-all duration-300">مشاهده بیشتر</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/80 relative overflow-hidden reveal reveal-bottom transform transition-all duration-500 hover:scale-105 hover:shadow-blue-100" style={{ transitionDelay: '0.5s' }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-2xl"></div>
              <div className="text-blue-600 mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg transform -rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 opacity-30 blur-lg transform -rotate-6"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">کدال پلاس</h3>
              <p className="text-gray-600 mb-6">دسترسی به گزارش‌ها، صورت‌های مالی و تمامی اطلاعیه‌های کدال شرکت‌ها</p>
              <Link to="/login" className="text-blue-600 font-medium flex items-center group">
                <span className="group-hover:mr-2 transition-all duration-300">مشاهده بیشتر</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/80 relative overflow-hidden reveal reveal-right transform transition-all duration-500 hover:scale-105 hover:shadow-blue-100" style={{ transitionDelay: '0.6s' }}>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-2xl"></div>
              <div className="text-blue-600 mb-6 relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg transform -rotate-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 opacity-30 blur-lg transform -rotate-6"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">اخبار بازار</h3>
              <p className="text-gray-600 mb-6">آخرین اخبار و تحلیل‌های بازار سرمایه و شرکت‌ها از منابع معتبر</p>
              <Link to="/login" className="text-blue-600 font-medium flex items-center group">
                <span className="group-hover:mr-2 transition-all duration-300">مشاهده بیشتر</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Plan Section with animations */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50 relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-10 -mr-20 -mt-20 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full opacity-10 -ml-40 -mb-40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-20 animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="w-full px-3 relative z-10">
          <h2 className="text-3xl font-bold mb-5 text-center text-gray-800 reveal reveal-top">سبد سهام پیشنهادی ویژه</h2>
          <p className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto reveal reveal-bottom" style={{ transitionDelay: '0.1s' }}>
            سبد پیشنهادی با سود بالا و ریسک کم، همراه با تحلیل سهم‌های پیشنهادشده
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl relative overflow-hidden reveal reveal-left transform transition-all duration-500 hover:scale-105 hover:shadow-blue-200" style={{ transitionDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-pattern opacity-10"></div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-400 rounded-full opacity-20 blur-2xl"></div>
              
              <div className="absolute top-0 left-0 bg-blue-500 text-white py-2 px-8 text-sm font-bold rounded-br-lg shadow-md backdrop-blur-sm">
                پیشنهاد ویژه
              </div>
              
              <div className="p-8 relative z-10 text-white">
                <h3 className="text-3xl font-bold mb-6 text-center">حقیقی‌ها</h3>
                
                <ul className="space-y-6 mb-8">
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-500/30 backdrop-blur-sm flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/90">پیشنهاد سبد سهام با سود بالا و ریسک کم</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-500/30 backdrop-blur-sm flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/90">پیشنهاد فروش و تخصیص سرمایه</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-500/30 backdrop-blur-sm flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/90">ارائه تحلیل سهم‌های پیشنهادشده</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-500/30 backdrop-blur-sm flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-white/90">تعیین هدف قیمتی</span>
                  </li>
                </ul>
                
                <div className="flex justify-between items-center p-4 mb-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-white/90">بازده پرتفوی سهام پیشنهادی</div>
                  <div className="text-2xl font-bold text-green-400">+۶۸٪</div>
                </div>
                
                <div className="flex justify-between items-center p-4 mb-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <div className="text-white/90">بازده شاخص</div>
                  <div className="text-2xl font-bold text-red-400">-۱۲٪</div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center items-end mb-6">
                    <span className="text-4xl font-bold">۳,۰۰۰,۰۰۰</span>
                    <span className="mr-2 text-white/80 text-lg">تومان / ماهانه</span>
                  </div>
                  
                  <Link to="/login" 
                        className="block w-full bg-white hover:bg-blue-50 text-blue-700 py-4 rounded-xl text-center font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-white/20">
                    افزودن به سبد خرید
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-2xl backdrop-blur-md relative overflow-hidden reveal reveal-right transform transition-all duration-500 hover:scale-105 hover:shadow-blue-200" style={{ transitionDelay: '0.3s' }}>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-40 blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-40 blur-2xl"></div>
              
              <div className="p-8 relative z-10">
                <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">حقوقی‌ها</h3>
                <p className="text-center text-gray-600 mb-8">
                  دسترسی کامل به تمام محصولات تحلیل بورس، شامل:
                </p>
                
                <ul className="space-y-6 mb-8">
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">تحلیل بنیادی بیش از ۳۰۰ شرکت تولیدی</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">تحلیل لحظه‌ای NAV شرکت‌های سرمایه‌گذاری</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">مشاهده لیست سهامداران شرکت‌ها</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">کدال پلاس و دسترسی به تمامی اطلاعیه‌ها</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">سبد پیشنهادی ویژه حقوقی‌ها</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <div className="flex justify-center items-end mb-6">
                    <span className="text-4xl font-bold text-gray-800">۹۰,۰۰۰,۰۰۰</span>
                    <span className="mr-2 text-gray-600 text-lg">تومان / سالانه</span>
                  </div>
                  
                  <Link to="/login" 
                        className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl text-center font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-blue-200/50">
                    افزودن به سبد خرید
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-2xl backdrop-blur-md relative overflow-hidden reveal reveal-right transform transition-all duration-500 hover:scale-105 hover:shadow-blue-200" style={{ transitionDelay: '0.3s' }}>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-40 blur-2xl"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-100 rounded-full opacity-40 blur-2xl"></div>
              
              <div className="p-8 relative z-10">
                <h3 className="text-3xl font-bold mb-6 text-center text-gray-800">حقوقی‌ها</h3>
                <p className="text-center text-gray-600 mb-8">
                  دسترسی کامل به تمام محصولات تحلیل بورس، شامل:
                </p>
                
                <ul className="space-y-6 mb-8">
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">تحلیل بنیادی بیش از ۳۰۰ شرکت تولیدی</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">تحلیل لحظه‌ای NAV شرکت‌های سرمایه‌گذاری</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">مشاهده لیست سهامداران شرکت‌ها</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">کدال پلاس و دسترسی به تمامی اطلاعیه‌ها</span>
                  </li>
                  <li className="flex items-center">
                    <div className="ml-4 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700">سبد پیشنهادی ویژه حقوقی‌ها</span>
                  </li>
                </ul>
                
                <div className="text-center">
                  <div className="flex justify-center items-end mb-6">
                    <span className="text-4xl font-bold text-gray-800">۹۰,۰۰۰,۰۰۰</span>
                    <span className="mr-2 text-gray-600 text-lg">تومان / سالانه</span>
                  </div>
                  
                  <Link to="/login" 
                        className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl text-center font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-blue-200/50">
                    افزودن به سبد خرید
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section with animations */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
        {/* Background design elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full opacity-20 -ml-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300 rounded-full opacity-10 -mr-40 -mb-40 blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-400 rounded-full opacity-20 blur-xl"></div>
        
        <div className="w-full px-3 relative z-10">
          <h2 className="text-3xl font-bold mb-5 text-center text-gray-800 reveal reveal-top">آخرین مقالات</h2>
          <p className="text-center text-lg text-gray-600 mb-16 max-w-3xl mx-auto reveal reveal-bottom" style={{ transitionDelay: '0.1s' }}>
            آخرین مقالات آموزشی و تحلیلی در حوزه بازار سرمایه
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 reveal reveal-left" style={{ transitionDelay: '0.2s' }}>
              <div className="h-56 relative overflow-hidden group">
                <img 
                  src="https://via.placeholder.com/600x400/eef2ff/6366f1?text=تحلیل+بنیادی" 
                  alt="تحلیل بنیادی چیست؟" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6 relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-full shadow-lg">
                  جدید
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">تحلیل بنیادی چیست؟ راهنمای کامل برای مبتدیان</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  در این مقاله به بررسی مفهوم تحلیل بنیادی در بازار سرمایه و نحوه استفاده از آن برای تحلیل سهام می‌پردازیم.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-700 py-1 px-2 rounded-full">۵ اردیبهشت ۱۴۰۳</span>
                  <Link to="/articles/1" className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group">
                    <span className="group-hover:mr-1 transition-all duration-300">ادامه مطلب</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 reveal reveal-bottom" style={{ transitionDelay: '0.3s' }}>
              <div className="h-56 relative overflow-hidden group">
                <img 
                  src="https://via.placeholder.com/600x400/e0f2fe/0284c7?text=معاملات+شرطی" 
                  alt="معاملات شرطی در بورس" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-bold mb-3 text-gray-800">معاملات شرطی در بورس و کاهش ریسک معاملات</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  معاملات شرطی چیست و چگونه می‌تواند به کاهش ریسک معاملات در بازار سرمایه کمک کند؟ در این مقاله می‌خوانید.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-700 py-1 px-2 rounded-full">۲ اردیبهشت ۱۴۰۳</span>
                  <Link to="/articles/2" className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group">
                    <span className="group-hover:mr-1 transition-all duration-300">ادامه مطلب</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 reveal reveal-right" style={{ transitionDelay: '0.4s' }}>
              <div className="h-56 relative overflow-hidden group">
                <img 
                  src="https://via.placeholder.com/600x400/fef2f2/dc2626?text=تحلیل+سنتیمنتال" 
                  alt="تحلیل سنتیمنتال" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-bold mb-3 text-gray-800">تحلیل سنتیمنتال چیست؟ روش‌های تحلیل احساسات بازار</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  آشنایی با مفهوم تحلیل سنتیمنتال و روش‌های تحلیل احساسات بازار سرمایه و تاثیر آن بر قیمت سهام.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-blue-100 text-blue-700 py-1 px-2 rounded-full">۲۸ فروردین ۱۴۰۳</span>
                  <Link to="/articles/3" className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group">
                    <span className="group-hover:mr-1 transition-all duration-300">ادامه مطلب</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transform rotate-180 group-hover:-translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16 reveal reveal-bottom" style={{ transitionDelay: '0.5s' }}>
            <Link to="/articles" className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-3 px-10 rounded-xl text-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg shadow-blue-200/50">
              مشاهده همه مقالات
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage; 