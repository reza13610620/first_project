import React, { useState, useEffect } from 'react';

function InquiryForm() {
  const [formData, setFormData] = useState({
    product_id: '',
    seller_id: 1, // جایگزین با context واقعی
    inquiry_type: 'monthly',
    quantity_requested: '',
    city: ''
  });
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    fetch(`/api/profile/${formData.seller_id}`)
      .then(res => res.json())
      .then(data => {
        setUserProfile(data);
        setFormData(prev => ({ ...prev, city: data.default_city || '' }));
      });
  }, [formData.seller_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.product_id || !formData.inquiry_type || !formData.quantity_requested || !formData.city) {
      setMessage('همه فیلدها الزامی هستند');
      return;
    }
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(res => res.json())
      .then(data => setMessage(data.message || 'استعلام با موفقیت ثبت شد'))
      .catch(err => setMessage('خطا در ثبت استعلام'));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center font-iransans">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg transform transition-all hover:scale-102 duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">فرم درخواست استعلام</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">انتخاب کالا</label>
            <select
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">کالا را انتخاب کنید</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name} (کد: {product.id})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">نوع استعلام</label>
            <select
              name="inquiry_type"
              value={formData.inquiry_type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="monthly">ماهانه</option>
              <option value="daily">روزانه</option>
              <option value="weekly">هفتگی</option>
              <option value="seasonal">فصلی</option>
              <option value="urgent">فوری</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">تعداد مورد نیاز</label>
            <input
              type="number"
              name="quantity_requested"
              value={formData.quantity_requested}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">شهر (پیش‌فرض: {userProfile?.default_city || 'شهر مشخص نشده'})</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="برای تغییر شهر، نام شهر را وارد کنید"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            ثبت استعلام
          </button>
        </form>
        {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default InquiryForm;