import React, { useState, useEffect } from 'react';

function CouponDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: 0, valid_from: '', valid_to: '', max_uses: 0 });
  const [applyCode, setApplyCode] = useState('');

  useEffect(() => {
    // Simulated API call
    setCoupons([
      { id: 1, code: 'DISCOUNT10', discount_percentage: 10, valid_from: '2025-10-01', valid_to: '2025-12-31', max_uses: 100 }
    ]);
  }, []);

  const handleCreateCoupon = () => {
    console.log('Creating coupon:', newCoupon);
    // API call to /api/coupons
    setCoupons([...coupons, { ...newCoupon, id: coupons.length + 1 }]);
    setNewCoupon({ code: '', discount: 0, valid_from: '', valid_to: '', max_uses: 0 });
  };

  const handleApplyCoupon = () => {
    console.log('Applying coupon:', applyCode);
    // API call to /api/coupons/{applyCode}/use
    alert(`کوپن ${applyCode} با موفقیت اعمال شد!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-poppins">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">مدیریت کوپن‌ها</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">ایجاد کوپن جدید</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="کد کوپن"
                value={newCoupon.code}
                onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="درصد تخفیف"
                value={newCoupon.discount}
                onChange={(e) => setNewCoupon({ ...newCoupon, discount: e.target.value })}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={newCoupon.valid_from}
                onChange={(e) => setNewCoupon({ ...newCoupon, valid_from: e.target.value })}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="date"
                value={newCoupon.valid_to}
                onChange={(e) => setNewCoupon({ ...newCoupon, valid_to: e.target.value })}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="حداکثر استفاده"
                value={newCoupon.max_uses}
                onChange={(e) => setNewCoupon({ ...newCoupon, max_uses: e.target.value })}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleCreateCoupon}
                className="col-span-2 bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
              >
                ایجاد کوپن
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold">لیست کوپن‌ها</h2>
            <ul className="list-disc pl-5">
              {coupons.map(coupon => (
                <li key={coupon.id} className="text-gray-700">
                  {coupon.code} - {coupon.discount_percentage}% - معتبر از: {coupon.valid_from} تا {coupon.valid_to}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">استفاده از کوپن</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="کد کوپن"
                value={applyCode}
                onChange={(e) => setApplyCode(e.target.value)}
                className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
              >
                اعمال کوپن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CouponDashboard;