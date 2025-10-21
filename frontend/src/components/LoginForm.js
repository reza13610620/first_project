import React, { useState } from 'react';

function LoginForm({ onLogin, onAdminLogin }) {
  const [formData, setFormData] = useState({ identifier: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', formData);
    if (formData.identifier === 'admin' && formData.password === 'admin123') {
      onAdminLogin();
    } else {
      onLogin();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">شماره موبایل یا کد ملی</label>
        <input
          type="text"
          value={formData.identifier}
          onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">رمز عبور</label>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        ورود
      </button>
      <a href="#" className="text-sm text-blue-600 hover:underline">فراموشی رمز عبور</a>
    </form>
  );
}

export default LoginForm;