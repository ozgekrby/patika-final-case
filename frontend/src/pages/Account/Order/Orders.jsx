import React, { useEffect, useState } from 'react';
import { formatPrice } from '../../../utils/formatHelper.js'
import { ORDER_STATES_TR, PAYMENT_STATES_TR, INVOICE_STATES_TR } from '../../../constants/stateConstants.js';
import { getOrders } from '../../../services/orderService.js'

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await getOrders();
        setOrders(orders ?? []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-zinc-900">Siparişler</h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-300">
              <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-900 sm:pl-0">
                  Sipariş Numarası
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                  Durum
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                  Ödeme Durumu
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                  Fatura Durumu
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                  Toplam
                </th>
              </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 sm:pl-0">
                    {order.number}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{ORDER_STATES_TR[order.state]}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{PAYMENT_STATES_TR[order.paymentState]}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{INVOICE_STATES_TR[order.invoiceState]}</td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{formatPrice(order.total)}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}