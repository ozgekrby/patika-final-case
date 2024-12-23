import React, { useEffect, useState } from 'react';
import { invoiceService } from '../../../utils/serviceHelper.js';
import { INVOICE_STATES_TR } from '../../../constants/stateConstants.js';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await invoiceService('/invoices');
        if (response.success) {
          setInvoices(response.data.invoices);
        } else {
          console.error('Failed to fetch invoices');
        }
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-zinc-900">Faturalar</h1>
          <p className="mt-2 text-sm text-zinc-700">
            OK Commerce faturalarınızı yönetin
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
                    Dosya
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Durum
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Fatura Numarası
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-zinc-900">
                    Oluşturulma Tarihi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-zinc-900 sm:pl-0">
                      {invoice.orderId}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{invoice.paymentId}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{invoice.file}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{INVOICE_STATES_TR[invoice.state]}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{invoice.number}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-zinc-500">{new Date(invoice.createdAt).toLocaleDateString()}</td>
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