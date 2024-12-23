import React from 'react';
import { Outlet } from 'react-router-dom';

const CheckoutLayout = () => {
  return (
    <div className="admin-layout">
      <Outlet />
    </div>
  );
};

export default CheckoutLayout;