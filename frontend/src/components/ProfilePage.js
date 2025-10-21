import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Simulated API call
    setProfile({
      id: 1, mobile: '09123456789', national_code: '1234567890',
      first_name: 'رضا', last_name: 'پوررضا', gender: 'male',
      address: 'تهران', birth_year: 1990, shaba_number: 'IR1234567890',
      marital_status: 'single', username: 'USER_123456'
    });
    setTransactions([
      { id: 1, amount: 100000, type: 'debit', created_at: '2025-10-17' },
      { id: 2, amount: 50000, type: 'credit', created_at: '2025-10-16' }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-poppins">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">پروفایل کاربری</h1>
        {profile ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><strong>نام:</strong> {profile.first_name}</div>
              <div><strong>نام خانوادگی:</strong> {profile.last_name}</div>
              <div><strong>شماره موبایل:</strong> {profile.mobile}</div>
              <div><strong>کد ملی:</strong> {profile.national_code}</div>
              <div><strong>جنسیت:</strong> {profile.gender}</div>
              <div><strong>آدرس:</strong> {profile.address}</div>
              <div><strong>سال تولد:</strong> {profile.birth_year}</div>
              <div><strong>شماره شبا:</strong> {profile.shaba_number || 'ثبت نشده'}</div>
              <div><strong>وضعیت تأهل:</strong> {profile.marital_status}</div>
              <div><strong>شناسه کاربری:</strong> {profile.username}</div>
            </div>
            <h2 className="text-xl font-semibold mt-6">تراکنش‌ها</h2>
            <ul className="list-disc pl-5">
              {transactions.map(t => (
                <li key={t.id} className="text-gray-700">
                  {t.amount} تومان - {t.type} - تاریخ: {t.created_at}
                </li>
              ))}
            </ul>
          </div>
        ) : <p>در حال بارگذاری...</p>}
      </div>
    </div>
  );
}

export default ProfilePage;