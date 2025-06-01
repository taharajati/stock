import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';
import api from '../services/api.js';

function SetupPasswordPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('رمز عبور و تکرار آن مطابقت ندارند');
      return;
    }

    setIsLoading(true);

    try {
      await api.post('/auth/setup-password', { password });
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.data?.requirements) {
        setError(
          <div>
            <p className="font-bold mb-2">{error.response.data.error}</p>
            <ul className="list-disc list-inside">
              {error.response.data.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        setError(error.response?.data?.error || 'خطا در تنظیم رمز عبور');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-16 rtl">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">تنظیم رمز عبور</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
        </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                تکرار رمز عبور
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
          </div>

            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">رمز عبور باید شامل موارد زیر باشد:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• حداقل 8 کاراکتر</li>
                <li>• حداقل یک حرف بزرگ</li>
                <li>• حداقل یک حرف کوچک</li>
                <li>• حداقل یک عدد</li>
                <li>• حداقل یک کاراکتر خاص (@$!%*?&)</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? 'در حال ذخیره...' : 'ذخیره رمز عبور'}
            </button>
          </form>
          </div>
      </div>
    </div>
  );
}

export default SetupPasswordPage; 