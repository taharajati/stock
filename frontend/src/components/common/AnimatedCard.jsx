import React from 'react';

export default function AnimatedCard({ children, className = '' }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 transition-transform duration-200 hover:scale-105 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
} 