import React from 'react';

export default function AnimatedButton({ children, className = '', ...props }) {
  return (
    <button
      className={`transition-transform duration-200 hover:scale-105 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
} 