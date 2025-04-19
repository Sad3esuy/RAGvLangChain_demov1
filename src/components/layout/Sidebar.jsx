// src/components/layout/Sidebar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X, LayoutDashboard, Upload, MessageSquare, Clock, Settings } from 'lucide-react';

function Sidebar({ open, onClose }) {
  const { t } = useTranslation();
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const links = [
    { path: '/', label: t('nav.dashboard'), icon: <LayoutDashboard size={20} /> },
    { path: '/import', label: t('nav.import'), icon: <Upload size={20} /> },
    { path: '/chat', label: t('nav.chat'), icon: <MessageSquare size={20} /> },
    { path: '/history', label: t('nav.history'), icon: <Clock size={20} /> },
    { path: '/settings', label: t('nav.settings'), icon: <Settings size={20} /> },
  ];
  
  return (
    <>
      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={onClose}>
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </div>
      )}
      
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-full md:h-[calc(100vh-4rem)] w-64 
                  ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
                  bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto flex-shrink-0
                  transition-transform duration-200 ease-in-out`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-semibold">{t('app.name')}</h2>
            <button 
              onClick={onClose}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="space-y-1">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive(link.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;