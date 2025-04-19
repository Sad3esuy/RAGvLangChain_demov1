// src/components/common/Toast.jsx
import { createContext, useContext, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  
  const showToast = ({ type = 'info', message, duration = 3000 }) => {
    const id = Date.now();
    
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, type, message }
    ]);
    
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, duration);
  };
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toaster toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const Toaster = ({ toasts = [] }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg 
                     border border-gray-200 dark:border-gray-700
                     transition-all duration-300 ease-in-out"
        >
          <div className="mr-3">{icons[toast.type]}</div>
          <p className="text-sm text-gray-700 dark:text-gray-300">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};