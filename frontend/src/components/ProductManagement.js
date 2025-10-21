import React, { useState, useEffect } from 'react';

function ProductManagement() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    stock: '',
    description: '',
    image_url: '',
    seller_id: 1, // جایگزین با context واقعی
    unit: 'عدد'
  });
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch(`/api/products?seller_id=${formData.seller_id}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => setMessage('خطا در بارگذاری محصولات'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = editProductId ? `/api/products/${editProductId}` : '/api/products';
    const method = editProductId ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        stock: parseInt(formData.stock),
        seller_id: parseInt(formData.seller_id)
      }),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(`محصول ${editProductId ? 'به‌روزرسانی' : 'ایجاد'} شد`);
        setEditProductId(null);
        setFormData({ name: '', category: '', stock: '', description: '', image_url: '', seller_id: 1, unit: 'عدد' });
        fetchProducts();
      })
      .catch(err => setMessage('خطا در ثبت محصول'));
  };

  const handleEdit = (product) => {
    setEditProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      stock: product.stock,
      description: product.description,
      image_url: product.image_url || '',
      seller_id: product.seller_id,
      unit: product.unit
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center font-iransans">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg transform transition-all hover:scale-102 duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">مدیریت محصولات</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">نام محصول</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">دسته‌بندی</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">موجودی</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">توضیحات</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">لینک تصویر</label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">واحد</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="عدد">عدد</option>
              <option value="بسته">بسته</option>
              <option value="کیلوگرم">کیلوگرم</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition duration-300 transform hover:scale-105"
          >
            {editProductId ? 'به‌روزرسانی محصول' : 'ایجاد محصول'}
          </button>
        </form>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">لیست محصولات</h2>
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded-lg mb-3 bg-gray-50 hover:bg-gray-100 transition duration-200">
              <p className="text-md font-medium text-gray-800">نام: {product.name}</p>
              <p className="text-md text-gray-600">دسته‌بندی: {product.category}</p>
              <p className="text-md text-gray-600">موجودی: {product.stock} {product.unit}</p>
              <p className="text-md text-gray-600">وضعیت: {product.status}</p>
              <button
                onClick={() => handleEdit(product)}
                className="mt-2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 mr-2"
              >
                ویرایش
              </button>
            </div>
          ))}
        </div>
        {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}

export default ProductManagement;