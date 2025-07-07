import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue', 
  text = '', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    red: 'border-red-500',
    gray: 'border-gray-500',
    gold: 'border-yellow-500',
    navy: 'border-blue-800'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-t-transparent ${colorClasses[color]} rounded-full animate-spin`}></div>
      {text && (
        <span className="mr-2 text-sm text-gray-600">{text}</span>
      )}
    </div>
  );
};

// Full page loading spinner
export const FullPageSpinner = ({ text = 'در حال بارگذاری...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <LoadingSpinner size="xl" color="blue" />
        <p className="mt-4 text-gray-600">{text}</p>
      </div>
    </div>
  );
};

// Inline loading spinner
export const InlineSpinner = ({ size = 'sm', color = 'blue' }) => {
  return <LoadingSpinner size={size} color={color} />;
};

// Button loading spinner
export const ButtonSpinner = ({ size = 'sm', color = 'white' }) => {
  return (
    <div className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} border-2 border-t-transparent border-white rounded-full animate-spin`}></div>
  );
};

export default LoadingSpinner; 