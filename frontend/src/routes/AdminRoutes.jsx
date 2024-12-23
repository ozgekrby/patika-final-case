import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Admin/Dashboard';
import Products from '../pages/Admin/Product/Products';
import Orders from '../pages/Admin/Order/Orders';
import Categories from '../pages/Admin/Category/Categories'
import Payments from '../pages/Admin/Payments/Payments'
import Invoices from '../pages/Admin/Invoices/Invoices'
import Users from '../pages/Admin/Users/Users'
import NotFound from '../pages/Admin/NotFound';
import CreateCategory from '../pages/Admin/Category/Create.jsx'
import EditCategory from '../pages/Admin/Category/Edit.jsx';
import CreateProduct from '../pages/Admin/Product/Create.jsx'
import EditProduct from '../pages/Admin/Product/Edit.jsx'

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/create" element={<CreateCategory />} />
      <Route path="/categories/:id/edit" element={<EditCategory />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/create" element={<CreateProduct />} />
      <Route path="/products/:id/edit" element={<EditProduct />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoutes;