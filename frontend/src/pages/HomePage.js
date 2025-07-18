import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { initScrollRevealAnimations, createRippleEffect } from '../utils/animationUtils.js';
import AnimatedCard from '../components/common/AnimatedCard.jsx';
import AnimatedButton from '../components/common/AnimatedButton.jsx';
import ColorThief from 'color-thief-browser';

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);
  const [parallaxY, setParallaxY] = useState(0);
  
  // حذف شمارنده‌های آماری و state مربوطه
  // const [counts, setCounts] = useState({
  //   users: 0,
  //   individuals: 0,
  //   companies: 0
  // });
  // const targetCounts = { ... };
  // useEffect مربوط به شمارنده حذف شود
  
  const heroSlides = [
    {
      title: "هر عددی در بورس، یک داستان دارد... ما آن را روایت می‌کنیم!",
      description: "گزارشات اختصاصی؟ فقط یک کلیک فاصله داری!"
    },
    {
      title: "پرتفوی تو زیر ذره‌بینِ هوش مصنوعی ماست!",
      description: "کدال خوانی را به هوش مصنوعی ما بسپار، خودت نتیجه را ببین!"
    },
    {
      title: "تصمیم‌های بزرگ از تحلیل‌های دقیق آغاز می‌شوند.",
      description: "گزارشات کدال را از هوش مصنوعی ما دنبال کن"
    }
  ];
  
  const products = [
    {
      title: "رصد وضعیت بازار",
 
      icon: (color) => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 0a2 2 0 002 2h2a2 2 0 002-2m-6 0V7a2 2 0 012-2h2a2 2 0 012 2v10" /></svg>
      ),
      features: [
        "بررسی وضعیت روز بازار",
        "ارائه نمودارهای مختلف مانند تعداد صف خرید و فروش، حجم صف، بازدهی لحظه‌ای، حجم معاملات، ورود و خروج پول حقیقی، اشتیاق بازار و ...",
        "مشاهده مقادیر تاریخی",
        "وضعیت بازار اختیار معامله"
      ],
      link: "/register"
    },
    {
      title: "صندوق های سرمایه گذاری",

      icon: (color) => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m-5 4h18" /></svg>
      ),
      features: [
        "تحلیل عملکرد و ریسک صندوق",
        "تحلیل پرتفوی صندوق",
        "بررسی وضعیت کلی بازار با استفاده از تغییرات صندوق های سرمایه گذاری"
      ],
      link: "/register"
    },
    {
      title: "کدال",
  
      icon: (color) => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h10M7 16h10M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      ),
      features: [
        "امکان مشاهده وضعیت کلی بازار",
        "مشاهده تولید و فروش و سود و زیان همه شرکت‌ها در قالب یک جدول",
        "امکان شخصی‌سازی جداول",
        "مشاهده جزئیات گزارشات هر شرکت"
      ],
      link: "/register"
    },
    {
      title: "اختیار معامله",

      icon: (color) => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M8 21l4-4 4 4" /></svg>
      ),
      features: [
        "دیدبان اختیار معامله شامل پارامترهای تحلیلی مختلف",
        "موقعیت‌های موجود بیش از 20 استراتژی مختلف",
        "ماشین حساب استراتژی",
        "نمودارهای تعاملی"
      ],
      link: "/register"
    },
    {
      title: "مقالات آموزشی",

      icon: (color) => (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0H3m9 0h9" /></svg>
      ),
      features: [
        "مقالات آموزشی",
        "مقالات تحلیلی"
      ],
      link: "/register"
    }
  ];
  const [selectedProduct, setSelectedProduct] = useState(0);
  
  const heroImages = [
    '/assets/hero1.png',
    '/assets/hero2.png',
    '/assets/hero3.png'
  ];

  // Preload hero images on mount
  React.useEffect(() => {
    heroImages.forEach(src => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);
  


  useEffect(() => {
    // Initialize scroll animations
    const cleanup = initScrollRevealAnimations();
    
    // Auto rotate hero slides
    const slideInterval = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 8000);
    
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
  // useEffect(() => {
  //   if (statsVisible) {
  //     const duration = 2000; // ms
  //     const interval = 16; // ms (60fps)
  //     const steps = duration / interval;
      
  //     const increments = {
  //       users: targetCounts.users / steps,
  //       individuals: targetCounts.individuals / steps,
  //       companies: targetCounts.companies / steps
  //     };
      
  //     let currentStep = 0;
      
  //     const timer = setInterval(() => {
  //       currentStep++;
        
  //       setCounts(prevCounts => ({
  //         users: Math.min(Math.round(increments.users * currentStep), targetCounts.users),
  //         individuals: Math.min(Math.round(increments.individuals * currentStep), targetCounts.individuals),
  //         companies: Math.min(Math.round(increments.companies * currentStep), targetCounts.companies)
  //       }));
        
  //       if (currentStep >= steps) {
  //         clearInterval(timer);
  //       }
  //     }, interval);
      
  //     return () => clearInterval(timer);
  //   }
  // }, [statsVisible]);
  
  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="rtl min-h-screen bg-theme-white" style={{fontFamily: 'Vazir, tahoma, Arial, sans-serif'}}>
      {/* Hero Section */}
      <section
        className="relative w-full pt-16 pb-20 overflow-hidden  text-theme-dark"
        style={{
          backgroundImage: `url(${heroImages[activeSlide]})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          transition: 'background-image 0.7s ease'
        }}
      >
        {/* Overlay (برای خوانایی بیشتر متن) */}
        {/* اگر نیاز به تیرگی بیشتر بود، مقدار rgba را تغییر بده */}
        {/* دایره‌های accent */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-10 blur-3xl -z-10 bg-theme-accent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl -z-10 bg-theme-accent2"></div>
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
                  <h2 className="text-2xl md:text-4xl font-bold drop-shadow-sm text-theme-dark">{slide.title}</h2>
                  <p className="text-lg md:text-xl mt-2 drop-shadow-sm text-theme-dark/80">{slide.description}</p>
                      </div>
                    ))}
                  </div>
                <div className="mt-10">
                  <Link
                    className="font-bold py-4 px-10 rounded-lg text-lg md:text-xl shadow hover:text-theme-dark transition drop-shadow-sm border-2 bg-theme-accent text-theme-dark border-theme-accent"
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
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeSlide ? 'bg-theme-accent' : 'bg-theme-accent2'}`}
                      onClick={() => handleSlideChange(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
                  {/* Hero Image/Graphic */}
                  <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-[500px] h-[300px] md:w-[400px] md:h-[400px]" style={{ transform: `translateY(${-parallaxY * 0.2}px)` }}>
                  {/* Main circle */}
                  <div className="absolute inset-0 rounded-full border-4 border-gold/30 animate-spin-slow"></div>
                  {/* Inner circles */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 rounded-full border-2 border-gold/30 animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }}></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/5 h-3/5 rounded-full border border-gold/20 animate-spin-slow" style={{ animationDuration: '10s' }}></div>
                  {/* Orbiting Elements */}
                  {/* Hero Image - dynamic (rectangular, not circle) */}
                  {/* حذف عکس هیرو از اینجا چون بک‌گراند شده است */}
                  {/* Orbit بزرگ طلایی - partly over and under image */}
                  <div className="absolute" style={{ bottom: '10%', right: '5%', zIndex: 25 }}>
                    <div className="w-40 h-40 rounded-full border-4 border-gold shadow-lg opacity-40 relative" style={{ top: '30px', right: '-30px' }}></div>
                  </div>
                  {/* Orbit کوچک سرمه‌ای - partly over and under image */}
                  <div className="absolute" style={{ top: '70%', left: '0%', zIndex: 10 }}>
                    <div className="w-16 h-16 rounded-full border-4 border-navy shadow-md opacity-30 relative" style={{ left: '-20px', top: '10px' }}></div>
                  </div>
                  {/* Center Icon (optionally keep or remove) */}
                  
                </div>
              </div>
            </div>
      </section>

      {/* Divider مینیمال accent */}
      <div className="w-full flex justify-center my-12">
        <div className="h-px w-16 rounded-full bg-theme-accent2 shadow-theme-accent2/20"></div>
      </div>

      {/* Products Section */}
      <section className="relative w-full bg-theme-main text-theme pt-14 overflow-hidden  py-14 ">
        <div className="absolute top-0 right-0 w-72 h-72 bg-theme-accent rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-theme-accent2 rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="w-full px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-center text-theme-accent drop-shadow-sm">محصولات لادیس</h2>
          <p className="text-center text-lg text-theme-accent mb-12 max-w-3xl mx-auto drop-shadow-sm">
            مرجع تحلیل بنیادی بورس ایران و ارائه‌دهنده ابزارهای پیشرفته تحلیل بازار سرمایه
          </p>
          {/* تب محصولات */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {products.map((product, idx) => (
              <AnimatedButton
                key={idx}
                className={`group flex items-center gap-2 px-6 py-3 rounded-lg border-2 transition font-bold text-lg shadow-sm focus:outline-none
                  ${selectedProduct === idx ? 'bg-theme-accent text-theme-dark border-theme-accent shadow-theme-accent2/20' : 'bg-theme-main text-theme border-theme-accent2 hover:bg-theme-accent/90'}`}
                onClick={() => setSelectedProduct(idx)}
              >
                <span className={`transition-colors ${selectedProduct === idx ? 'text-theme-dark' : 'text-theme-accent group-hover:text-theme-dark'}`}>
                  {product.icon('currentColor')}
                </span>
                <span>{product.title}</span>
              </AnimatedButton>
            ))}
          </div>
          {/* اطلاعات کامل محصول انتخاب‌شده */}
          {products[selectedProduct] && (
            <AnimatedCard className="max-w-4xl mx-auto rounded-2xl shadow-2xl border border-theme-accent bg-theme-main/30 text-theme-dark p-6 md:p-8 animate-fade-in" dir="rtl">
              <div className="flex flex-row items-start gap-8"dir="rtl">
                {/* Info Section */}
                <div className=" items-end text-right" dir="rtl">
                  <h3 className="text-3xl font-extrabold text-theme-dark mb-4">{products[selectedProduct].title}</h3>
                  <ul className="mb-6 space-y-2 w-full">
                    {products[selectedProduct].features.map((feature, idx) => (
                      <li key={idx} className="text-theme-dark text-lg leading-relaxed flex flex-row-reverse items-center gap-2 justify-end">
                      
                        <span>{feature}</span>
                        <svg className="w-5 h-5 text-theme-accent ml-2 flex-shrink-0 float-right" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto self-end ">
                     <AnimatedButton
                       as={Link}
                       to={products[selectedProduct].link}
                       className="bg-theme-accent text-theme-dark font-bold py-2 px-6 rounded-lg shadow hover:bg-theme-accent2 hover:text-theme transition-all duration-200"
                     >
                       مشاهده بیشتر
                     </AnimatedButton>
                   </div>
           
                </div>
                {/* Image Placeholder */}
                <div className="w-40 h-40 md:w-56 md:h-56 bg-theme-accent/10 rounded-2xl flex-shrink-0"></div>
              </div>
            </AnimatedCard>
          )}
        </div>
      </section>

      {/* Divider مینیمال accent */}
      <div className="w-full flex justify-center my-12">
        <div className="h-px w-16 rounded-full bg-theme-accent2 shadow-theme-accent2/20"></div>
      </div>

      {/* Statistics Section */}
      <section className="relative w-full py-14 overflow-hidden bg-theme-white text-theme-dark">
        <div className="absolute top-0 left-0 w-64 h-64 bg-theme-accent rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-theme-accent2 rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="w-full px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-theme-dark drop-shadow-sm">مشتریان لادیس</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {/* کاربران */}
            <AnimatedCard className="rounded-xl p-10 shadow flex flex-col items-center justify-center text-center border-t-4 border-theme-accent bg-theme-white text-theme-dark">
              <div className="w-20 h-20 rounded-full bg-theme-accent/10 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
              </div>
              <div className="text-4xl font-bold text-theme-dark mb-2 drop-shadow-sm">+100</div>
              <div className="text-lg font-medium text-theme-dark">کاربر فعال</div>
            </AnimatedCard>
            {/* حقیقی */}
            <AnimatedCard className="rounded-xl p-10 shadow flex flex-col items-center justify-center text-center border-t-4 border-theme-accent bg-theme-white text-theme-dark">
              <div className="w-20 h-20 rounded-full bg-theme-accent/10 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2" /></svg>
              </div>
              <div className="text-4xl font-bold text-theme-dark mb-2 drop-shadow-sm">90+</div>
              <div className="text-lg font-medium text-theme-dark">مشتری حقیقی</div>
            </AnimatedCard>
            {/* حقوقی */}
            <AnimatedCard className="rounded-xl p-10 shadow flex flex-col items-center justify-center text-center border-t-4 border-theme-accent bg-theme-white text-theme-dark">
              <div className="w-20 h-20 rounded-full bg-theme-accent/10 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v8l5 2" /></svg>
              </div>
              <div className="text-4xl font-bold text-theme-dark mb-2 drop-shadow-sm">+5</div>
              <div className="text-lg font-medium text-theme-dark">مشتری حقوقی</div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Divider مینیمال accent */}
      <div className="w-full flex justify-center my-12">
        <div className="h-px w-16 rounded-full bg-theme-accent2 shadow-theme-accent2/20"></div>
      </div>

      {/* Subscription Plan Section */}
      <section className="relative w-full bg-theme-main text-theme pt-14 overflow-hidden  py-14 ">
        <div className="absolute top-0 left-0 w-64 h-64 bg-theme-accent rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-theme-accent2 rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="w-full px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-theme-accent drop-shadow-sm">پلن‌های اشتراک</h2>
          <p className="text-center text-lg text-theme-accent mb-12 max-w-2xl mx-auto drop-shadow-sm">
            انتخاب پلن مناسب برای دسترسی به ابزارهای حرفه‌ای تحلیل بورس
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            {/* پلن پایه */}
            <AnimatedCard className="bg-theme-white rounded-xl p-8 flex flex-col items-center border-t-4 border-theme-accent hover:shadow-2xl hover:scale-105 transition-all duration-300 text-theme-dark">
              <div className="w-16 h-16 rounded-full bg-theme-accent/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
              </div>
              <h3 className="text-xl font-bold text-theme-dark mb-2">پایه</h3>
              <div className="text-2xl font-extrabold text-theme-accent mb-2">رایگان</div>
              <ul className="text-theme-dark text-sm mb-6 space-y-2 text-center">
                <li>دسترسی محدود به تحلیل‌ها</li>
                <li>آمار کلی بازار</li>
                <li>پشتیبانی پایه</li>
              </ul>
              <AnimatedButton className="bg-theme-accent text-theme-dark font-bold py-2 px-6 rounded-lg shadow hover:bg-theme-accent2 hover:text-theme transition-all duration-200 w-full mt-auto">شروع رایگان</AnimatedButton>
            </AnimatedCard>
            {/* پلن حرفه‌ای */}
            <AnimatedCard className="bg-theme-white rounded-xl p-8 flex flex-col items-center border-t-4 border-theme-accent scale-105 z-10 shadow-xl ring-2 ring-theme-accent2/40 relative hover:shadow-2xl hover:scale-110 transition-all duration-300 text-theme-dark">
              <span className="absolute top-4 right-4 bg-theme-accent text-theme-dark px-4 py-1 rounded-bl-lg text-sm font-bold shadow">پرفروش‌ترین</span>
              <div className="w-16 h-16 rounded-full bg-theme-accent/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg>
              </div>
              <h3 className="text-xl font-bold text-theme-dark mb-2">حرفه‌ای</h3>
              <div className="text-2xl font-extrabold text-theme-accent mb-2">۲۹۰٬۰۰۰ <span className="text-base font-normal">تومان/ماه</span></div>
              <ul className="text-theme-dark text-sm mb-6 space-y-2 text-center">
                <li>دسترسی کامل به تحلیل‌ها</li>
                <li>ابزارهای پیشرفته بازار</li>
                <li>پشتیبانی ویژه</li>
              </ul>
              <AnimatedButton className="bg-theme-accent text-theme-dark font-bold py-2 px-6 rounded-lg shadow hover:bg-theme-accent2 hover:text-theme transition-all duration-200 w-full mt-auto">شروع حرفه‌ای</AnimatedButton>
            </AnimatedCard>
            {/* پلن ویژه */}
            <AnimatedCard className="bg-theme-white rounded-xl p-8 flex flex-col items-center border-t-4 border-theme-accent hover:shadow-2xl hover:scale-105 transition-all duration-300 text-theme-dark">
              <div className="w-16 h-16 rounded-full bg-theme-accent/10 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-theme-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v8l5 2" /></svg>
              </div>
              <h3 className="text-xl font-bold text-theme-dark mb-2">ویژه</h3>
              <div className="text-2xl font-extrabold text-theme-accent mb-2">۴۹۰٬۰۰۰ <span className="text-base font-normal">تومان/ماه</span></div>
              <ul className="text-theme-dark text-sm mb-6 space-y-2 text-center">
                <li>دسترسی VIP به همه امکانات</li>
                <li>تحلیل اختصاصی و مشاوره</li>
                <li>پشتیبانی ۲۴ ساعته</li>
              </ul>
              <AnimatedButton className="bg-theme-accent text-theme-dark font-bold py-2 px-6 rounded-lg shadow hover:bg-theme-accent2 hover:text-theme transition-all duration-200 w-full mt-auto">شروع ویژه</AnimatedButton>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Divider مینیمال accent */}
      <div className="w-full flex justify-center my-12">
        <div className="h-px w-16 rounded-full bg-theme-accent2 shadow-theme-accent2/20"></div>
      </div>

      {/* Articles Section */}
      <section className="relative w-full bg-theme-white text-theme-dark py-14 overflow-hidden ">
        <div className="absolute top-0 left-0 w-64 h-64 bg-theme-accent rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-theme-accent2 rounded-full opacity-10 blur-3xl -z-10"></div>
        <div className="w-full px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-center text-theme-dark  drop-shadow-sm">آخرین مقالات</h2>
          <p className="text-center text-lg text-theme-dark mb-10 max-w-3xl mx-auto drop-shadow-sm">
            جدیدترین مقالات آموزشی و تحلیلی بازار سرمایه
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* نمونه کارت مقاله accent */}
            <AnimatedCard className="bg-theme-white rounded-xl p-8 shadow flex flex-col border-t-4 border-theme-accent text-theme-dark">
              <span className="text-theme-accent font-bold mb-2">آموزش تحلیل بنیادی</span>
              <h3 className="text-xl font-bold text-theme-dark mb-2">مبانی تحلیل صورت‌های مالی شرکت‌ها</h3>
              <p className="text-theme-dark mb-4 drop-shadow-sm">در این مقاله با اصول اولیه تحلیل بنیادی و صورت‌های مالی آشنا می‌شوید...</p>
              <Link to="/articles/1" className="bg-theme-accent text-theme-dark font-bold py-2 px-6 rounded-lg shadow hover:bg-theme-accent2 hover:text-theme transition drop-shadow-sm self-end">ادامه مطلب</Link>
            </AnimatedCard>
            {/* نمونه کارت مقاله accent */}
            <AnimatedCard className="bg-theme-white rounded-xl p-8 shadow flex flex-col border-t-4 border-theme-accent text-theme-dark">
              <span className="text-theme-accent font-bold mb-2">آموزش تکنیکال</span>
              <h3 className="text-xl font-bold text-theme-dark mb-2">آشنایی با نمودارهای شمعی</h3>
              <p className="text-theme-dark mb-4 drop-shadow-sm">نمودارهای شمعی یکی از ابزارهای مهم تحلیل تکنیکال هستند...</p>
              <Link to="/articles/2" className="bg-theme-accent text-theme-dark font-bold py-2 px-6 rounded-lg shadow hover:bg-theme-accent2 hover:text-theme transition drop-shadow-sm self-end">ادامه مطلب</Link>
            </AnimatedCard>
            {/* نمونه کارت مقاله accent */}
            <AnimatedCard className="bg-theme-white rounded-xl p-8 shadow flex flex-col border-t-4 border-theme-accent text-theme-dark">
              <span className="text-theme-accent font-bold mb-2">تحلیل بازار</span>
              <h3 className="text-xl font-bold text-theme-dark mb-2">بررسی روند شاخص کل بورس</h3>
              <p className="text-theme-dark mb-4 drop-shadow-sm">در این مقاله روند شاخص کل بورس و عوامل موثر بر آن بررسی می‌شود...</p>
              <Link to="/articles/3" className="bg-theme-accent text-theme-dark font-bold py-2 px-6 rounded-lg shadow hover:bg-theme-accent2 hover:text-theme transition drop-shadow-sm self-end">ادامه مطلب</Link>
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage; 