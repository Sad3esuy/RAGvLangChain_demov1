// src/components/common/Toast.jsx
import { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    success: <CheckCircle className="w-5 h-5 text-success" />,
    error: <AlertCircle className="w-5 h-5 text-error" />,
    info: <Info className="w-5 h-5 text-primary" />,
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center p-4 rounded-md shadow-md bg-white dark:bg-gray-800 border-l-4 min-w-[300px]"
            style={{
              borderLeftColor: 
                toast.type === 'success' ? '#10B981' : 
                toast.type === 'error' ? '#EF4444' : '#3B82F6',
            }}
          >
            <div className="mr-3">
              {icons[toast.type] || icons.info}
            </div>
            <div className="flex-1 text-gray-800 dark:text-gray-200">
              {toast.message}
            </div>
            <button className="ml-3" onClick={() => {}}>
              <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};