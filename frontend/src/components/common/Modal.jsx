import React from 'react';

export default function Modal({ open, onClose, children }) {
  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        ${open ? 'pointer-events-auto' : 'pointer-events-none'}
      `}
    >
      {/* Overlay */}
      <div
        className={`
          absolute inset-0 bg-black transition-opacity duration-300
          ${open ? 'opacity-40' : 'opacity-0'}
        `}
        onClick={onClose}
      />
      {/* Modal content */}
      <div
        className={`
          relative bg-white rounded-lg shadow-lg p-8 z-10
          transform transition-all duration-300
          ${open ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}
        `}
      >
        {children}
      </div>
    </div>
  );
} 