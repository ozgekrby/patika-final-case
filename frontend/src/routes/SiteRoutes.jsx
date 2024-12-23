import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import NotFound from '../pages/NotFound';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import CategoryDetail from '../pages/Category/Detail'
import ProductDetail from '../pages/Product/Detail'
import CartDetail from '../pages/Cart/Detail'
import AccountRoutes from './AccountRoutes'
import AccountLayout from '../components/layout/AccountLayout'
import PaymentSuccess from '../pages/Payment/Success';
import PaymentFailure from '../pages/Payment/Failure';

const SiteRoutes = () => {
  const isUser = true;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/kategori/:slug" element={<CategoryDetail />} />
      <Route path="/urun/:slug" element={<ProductDetail />} />
      <Route path="/sepet" element={<CartDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/odeme/basarili/:orderId" element={<PaymentSuccess />} />
      <Route path="/odeme/basarisiz" element={<PaymentFailure />} />
      {isUser && (
        <Route element={<AccountLayout />}>
          <Route path="/hesabim/*" element={<AccountRoutes />} />
        </Route>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default SiteRoutes;