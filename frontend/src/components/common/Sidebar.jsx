import React from 'react';

export default function Sidebar({ open, onClose, children, position = 'right', width = 'w-72' }) {
  // position: 'right' or 'left'
  const sideClass = position === 'right' ? 'right-0' : 'left-0';
  const translateClass = position === 'right' ? 'translate-x-full' : '-translate-x-full';

  return (
    <>
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 z-40 bg-black transition-opacity duration-300
          ${open ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 ${sideClass} h-full ${width} bg-white shadow-lg z-50
          transform transition-transform duration-300
          ${open ? 'translate-x-0' : translateClass}
        `}
      >
        <button
          className="absolute left-4 top-4 text-gray-500 hover:text-red-500 transition"
          onClick={onClose}
        >
          بستن
        </button>
        <div className="p-6">{children}</div>
      </div>
    </>
  );
} 