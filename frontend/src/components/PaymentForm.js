import React, { useState } from 'react';

function PaymentForm() {
  const [payment, setPayment] = useState({ user_id: 1, amount: 0 }); // Simulated user_id
  const [paymentId, setPaymentId] = useState('');

  const handlePayment = async () => {
    // Simulated API call to initiate payment
    const response = { payment_id: `PAY_${payment.user_id}_${Date.now()}`, status: 'pending' };
    setPaymentId(response.payment_id);
    console.log('Initiating payment:', payment);
    // In real case, redirect to gateway URL
    alert(`پرداخت با ID ${response.payment_id} آغاز شد.`);
  };

  const checkPaymentStatus = async () => {
    if (paymentId) {
      // Simulated API call to check status
      const status = { status: 'success' }; // Simulated success
      console.log('Payment status:', status);
      alert(`وضعیت پرداخت: ${status.status}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-poppins">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">فرم پرداخت</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">مبلغ (تومان)</label>
            <input
              type="number"
              value={payment.amount}
              onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            onClick={handlePayment}
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
          >
            شروع پرداخت
          </button>
          {paymentId && (
            <div className="mt-4">
              <p className="text-gray-700">شناسه پرداخت: {paymentId}</p>
              <button
                onClick={checkPaymentStatus}
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition mt-2"
              >
                بررسی وضعیت پرداخت
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PaymentForm;