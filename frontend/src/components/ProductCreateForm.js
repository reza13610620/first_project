import React, { useState } from 'react';

function ProductCreateForm() {
  const [product, setProduct] = useState({ name: '', category: '', stock: '', description: '', image_url: '', seller_id: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    console.log('Product created:', product);
    setMessage('محصول با موفقیت تعریف شد!');
    setProduct({ name: '', category: '', stock: '', description: '', image_url: '', seller_id: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-poppins">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">تعریف محصول جدید</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="نام محصول"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="دسته‌بندی"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="number"
            placeholder="موجودی"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="توضیحات"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="آدرس تصویر"
            value={product.image_url}
            onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="شناسه فروشنده"
            value={product.seller_id}
            onChange={(e) => setProduct({ ...product, seller_id: e.target.value })}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
          >
            تعریف محصول
          </button>
          {message && <p className="text-center text-green-600 mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default ProductCreateForm;