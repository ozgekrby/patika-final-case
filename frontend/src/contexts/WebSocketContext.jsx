import React, { createContext, useContext, useEffect, useState } from 'react'
import { NotificationContext } from './NotificationContext.jsx'

export const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3010');
    ws.onopen = () => {
      console.log('WebSocket bağlantısı kuruldu');
    };
    ws.onmessage = (message) => {
      console.log('WebSocket mesajı alındı:', message.data);
      const messageData = JSON.parse(message.data);
      switch (messageData.event) {
        case 'order_created':
          setNotification({
            type: 'info',
            title: 'Yeni Bildiriminiz Var',
            message: `Siparişiniz alındı: ${messageData.order.number}`,
          });
          break;
        case 'invoice_created':
          setNotification({
            type: 'info',
            title: 'Yeni Bildiriminiz Var',
            message: `Faturanız oluşturuldu...`,
          });
          break;
        default:
      }
    };
    ws.onclose = () => {
      console.log('WebSocket bağlantısı kapandı');
    };
    setSocket(ws);

    return () => {
      ws.close();
    };
  }, [setNotification]);

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};