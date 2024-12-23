import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { commerceService } from '../utils/serviceHelper.js'

const userLoginNavigate = (navigate, requiredRole) => {
  Cookies.remove('authToken');
  if (requiredRole === 'admin') {
    navigate('/admin/login');
  } else {
    navigate('/login');
  }
}

const useAuth = (requiredRole) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    const token = Cookies.get('authToken');

    if (!token) {
      userLoginNavigate(navigate, requiredRole);
    }

    const checkAuth = async () => {

      try {
        const response = await commerceService('/auth/check-auth');

        if (!response.success || !response.data.user.roles.includes(requiredRole)) {
          userLoginNavigate(navigate, requiredRole);
        } else {
          if (location.pathname === '/admin/login' && requiredRole === 'admin') {
            navigate('/admin');
          }
          if (location.pathname === '/login' && requiredRole === 'user') {
            navigate('/');
          }
        }
      } catch (error) {
        userLoginNavigate(navigate, requiredRole);
      }
    };

    checkAuth();

  }, [navigate, requiredRole]);
};

export default useAuth;