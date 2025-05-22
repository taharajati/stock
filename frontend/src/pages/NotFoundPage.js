import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 rtl">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="relative">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-20 -mr-20 -mt-20 animate-pulse-slow"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full opacity-20 -ml-40 -mb-40 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Main content */}
          <div className="relative">
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-800 mb-4">۴۰۴</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">صفحه مورد نظر یافت نشد</h2>
            
            <p className="text-gray-600 mb-8">
              متأسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا به آدرس دیگری منتقل شده است.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                بازگشت به صفحه اصلی
              </Link>
              
              <Link 
                to="/dashboard"
                className="w-full sm:w-auto bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 py-3 px-8 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                  <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                </svg>
                مشاهده داشبورد
              </Link>
            </div>
          </div>
        </div>
        
        {/* Additional help section */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">نیاز به کمک دارید؟</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a 
              href="mailto:support@tahlilbors.com"
              className="flex items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              ارسال ایمیل به پشتیبانی
            </a>
            
            <a 
              href="/faq"
              className="flex items-center justify-center p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              سؤالات متداول
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage; 