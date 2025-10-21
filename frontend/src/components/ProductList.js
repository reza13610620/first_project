import React, { useState, useEffect } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const user_id = 1; // Replace with actual user context

  useEffect(() => {
    // Fetch products
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));

    // Fetch user wallet
    fetch(`/api/profile/${user_id}/wallet`)
      .then(res => res.json())
      .then(data => {
        setWalletBalance(data.wallet_balance);
        setPendingBalance(data.pending_balance);
      });
  }, []);

  const handleFavorite = (product_id) => {
    fetch(`/api/users/${user_id}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ item_id: product_id, item_type: 'product' }),
    })
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => setMessage('خطا در افزودن به علاقه‌مندی‌ها'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center font-iransans">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg transform transition-all hover:scale-102 duration-300">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">لیست محصولات</h1>
        <div className="space-y-4">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-200">
              <p className="text-md font-medium text-gray-800">نام: {product.name} ({product.description})</p>
              <p className="text-md text-gray-600">موجودی: {product.stock} {product.unit}</p>
              <button
                onClick={() => handleFavorite(product.id)}
                className="mt-2 bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition duration-300"
              >
                افزودن به علاقه‌مندی‌ها
              </button>
            </div>
          ))}
        </div>
        {message && <p className="text-center text-gray-600 mt-4">{message}</p>}
        <div className="mt-4 text-center text-gray-700">
          <p>اعتبار قابل برداشت: {walletBalance.toLocaleString()} تومان</p>
          <p>اعتبار در حال انتظار: {pendingBalance.toLocaleString()} تومان</p>
        </div>
      </div>
    </div>
  );
}

export default ProductList;