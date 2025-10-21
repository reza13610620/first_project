import React, { useState, useEffect } from 'react';

function SellerReport() {
  const [report, setReport] = useState({});
  const [message, setMessage] = useState('');
  const user_id = 1; // Replace with actual user context

  useEffect(() => {
    fetch(`/api/sellers/${user_id}/sales-report`)
      .then(res => res.json())
      .then(data => setReport(data))
      .catch(err => setMessage('خطا در بارگذاری گزارش'));
  }, [user_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center font-iransans">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg transform transition-all hover:scale-102 duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">گزارش فروش‌ها</h1>
        {report.sales && report.sales.length > 0 ? (
          <div className="space-y-4">
            {report.sales.map(sale => (
              <div key={sale.id} className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200">
                <p className="text-md font-medium text-gray-800">نام کالا: {sale.product_id.name}</p>
                <p className="text-md text-gray-600">تعداد فروش: {sale.quantity_supplied || 0}</p>
              </div>
            ))}
            <div className="mt-4 text-center text-gray-700">
              <p>تعداد کل درخواست‌ها: {report.total_requests}</p>
              <p>تعداد فروش‌ها: {report.total_sold}</p>
              <p>درصد فروش: {report.percentage_sold}%</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">هیچ فروشی ثبت نشده است.</p>
        )}
        {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default SellerReport;