import React, { createContext, useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import { commerceService } from '../utils/serviceHelper.js'
import { NotificationContext } from './NotificationContext.jsx'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {

    const checkAuth = async () => {

      try {
        const response = await commerceService('/auth/check-auth')

        setUser(response.success ? response.data.user : null)

        if (user) {
          if (location.pathname === '/admin/login' && response.data.user.roles.includes('admin')) {
            navigate('/admin')
          }
          if (location.pathname === '/login' && response.data.user.roles.includes('user')) {
            navigate('/')
          }
        }

      } catch (error) {
        Cookies.remove('authToken')
        setUser(null)
      }
    }

    checkAuth()
  }, [navigate, location])

  const login = (userData, routeName) => {
    setUser(userData)

    if (routeName === 'admin') {
      navigate('/admin')
    } else {
      navigate('/')
    }
  }

  const logout = (routeName) => {
    setUser(null)
    Cookies.remove('authToken')

    if (routeName === 'admin') {
      navigate('/admin/login')
    } else {
      navigate('/login')
    }
  }

  const value = {
    user,
    login,
    logout,
    hasAuth: user,
    isAdmin: user?.roles.includes('admin'),
    isUser: user?.roles.includes('user'),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}