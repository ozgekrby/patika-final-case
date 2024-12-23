import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { commerceService } from '../../utils/serviceHelper.js';

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await commerceService(`/orders/${orderId}`);
      if (response.success) {
        setOrder(response.data.order);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-green-600">Ödeme Başarılı!</h1>
      <p className="mt-4 text-lg text-zinc-700">Ödemeniz başarıyla tamamlandı. Teşekkür ederiz!</p>
      <p className="mt-4 text-lg text-zinc-700">Sipariş numaranız: {order.number}</p>
    </div>
  );
};

export default PaymentSuccess;