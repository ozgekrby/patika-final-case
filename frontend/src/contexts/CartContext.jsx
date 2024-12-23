import React, { createContext, useState, useContext, useEffect } from 'react'
import { NotificationContext } from './NotificationContext.jsx'
import Cookies from 'js-cookie';
import {
  getCartRequest,
  addCartItemRequest,
  removeCartItemRequest,
  clearCartRequest
} from '../services/cartService.js'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const { setNotification } = useContext(NotificationContext)
  const [cart, setCart] = useState([])

  useEffect(() => {

    const fetchCart = async () => {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          return
        }
        const cart = await getCartRequest()
        setCart(cart)
      } catch (error) {
        console.error('Sepet bilgileri alınırken bir hata oluştu:', error)
      }
    }

    fetchCart()
  }, [])

  const addToCart = async (product, quantity = 1) => {
    try {
      const cart = await addCartItemRequest(product, quantity)
      if (cart) {
        setCart(cart)
        setNotification({
          type: 'success',
          title: 'Sepete Ürün Eklendi',
          message: `Sepetenize yeni bir ürün eklediniz`,
          timeout: 3000,
        })
      }
    } catch (error) {
      if (error.message === 'Erişim tokenı eksik!') {
        setNotification({
          type: 'error',
          title: 'Hata',
          message: 'Sepete ürün eklemek için giriş yapmalısınız',
        })
      } else {
        setNotification({
          type: 'error',
          title: 'Hata',
          message: `Ürün sepete eklenirken bir hata oluştu: ${error.message}`,
        })
      }
    }
  }

  const removeFromCart = async (productId) => {
    try {
      if (await removeCartItemRequest(productId)) {
        setCart((prevCart) => prevCart.filter((p) => p.id !== productId))
        setNotification({
          type: 'success',
          title: 'Ürün Silindi',
          message: `Ürün başarıyla sepette silindi`,
          timeout: 3000,
        })
      }
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Hata',
        message: `Ürün sepetten silinirken bir hata oluştu: ${error.message}`,
      })
    }
  }

  const updateCartQuantity = async (productId, prevQuantity, newQuantity) => {
    try {
      const quantityDifference = newQuantity - prevQuantity
      const cart = await addCartItem(productId, quantityDifference)
      setCart(cart)
      setNotification({
        type: 'success',
        title: 'Ürün Miktarı Güncellendi',
        message: `Ürün miktarı başarıyla güncellendi`,
        timeout: 3000,
      })
    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Hata',
        message: `Ürün miktarı güncellenirken bir hata oluştu: ${error.message}`,
      })
    }
  }

  const clearCart = async () => {
    try {

      if (await clearCartRequest()) {
        setCart([])
      }

    } catch (error) {
      setNotification({
        type: 'error',
        title: 'Hata',
        message: `Sepet temizlenirken bir hata oluştu: ${error.message}`,
      })
    }
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  return useContext(CartContext)
}