// src/components/layout/Layout.jsx
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 max-w-[850px] mx-auto w-full overflow-y-auto scrollbar-hide">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;