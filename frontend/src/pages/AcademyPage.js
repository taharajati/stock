import React from 'react';
import { Link } from 'react-router-dom';

function AcademyPage() {
  const courses = [
    {
      id: 1,
      title: 'آموزش مقدماتی تحلیل تکنیکال',
      description: 'یادگیری اصول اولیه تحلیل تکنیکال و نمودارها',
      level: 'مقدماتی',
      duration: '۸ ساعت',
      lessons: 12,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: 'رایگان'
    },
    {
      id: 2,
      title: 'تحلیل بنیادی پیشرفته',
      description: 'بررسی صورت‌های مالی و ارزش‌گذاری شرکت‌ها',
      level: 'پیشرفته',
      duration: '۱۶ ساعت',
      lessons: 24,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: '۱۹۹ هزار تومان'
    },
    {
      id: 3,
      title: 'مدیریت ریسک و سرمایه',
      description: 'استراتژی‌های مدیریت ریسک و سرمایه‌گذاری',
      level: 'متوسط',
      duration: '۱۲ ساعت',
      lessons: 18,
      image: 'https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
      price: '۱۴۹ هزار تومان'
    }
  ];

  const features = [
    {
      title: 'آموزش کاربردی',
      description: 'محتواهای آموزشی با تمرکز بر کاربرد عملی در بازار',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: 'مدرسین متخصص',
      description: 'اساتید با تجربه و متخصص در حوزه بازار سرمایه',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: 'گواهینامه معتبر',
      description: 'مدرک معتبر برای دوره‌های تکمیل شده',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    }
  ];

  return (
    <div className="py-16 rtl">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">آکادمی تحلیل بورس</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            با دوره‌های آموزشی ما، مهارت‌های لازم برای موفقیت در بازار سرمایه را کسب کنید
          </p>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-md border-l-4 border-gold">
              <div className="w-12 h-12 bg-gold/10 text-gold rounded-lg flex items-center justify-center mb-4">
                {React.cloneElement(feature.icon, { className: 'h-6 w-6 text-gold' })}
              </div>
              <h3 className="text-xl font-bold text-navy mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Divider مینیمال طلایی */}
        <div className="w-full flex justify-center my-12">
          <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
        </div>

        {/* Courses Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">دوره‌های آموزشی</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${course.price === 'رایگان' ? 'border-gold scale-105 z-10' : 'border-navy/20'}`}>
                <div className="relative h-48">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-gold text-navy px-3 py-1 rounded-full text-sm font-bold shadow">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy mb-2">{course.title}</h3>
                  <p className="text-gray-700 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <svg className="h-5 w-5 ml-1 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <svg className="h-5 w-5 ml-1 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      {course.lessons} درس
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-bold ${course.price === 'رایگان' ? 'text-gold' : 'text-navy'}`}>{course.price}</span>
                    <Link
                      to={`/courses/${course.id}`}
                      className={`px-4 py-2 rounded-lg font-bold border-2 transition duration-300 ${
                        course.price === 'رایگان'
                          ? 'bg-gold text-navy border-gold hover:bg-gold-dark hover:text-white'
                          : 'bg-white text-gold border-gold hover:bg-gold/10'
                      }`}
                    >
                      مشاهده دوره
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider مینیمال طلایی */}
        <div className="w-full flex justify-center my-12">
          <div className="h-px w-16 bg-gold shadow-gold/20 rounded-full"></div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg border-2 border-gold">
          <h2 className="text-3xl font-bold text-navy mb-4">آماده شروع یادگیری هستید؟</h2>
          <p className="text-xl mb-8 text-gray-700">
            همین حالا در دوره‌های آموزشی ما ثبت‌نام کنید
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center bg-gold text-navy border-2 border-gold px-8 py-3 rounded-lg font-bold hover:bg-gold-dark hover:text-white transition duration-300"
          >
            <svg className="h-5 w-5 ml-2 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            ثبت‌نام در دوره‌ها
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AcademyPage; 