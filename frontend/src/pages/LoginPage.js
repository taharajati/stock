import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // فقط ریدایرکت به استاک مارکت
    navigate('/stock-market');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
            <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl"
      >
        ورود به استاک مارکت
            </button>
    </div>
  );
}

export default LoginPage; 