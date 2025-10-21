import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [settings, setSettings] = useState([]);
  const [newSetting, setNewSetting] = useState({ key: '', value: '', description: '', is_active: false });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Simulated API call to fetch settings
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => setSettings(data));
  }, []);

  const handleUpdateSetting = () => {
    fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSetting),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
        setSettings([...settings, data]);
        setNewSetting({ key: '', value: '', description: '', is_active: false });
      })
      .catch(err => setMessage('خطا در به‌روزرسانی تنظیمات'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-poppins">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">پنل ادمین</h1>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">تنظیمات</h2>
          <div className="grid grid-cols-1 gap-4">
            {settings.map(setting => (
              <div key={setting.id} className="border p-4 rounded-lg">
                <p><strong>کلید:</strong> {setting.key}</p>
                <p><strong>مقدار:</strong> {setting.value}</p>
                <p><strong>توضیحات:</strong> {setting.description}</p>
                <p><strong>فعال:</strong> {setting.is_active ? 'بله' : 'خیر'}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <input
              type="text"
              placeholder="کلید (مثال: inquiry_percentage)"
              value={newSetting.key}
              onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="number"
              step="0.01"
              placeholder="مقدار"
              value={newSetting.value}
              onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <input
              type="text"
              placeholder="توضیحات"
              value={newSetting.description}
              onChange={(e) => setNewSetting({ ...newSetting, description: e.target.value })}
              className="w-full p-2 border rounded-lg mb-2"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newSetting.is_active}
                onChange={(e) => setNewSetting({ ...newSetting, is_active: e.target.checked })}
                className="mr-2"
              />
              فعال
            </label>
            <button
              onClick={handleUpdateSetting}
              className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition mt-2"
            >
              به‌روزرسانی تنظیمات
            </button>
            {message && <p className="text-center text-gray-700 mt-2">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;