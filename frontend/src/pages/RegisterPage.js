import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.js';

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'نام الزامی است';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'نام خانوادگی الزامی است';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'ایمیل الزامی است';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'ایمیل نامعتبر است';
    }
    
    if (!formData.password) {
      newErrors.password = 'رمز عبور الزامی است';
    } else if (formData.password.length < 8) {
      newErrors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'رمز عبور و تکرار آن مطابقت ندارند';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'خطا در ثبت‌نام. لطفاً دوباره تلاش کنید.'
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 rtl">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-3xl">
        <div className="md:flex">
          <div className="md:shrink-0 bg-gradient-to-br from-blue-600 to-blue-800 md:w-48 flex items-center justify-center">
            <div className="p-8 md:p-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 md:h-24 md:w-24 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div className="p-8 md:p-12 w-full">
            <div className="tracking-wide text-sm text-blue-600 font-semibold mb-1">تحلیل بورس</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">ثبت‌نام در سامانه</h2>
            
            {errors.submit && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg">
                {errors.submit}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    نام
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    نام خانوادگی
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  ایمیل
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  رمز عبور
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  تکرار رمز عبور
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm py-3 px-4 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                    در حال ثبت‌نام...
                  </div>
                ) : (
                  'ثبت‌نام'
                )}
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-sm text-gray-500 text-center">
                قبلاً ثبت‌نام کرده‌اید؟{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                  ورود به حساب کاربری
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-3xl mx-auto mt-16">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">مزایای عضویت در تحلیل بورس</h3>
          
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

export default RegisterPage; 