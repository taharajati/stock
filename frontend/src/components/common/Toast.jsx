import React, { useState, useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';

const Toast = ({ 
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose,
  show = true 
}) => {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
  }, [show]);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose && onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const toastStyles = {
    info: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-800',
      icon: <FiInfo className="w-5 h-5 text-blue-600" />
    },
    success: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      text: 'text-green-800',
      icon: <FiCheckCircle className="w-5 h-5 text-green-600" />
    },
    warning: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-200',
      text: 'text-yellow-800',
      icon: <FiAlertCircle className="w-5 h-5 text-yellow-600" />
    },
    error: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      text: 'text-red-800',
      icon: <FiAlertCircle className="w-5 h-5 text-red-600" />
    }
  };

  const style = toastStyles[type];

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${style.bg} ${style.border} border rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">
          {style.icon}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className={`text-sm font-medium ${style.text} mb-1`}>
              {title}
            </h3>
          )}
          {message && (
            <p className={`text-sm ${style.text}`}>
              {message}
            </p>
          )}
        </div>
        <div className="flex-shrink-0 mr-2">
          <button
            onClick={() => {
              setIsVisible(false);
              onClose && onClose();
            }}
            className={`inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200`}
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Container for managing multiple toasts
export const ToastContainer = ({ toasts, onRemoveToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast, index) => (
        <Toast
          key={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={() => onRemoveToast(toast.id)}
          show={true}
        />
      ))}
    </div>
  );
};

// Hook for managing toasts
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const showSuccess = (message, title = 'موفقیت') => {
    addToast({ type: 'success', title, message });
  };

  const showError = (message, title = 'خطا') => {
    addToast({ type: 'error', title, message });
  };

  const showWarning = (message, title = 'هشدار') => {
    addToast({ type: 'warning', title, message });
  };

  const showInfo = (message, title = 'اطلاعات') => {
    addToast({ type: 'info', title, message });
  };

  return {
    toasts,
    addToast,
    removeToast,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
};

export default Toast; 