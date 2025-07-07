import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext.js';

function RegisterPage() {
  const navigate = useNavigate();
  // const { register } = useAuth(); // موقتاً غیرفعال شد

  // فقط دکمه ورود به استاک مارکت نمایش داده شود
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy/80 to-navy/90">
      <div className="bg-white rounded-2xl shadow-xl border-2 border-gold p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-navy mb-4">ثبت‌نام موقتاً غیرفعال است</h1>
        <p className="text-gray-600 mb-8">در حال حاضر امکان ثبت‌نام وجود ندارد. برای ورود به استاک مارکت روی دکمه زیر کلیک کنید.</p>
        <button
          onClick={() => navigate('/stock-market')}
          className="w-full bg-gold text-navy border-2 border-gold rounded-lg py-3 px-4 text-xl font-bold shadow-md hover:bg-gold-dark hover:text-white transition-colors duration-200"
        >
          ورود به استاک مارکت
        </button>
      </div>
    </div>
  );
}

export default RegisterPage; 