import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // فقط ریدایرکت به استاک مارکت
    navigate('/stock-market');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy/80 to-navy/90">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gold p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">ورود به استاک مارکت</h1>
        <p className="text-gray-600 mb-8">برای ورود به سامانه معاملات و مشاهده امکانات ویژه، روی دکمه زیر کلیک کنید.</p>
            <button
        onClick={handleLogin}
          className="w-full bg-gold text-navy border-2 border-gold rounded-lg py-3 px-4 text-xl font-bold shadow-md hover:bg-gold-dark hover:text-white transition-colors duration-200"
      >
        ورود به استاک مارکت
            </button>
      </div>
    </div>
  );
}

export default LoginPage; 