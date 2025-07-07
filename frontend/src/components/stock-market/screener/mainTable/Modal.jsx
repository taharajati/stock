import React from 'react';

const Modal = ({ onClose, children }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-40 flex items-center w-[100%] justify-center" style={{fontFamily: 'Vazir, tahoma, Arial, sans-serif'}}>
      <div className="relative bg-navy text-gold p-8 max-w-4xl w-[80%] h-[80%] mx-auto rounded-lg shadow-lg">
        <button
          className="absolute top-0 right-0 m-4 text-3xl cursor-pointer text-gold hover:bg-gold/20 rounded-full px-3 py-1 font-bold transition"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;