import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import SiteRoutes from './routes/SiteRoutes'
import AdminLayout from './components/layout/AdminLayout'
import AdminRoutes from './routes/AdminRoutes'
import AdminAuthLayout from './components/layout/AdminAuthLayout'
import Login from './pages/Admin/Auth/Login'
import Checkout from './pages/Checkout/Checkout'
import CheckoutLayout from './components/layout/CheckoutLayout'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import LoadingOverlay from './components/common/LoadingOverlay'
import { WebSocketProvider } from './contexts/WebSocketContext.jsx'
import { NotificationProvider } from './contexts/NotificationContext.jsx'
import Notification from './components/common/Notification'

const {
  BASE_URL
} = import.meta.env

const App = () => {

  // const [isLoading, setIsLoading] = useState(false)
  //
  // useEffect(() => {
  //   setIsLoading(false)
  // }, [])

  return (
    <Router basename={BASE_URL}>
      {/*<LoadingOverlay isLoading={isLoading} />*/}
      <NotificationProvider>
        <WebSocketProvider>
          <AuthProvider>
            <CartProvider>
              <Routes>
                <Route element={<SiteLayout/>}>
                  <Route path="/*" element={<SiteRoutes/>}/>
                </Route>
                <Route element={<AdminAuthLayout/>}>
                  <Route path="/admin/login" element={<Login/>}/>
                </Route>
                <Route element={<CheckoutLayout/>}>
                  <Route path="/checkout" element={<Checkout/>}/>
                </Route>
                <Route element={<AdminLayout/>}>
                  <Route path="/admin/*" element={<AdminRoutes/>}/>
                </Route>
              </Routes>
            </CartProvider>
          </AuthProvider>
          <Notification />
        </WebSocketProvider>
      </NotificationProvider>
    </Router>
  )
}

const AdminRoutesWrapper = () => {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return null
  }

  return (
    <Route element={<AdminLayout/>}>
      <Route path="/admin/*" element={<AdminRoutes/>}/>
    </Route>
  )
}

export default App