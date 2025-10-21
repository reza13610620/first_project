import React, { useState, useEffect } from 'react';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const user_id = 1; // جایگزین با context واقعی

  useEffect(() => {
    fetch(`/api/profile/${user_id}`)
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => setMessage('خطا در بارگذاری پروفایل'));
  }, [user_id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center font-iransans">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg transform transition-all hover:scale-102 duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">پروفایل کاربری</h1>
        {profile ? (
          <>
            <p className="text-md text-gray-700">نام: {profile.first_name} {profile.last_name}</p>
            <p className="text-md text-gray-700">اعتبار کیف پول: {profile.wallet_balance.toLocaleString()} تومان</p>
            <p className="text-md text-gray-700">اعتبار در انتظار: {profile.pending_balance.toLocaleString()} تومان</p>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">گزارش خریدها</h2>
              {profile.purchases.length > 0 ? (
                profile.purchases.map(p => (
                  <div key={p.id} className="border p-2 rounded-lg mb-2 bg-gray-50">
                    <p>کالا: {p.product_id}</p>
                    <p>قیمت: {p.price} تومان</p>
                    <p>تعداد: {p.quantity_requested}</p>
                  </div>
                ))
              ) : (
                <p>خریدی ثبت نشده است.</p>
              )}
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-gray-800">گزارش فروش‌ها</h2>
              {profile.sales.length > 0 ? (
                profile.sales.map(s => (
                  <div key={s.id} className="border p-2 rounded-lg mb-2 bg-gray-50">
                    <p>کالا: {s.product_id}</p>
                    <p>قیمت: {s.price} تومان</p>
                    <p>تعداد: {s.quantity_supplied}</p>
                  </div>
                ))
              ) : (
                <p>فروشی ثبت نشده است.</p>
              )}
            </div>
          </>
        ) : (
          <p>در حال بارگذاری...</p>
        )}
        {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default UserProfile;