import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './SiteLayout/Footer'
import Header from './SiteLayout/Header'

const SiteLayout = () => {
  return (
    <div className="site-layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default SiteLayout;