import React from 'react';

const PaymentFailure = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-red-600">Ödeme Başarısız!</h1>
      <p className="mt-4 text-lg text-zinc-700">Ödemeniz gerçekleştirilemedi. Lütfen tekrar deneyin.</p>
    </div>
  );
};

export default PaymentFailure;