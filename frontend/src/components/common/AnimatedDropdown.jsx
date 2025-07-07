import React from 'react';

export default function AnimatedDropdown({ open, children, className = '' }) {
  return (
    <div
      className={`origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
        transition-all duration-200 z-50
        ${open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}
        ${className}`}
    >
      {children}
    </div>
  );
} 