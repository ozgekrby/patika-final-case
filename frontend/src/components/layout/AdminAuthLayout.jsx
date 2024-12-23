import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminAuthLayout = () => {
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default AdminAuthLayout;