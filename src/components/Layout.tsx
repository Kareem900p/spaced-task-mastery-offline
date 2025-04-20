
import React from 'react';
import { Outlet } from 'react-router-dom';
import OfflineIndicator from './OfflineIndicator';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
      <OfflineIndicator />
    </div>
  );
};

export default Layout;
