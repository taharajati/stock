import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

function LoginPage() {
  const { user, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleLogin = async () => {
    try {
      await login();
      // Redirect will be handled by the useEffect above
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="py-16 rtl">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl">
        <div className="md:flex">
          <div className="md:shrink-0 bg-gradient-to-br from-blue-600 to-blue-800 md:w-48 flex items-center justify-center">
            <div className="p-8 md:p-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
          </div>
          <div className="p-8 md:p-12 w-full">
            <div className="tracking-wide text-sm text-blue-600 font-semibold mb-1">تحلیل بورس</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">ورود به حساب کاربری</h2>
            
            <div className="mb-8 text-gray-600">
              <p>برای ورود به سامانه تحلیل بورس و دسترسی به ابزارهای تحلیلی بازار سرمایه، از حساب گوگل خود استفاده کنید.</p>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg shadow-sm py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg className="ml-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                ورود با حساب گوگل
              </button>
              
              <div className="text-center">
                <span className="text-sm text-gray-500">
                  یا
                </span>
              </div>
              
              <button 
                onClick={() => window.location.href = "/register"}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm py-3 px-4 transition-colors"
              >
                ثبت‌نام در تحلیل بورس
              </button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center">
                با ورود به سامانه، <a href="/terms" className="text-blue-600 hover:underline">شرایط و قوانین</a> استفاده از سرویس را می‌پذیرید.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto mt-16">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">مزایای استفاده از تحلیل بورس</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">امنیت بالا</h4>
              <p className="text-gray-600 text-sm">تمامی اطلاعات شما با استفاده از پروتکل‌های امنیتی پیشرفته محافظت می‌شوند.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">تحلیل‌های دقیق</h4>
              <p className="text-gray-600 text-sm">دسترسی به تحلیل‌های بنیادی و تکنیکال دقیق برای بهبود تصمیم‌گیری‌های سرمایه‌گذاری</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-medium text-gray-800 mb-2">به‌روزرسانی مداوم</h4>
              <p className="text-gray-600 text-sm">دسترسی به جدیدترین اطلاعات و داده‌های بازار سرمایه به صورت لحظه‌ای</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage; 