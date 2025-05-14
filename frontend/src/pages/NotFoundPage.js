import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="flex justify-center items-center min-h-[70vh] rtl">
      <div className="text-center p-10 bg-white rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-7xl font-bold text-red-500 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">صفحه مورد نظر یافت نشد</h2>
        <p className="text-gray-600 mb-8 text-lg">متأسفانه صفحه‌ای که به دنبال آن بودید، پیدا نشد.</p>
        <Link to="/" className="btn btn-primary">
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage; 