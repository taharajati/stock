import React from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

// Improved Input Component
export const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  placeholder, 
  required = false,
  disabled = false,
  loading = false
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`
            w-full px-4 py-3 border rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            ${error 
              ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 hover:border-gray-400'
            }
            ${disabled || loading ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
          `}
        />
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center mt-2 text-red-600 text-sm">
          <FiAlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

// Improved Textarea Component
export const FormTextarea = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  placeholder, 
  rows = 4,
  required = false,
  disabled = false
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full px-4 py-3 border rounded-lg transition-all duration-200 resize-none
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error 
            ? 'border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}
        `}
      />
      {error && (
        <div className="flex items-center mt-2 text-red-600 text-sm">
          <FiAlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  );
};

// Improved Button Component
export const FormButton = ({ 
  children, 
  type = 'button', 
  onClick, 
  loading = false, 
  disabled = false,
  variant = 'primary', // primary, secondary, danger, success
  size = 'md', // sm, md, lg
  className = ''
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
      )}
      {children}
    </button>
  );
};

// Alert/Notification Component
export const Alert = ({ 
  type = 'info', // info, success, warning, error
  title,
  message,
  onClose,
  show = true
}) => {
  if (!show) return null;

  const alertStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800'
  };

  const icons = {
    info: <FiInfo className="w-5 h-5" />,
    success: <FiCheckCircle className="w-5 h-5" />,
    warning: <FiAlertCircle className="w-5 h-5" />,
    error: <FiAlertCircle className="w-5 h-5" />
  };

  return (
    <div className={`border rounded-lg p-4 mb-4 ${alertStyles[type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3 mt-0.5">
          {icons[type]}
        </div>
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-1">{title}</h3>
          )}
          {message && (
            <p className="text-sm">{message}</p>
          )}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 ml-3 text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">بستن</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Loading Spinner Component
export const LoadingSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    gray: 'border-gray-500'
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-t-transparent ${colorClasses[color]} rounded-full animate-spin`}></div>
  );
}; 