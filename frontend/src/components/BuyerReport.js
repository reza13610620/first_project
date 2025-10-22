import React, { useState, useEffect } from 'react';

function BuyerReport() {
  const [purchases, setPurchases] = useState([]);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');
  const user_id = 1; // Replace with actual user context

  useEffect(() => {
    fetch(`/api/buyers/${user_id}/purchases-report?inquiry_type=${filter === 'all' ? '' : filter}`)
      .then(res => res.json())
      .then(data => setPurchases(data.purchases))
      .catch(err => setMessage('خطا در بارگذاری گزارش'));
  }, [user_id, filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center font-iransans">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg transform transition-all hover:scale-102 duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">گزارش خریدها</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">فیلتر بر اساس نوع استعلام:</label>
          <select
            value={filter}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">همه</option>
            <option value="monthly">ماهانه</option>
            <option value="daily">روزانه</option>
            <option value="weekly">هفتگی</option>
            <option value="seasonal">فصلی</option>
            <option value="urgent">فوری</option>
          </select>
        </div>
        {purchases.length > 0 ? (
          <div className="space-y-4">
            {purchases.map(purchase => (
              <div key={purchase.id} className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200">
                <p className="text-md font-medium text-gray-800">نام کالا: {purchase.product_id.name}</p>
                <p className="text-md text-gray-600">تعداد خرید: {purchase.quantity_requested || 0}</p>
                <p className="text-md text-gray-600">تاریخ: {new Date(purchase.created_at).toLocaleDateString('fa-IR')}</p>
                <p className="text-md text-gray-600">شماره استعلام: {purchase.id}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">هیچ خریدی ثبت نشده است.</p>
        )}
        {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
        <button
          onClick={() => handleSaveToPersonalBox(purchases[0]?.id, 'purchase')}
          className="mt-4 bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700 transition duration-300"
          disabled={!purchases.length}
        >
          ذخیره در صندوق شخصی
        </button>
      </div>
    </div>
  );
}

export default BuyerReport;