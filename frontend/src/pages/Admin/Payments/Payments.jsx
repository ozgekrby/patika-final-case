import React, { useEffect, useState } from 'react';
import { paymentService } from '../../../utils/serviceHelper.js'
import { formatPrice } from '../../../utils/formatHelper.js';
import { PAYMENT_STATES_TR } from '../../../constants/stateConstants.js';

export default function Payments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await paymentService('/payments');
        if (response.success) {
          setPayments(response.data.payments);
        } else {
          console.error('Failed to fetch payments');
        }
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-zinc-900">Ödemeler</h1>
          <p className="mt-2 text-sm text-zinc-700">
            OK Commerce ödemelerinizi yönetin
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-zinc-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-zinc-900 sm:pl-0">
                    Sipariş ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Ödeme ID
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Tutar
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Durum
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Oluşturulma Tarihi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 sm:pl-0">
                      {payment.orderId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{payment.paymentIntentId}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{formatPrice(payment.amount)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{PAYMENT_STATES_TR[payment.state]}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{new Date(payment.createdAt).toLocaleDateString()}</td>
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