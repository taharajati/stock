import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { initScrollRevealAnimations, createRippleEffect } from '../utils/animationUtils.js';
import AnimatedCard from '../components/common/AnimatedCard.jsx';
import AnimatedButton from '../components/common/AnimatedButton.jsx';

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
      title: "تحلیل‌های ما از صندوق‌های سرمایه‌گذاری هم دقیق‌تر است!",
      description: "هر عددی در بورس، یک داستان دارد... ما آن را روایت می‌کنیم!"
    },
    {
      title: "کدال خوانی را به هوش مصنوعی ما بسپار، خودت نتیجه را ببین!",
      description: "پرتفوی تو زیر ذره‌بینِ هوش مصنوعی ماست!"
    },
    {
      title: "گزارشات اختصاصی؟ فقط یک کلیک فاصله داری!",
      description: "تصمیم‌های بزرگ از تحلیل‌های دقیق آغاز می‌شوند."
    }
  ];
  
  const products = [
    {
      title: "تحلیل بنیادی",
      shortDesc: "تحلیل بنیادی بیش از ۳۰۰ شرکت تولیدی با قابلیت تغییر مفروضات و شخصی‌سازی",
      fullDesc: "دسترسی به صورت‌های مالی، محاسبه ارزش ذاتی، سناریوسازی و مقایسه شرکت‌ها. مناسب برای سرمایه‌گذاران بنیادی و تحلیل‌گران حرفه‌ای.",
      icon: (color) => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      ),
      link: "/login"
    },
    {
      title: "سبد پیشنهادی",
      shortDesc: "پیشنهاد سبد سهام با سود بالا و ریسک کم همراه با تحلیل سهم‌های پیشنهادشده",
      fullDesc: "دریافت سبدهای پیشنهادی متنوع بر اساس تحلیل بنیادی و تکنیکال، مناسب برای سرمایه‌گذاران با ریسک‌پذیری مختلف.",
      icon: (color) => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      ),
      link: "/login"
    },
    {
      title: "کدال پلاس",
      shortDesc: "دسترسی کامل به گزارش‌های کدال و تحلیل سریع اطلاعیه‌های مهم بازار",
      fullDesc: "دریافت و تحلیل سریع اطلاعیه‌های کدال، فیلتر اطلاعیه‌های مهم و مشاهده گزارش‌های مالی شرکت‌ها به صورت یکجا.",
      icon: (color) => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
      ),
      link: "/login"
    },
    {
      title: "اخبار بازار",
      shortDesc: "آخرین اخبار و تحلیل‌های بازار سرمایه و شرکت‌ها از منابع معتبر",
      fullDesc: "دسترسی به جدیدترین اخبار و تحلیل‌های بازار سرمایه، اطلاع‌رسانی لحظه‌ای و تحلیل اخبار تاثیرگذار بر بازار.",
      icon: (color) => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
      ),
      link: "/login"
    }
  ];
  const [selectedProduct, setSelectedProduct] = useState(0);
  
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
    <div className="rtl bg-white min-h-screen" style={{fontFamily: 'Vazir, tahoma, Arial, sans-serif'}}>
      {/* Hero Section */}
      <section className="relative w-full bg-white pt-16 pb-20 overflow-hidden">
        {/* دایره‌های accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="w-full px-4 flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Text Content */}
              <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center md:text-right">
            <div className="relative h-24 md:h-32 overflow-hidden mb-6">
                    {heroSlides.map((slide, index) => (
                      <div 
                        key={index}
                        className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${
                          index === activeSlide 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-10 pointer-events-none'
                        }`}
                      >
                  <h2 className="text-2xl md:text-4xl font-bold text-navy drop-shadow-sm">{slide.title}</h2>
                  <p className="text-lg md:text-xl mt-2 text-gray-700 drop-shadow-sm">{slide.description}</p>
                      </div>
                    ))}
                  </div>
                <div className="mt-10">
                  <Link
                    className="bg-gold text-navy font-bold py-4 px-10 rounded-lg text-lg md:text-xl shadow  hover:text-white transition drop-shadow-sm border-2 border-gold"
                    as={Link}
                    to="/register"
                  >
                    ثبت‌ نام
                  </Link>
                </div>
                <div className="flex justify-center md:justify-start space-x-2 space-x-reverse mt-8">
                  {heroSlides.map((_, index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeSlide ? 'bg-gold scale-125 shadow shadow-gold/40' : 'bg-gray-400/40 hover:bg-gold/60'
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
              <div className="absolute inset-0 rounded-full border-4 border-gold/30 animate-spin-slow"></div>
                  
                  {/* Inner circles */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full border-2 border-gold/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 rounded-full border border-gold/20 animate-spin-slow" style={{ animationDuration: '10s' }}></div>
                  
                  {/* Orbiting Elements - نسخه نهایی حرفه‌ای و مدرن */}
                  {/* Orbit بزرگ outline طلایی */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 animate-spin-slow" style={{ animationDuration: '30s' }}>
                    <div className="w-full h-full rounded-full border-2 border-gold shadow-lg opacity-40"></div>
                  </div>
                  {/* Orbit کوچک outline سرمه‌ای */}
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 animate-spin-slow" style={{ animationDuration: '22s', animationDirection: 'reverse' }}>
                    <div className="w-full h-full rounded-full border-2 border-navy shadow-md opacity-30"></div>
                  </div>
                  
                  {/* Center Icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-gold to-gold/30 backdrop-blur-md flex items-center justify-center shadow-2xl border border-gold/20 animate-pulse-slow">
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-gold/10 to-gold/10 blur-sm"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gold drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 21H4.6C3.17 21 2 19.83 2 18.4V4" />
                      <path d="M21 7L13 15L9 11L3 17" />
                      <path d="M21 12V7H16" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
        {/* Divider موجی پایین Hero */}
      
      </section>

      {/* Divider مینیمال طلایی */}
      <div className="w-full flex justify-center my-12">
        <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
      </div>

{/* Products Section */}
<section className="relative w-full bg-navy py-14 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="w-full px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-center text-gold drop-shadow-sm">محصولات تحلیل بورس</h2>
          <p className="text-center text-lg text-[#D5B263] mb-12 max-w-3xl mx-auto drop-shadow-sm">
            مرجع تحلیل بنیادی بورس ایران و ارائه‌دهنده ابزارهای پیشرفته تحلیل بازار سرمایه
          </p>
          {/* تب محصولات */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {products.map((product, idx) => (
              <AnimatedButton
                key={idx}
                className={`group flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition font-bold text-lg shadow-sm focus:outline-none
                  ${selectedProduct === idx ? 'bg-gold text-navy border-gold shadow-gold/30' : 'bg-white text-navy border-gold/30 hover:bg-gold/90'}`}
                onClick={() => setSelectedProduct(idx)}
              >
                <span className={`transition-colors ${selectedProduct === idx ? 'text-white' : 'text-[#FFD700] group-hover:text-white'}`}>
                  {product.icon('currentColor')}
                </span>
                <span>{product.title}</span>
              </AnimatedButton>
            ))}
          </div>
          {/* اطلاعات کامل محصول انتخاب‌شده */}
          {products[selectedProduct] && (
            <AnimatedCard className="max-w-3xl mx-auto rounded-xl shadow-lg border-t-4 border-gold p-8 text-center animate-fade-in bg-white">
              <div className="flex flex-col items-center gap-2 mb-4">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-2">
                  {products[selectedProduct].icon('#fff')}
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">{products[selectedProduct].title}</h3>
                <p className="text-gray-700 text-base mb-2">{products[selectedProduct].shortDesc}</p>
              </div>
              <div className="text-gray-800 text-lg mb-6">{products[selectedProduct].fullDesc}</div>
              <Link to={products[selectedProduct].link} className="bg-gold text-navy font-bold py-2 px-8 rounded-lg shadow hover:bg-gold/80 hover:text-white transition drop-shadow-sm">مشاهده بیشتر</Link>
            </AnimatedCard>
          )}
        </div>
      </section>

      {/* Divider مینیمال طلایی */}
      <div className="w-full flex justify-center my-12">
        <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
      </div>
      {/* Statistics Section */}
      <section className="relative w-full py-14 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="w-full px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-navy drop-shadow-sm">مشتریان تحلیل بورس</h2>
          <p className="text-center text-lg text-gray-700 mb-12 max-w-3xl mx-auto drop-shadow-sm">
            آیا می‌دانستید %80 افرادی که بیش از 100 میلیارد تومان در بورس دارایی دارند از تحلیل بورس استفاده می‌کنند؟
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* کاربران */}
            <AnimatedCard className="rounded-xl p-10 shadow flex flex-col items-center justify-center text-center border-t-4 border-gold bg-white">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
              </div>
              <div className="text-4xl font-bold text-navy mb-2 drop-shadow-sm">{counts.users.toLocaleString()}+</div>
              <div className="text-lg font-medium text-gray-700">کاربر فعال</div>
            </AnimatedCard>
            {/* حقیقی */}
            <AnimatedCard className="rounded-xl p-10 shadow flex flex-col items-center justify-center text-center border-t-4 border-gold bg-white">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2" /></svg>
              </div>
              <div className="text-4xl font-bold text-navy mb-2 drop-shadow-sm">{counts.individuals.toLocaleString()}+</div>
              <div className="text-lg font-medium text-gray-700">مشتری حقیقی</div>
            </AnimatedCard>
            {/* حقوقی */}
            <AnimatedCard className="rounded-xl p-10 shadow flex flex-col items-center justify-center text-center border-t-4 border-gold bg-white">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v8l5 2" /></svg>
              </div>
              <div className="text-4xl font-bold text-navy mb-2 drop-shadow-sm">{counts.companies.toLocaleString()}+</div>
              <div className="text-lg font-medium text-gray-700">مشتری حقوقی</div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Divider مینیمال طلایی */}
      <div className="w-full flex justify-center my-12">
        <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
      </div>

      

      {/* Subscription Plan Section */}
      <section className="relative w-full bg-navy py-14 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="w-full px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-gold drop-shadow-sm">پلن‌های اشتراک</h2>
          <p className="text-center text-lg text-[#D5B263] mb-12 max-w-2xl mx-auto drop-shadow-sm">
            انتخاب پلن مناسب برای دسترسی به ابزارهای حرفه‌ای تحلیل بورس
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* پلن پایه */}
            <AnimatedCard className="bg-gray-50 rounded-xl p-8 flex flex-col items-center border-t-4 border-gold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">پایه</h3>
              <div className="text-2xl font-extrabold text-[#D5B263] mb-2">رایگان</div>
              <ul className="text-gray-700 text-sm mb-6 space-y-2 text-center">
                <li>دسترسی محدود به تحلیل‌ها</li>
                <li>آمار کلی بازار</li>
                <li>پشتیبانی پایه</li>
              </ul>
              <AnimatedButton className="bg-gold text-navy font-bold py-2 px-6 rounded-lg shadow hover:bg-gold/80 hover:text-white transition-all duration-200 w-full mt-auto">شروع رایگان</AnimatedButton>
            </AnimatedCard>
            {/* پلن حرفه‌ای */}
            <AnimatedCard className="bg-white rounded-xl p-8 flex flex-col items-center border-t-4 border-gold scale-105 z-10 shadow-xl ring-2 ring-gold/40 relative hover:shadow-2xl hover:scale-110 transition-all duration-300">
              <span className="absolute top-4 right-4 bg-gold text-navy px-4 py-1 rounded-bl-lg text-sm font-bold shadow">پرفروش‌ترین</span>
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">حرفه‌ای</h3>
              <div className="text-2xl font-extrabold text-[#D5B263] mb-2">۲۹۰٬۰۰۰ <span className="text-base font-normal">تومان/ماه</span></div>
              <ul className="text-gray-700 text-sm mb-6 space-y-2 text-center">
                <li>دسترسی کامل به تحلیل‌ها</li>
                <li>ابزارهای پیشرفته بازار</li>
                <li>پشتیبانی ویژه</li>
              </ul>
              <AnimatedButton className="bg-gold text-navy font-bold py-2 px-6 rounded-lg shadow hover:bg-gold/90 hover:text-white transition-all duration-200 w-full mt-auto">شروع حرفه‌ای</AnimatedButton>
            </AnimatedCard>
            {/* پلن ویژه */}
            <AnimatedCard className="bg-gray-50 rounded-xl p-8 flex flex-col items-center border-t-4 border-gold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v8l5 2" /></svg>
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">ویژه</h3>
              <div className="text-2xl font-extrabold text-[#D5B263] mb-2">۴۹۰٬۰۰۰ <span className="text-base font-normal">تومان/ماه</span></div>
              <ul className="text-gray-700 text-sm mb-6 space-y-2 text-center">
                <li>دسترسی VIP به همه امکانات</li>
                <li>تحلیل اختصاصی و مشاوره</li>
                <li>پشتیبانی ۲۴ ساعته</li>
              </ul>
              <AnimatedButton className="bg-gold text-navy font-bold py-2 px-6 rounded-lg shadow hover:bg-gold/80 hover:text-white transition-all duration-200 w-full mt-auto">شروع ویژه</AnimatedButton>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Divider مینیمال طلایی */}
      <div className="w-full flex justify-center my-12">
        <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
      </div>

      {/* Articles Section */}
      <section className="relative w-full bg-white py-14 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="w-full px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-center text-navy drop-shadow-sm">آخرین مقالات</h2>
          <p className="text-center text-lg text-gray-700 mb-10 max-w-3xl mx-auto drop-shadow-sm">
            جدیدترین مقالات آموزشی و تحلیلی بازار سرمایه
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* نمونه کارت مقاله accent gold */}
            <AnimatedCard className="bg-white rounded-xl p-8 shadow flex flex-col border-t-4 border-gold">
              <span className="text-gold font-bold mb-2">آموزش تحلیل بنیادی</span>
              <h3 className="text-xl font-bold text-navy mb-2">مبانی تحلیل صورت‌های مالی شرکت‌ها</h3>
              <p className="text-gray-700 mb-4 drop-shadow-sm">در این مقاله با اصول اولیه تحلیل بنیادی و صورت‌های مالی آشنا می‌شوید...</p>
              <Link to="/articles/1" className="bg-gold text-navy font-bold py-2 px-6 rounded-lg shadow hover:bg-gold/80 hover:text-white transition drop-shadow-sm self-end">ادامه مطلب</Link>
            </AnimatedCard>
            {/* نمونه کارت مقاله accent gold */}
            <AnimatedCard className="bg-white rounded-xl p-8 shadow flex flex-col border-t-4 border-gold">
              <span className="text-gold font-bold mb-2">آموزش تکنیکال</span>
              <h3 className="text-xl font-bold text-navy mb-2">آشنایی با نمودارهای شمعی</h3>
              <p className="text-gray-700 mb-4 drop-shadow-sm">نمودارهای شمعی یکی از ابزارهای مهم تحلیل تکنیکال هستند...</p>
              <Link to="/articles/2" className="bg-gold text-navy font-bold py-2 px-6 rounded-lg shadow hover:bg-gold/80 hover:text-white transition drop-shadow-sm self-end">ادامه مطلب</Link>
            </AnimatedCard>
            {/* نمونه کارت مقاله accent gold */}
            <AnimatedCard className="bg-white rounded-xl p-8 shadow flex flex-col border-t-4 border-gold">
              <span className="text-gold font-bold mb-2">تحلیل بازار</span>
              <h3 className="text-xl font-bold text-navy mb-2">بررسی روند شاخص کل بورس</h3>
              <p className="text-gray-700 mb-4 drop-shadow-sm">در این مقاله روند شاخص کل بورس و عوامل موثر بر آن بررسی می‌شود...</p>
              <Link to="/articles/3" className="bg-gold text-navy font-bold py-2 px-6 rounded-lg shadow hover:bg-gold/80 hover:text-white transition drop-shadow-sm self-end">ادامه مطلب</Link>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage; 