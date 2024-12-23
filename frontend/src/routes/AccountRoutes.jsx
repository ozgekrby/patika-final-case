import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Account/Dashboard';
import ProfileDetail from '../pages/Account/Profile/Detail';
import Orders from '../pages/Account/Order/Orders';
import OrderDetail from '../pages/Account/Order/Detail';

const AccountRoutes = () => {

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/profilim" element={<ProfileDetail />} />
      <Route path="/siparislerim" element={<Orders />} />
      <Route path="/siparis-detay/:id" element={<OrderDetail />} />
    </Routes>
  );
};

export default AccountRoutes;