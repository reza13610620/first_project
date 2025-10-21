import React, { useState } from 'react';

function RegisterForm() {
  const [formData, setFormData] = useState({
    mobile: '', national_code: '', password: '', confirm_password: '',
    first_name: '', last_name: '', gender: '', address: '', birth_year: '',
    shaba_number: '', marital_status: '', username: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert('رمزها یکسان نیستند!');
      return;
    }
    console.log('Register:', formData);
    // API call to /api/register
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">شماره موبایل</label>
        <input
          type="text"
          value={formData.mobile}
          onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength="11"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">کد ملی</label>
        <input
          type="text"
          value={formData.national_code}
          onChange={(e) => setFormData({ ...formData, national_code: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength="10"
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
          minLength="6"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">تکرار رمز عبور</label>
        <input
          type="password"
          value={formData.confirm_password}
          onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          minLength="6"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">نام</label>
        <input
          type="text"
          value={formData.first_name}
          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">نام خانوادگی</label>
        <input
          type="text"
          value={formData.last_name}
          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">جنسیت</label>
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">انتخاب کنید</option>
          <option value="male">مرد</option>
          <option value="female">زن</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">آدرس</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">سال تولد</label>
        <input
          type="number"
          value={formData.birth_year}
          onChange={(e) => setFormData({ ...formData, birth_year: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">شماره شبا</label>
        <input
          type="text"
          value={formData.shaba_number}
          onChange={(e) => setFormData({ ...formData, shaba_number: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          maxLength="24"
        />
      </div>
      <div>
        <label className="block text-gray-700">وضعیت تأهل</label>
        <select
          value={formData.marital_status}
          onChange={(e) => setFormData({ ...formData, marital_status: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">انتخاب کنید</option>
          <option value="single">مجرد</option>
          <option value="married">متأهل</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700">شناسه کاربری</label>
        <input
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          readOnly
        />
      </div>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={true}
          onChange={() => {}}
          className="mr-2"
          required
        />
        <label className="text-gray-700">پذیرش قوانین و شرایط</label>
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
      >
        ثبت نام
      </button>
      <p className="text-sm text-red-500">
        توجه: شماره موبایل و شبا باید به نام دارنده کد ملی باشد. هرگونه مغایرت منجر به مسدود شدن حساب می‌شود.
      </p>
    </form>
  );
}

export default RegisterForm;