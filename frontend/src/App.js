import React from 'react';
import InquiryForm from './components/InquiryForm';
import ProductManagement from './components/ProductManagement';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div>
      <InquiryForm />
      <ProductManagement />
      <UserProfile />
      <footer className="text-center p-4 bg-gray-200 mt-6">
        <a href="/rules.html" className="text-blue-600 hover:underline">قوانین سایت</a>
      </footer>
    </div>
  );
}

export default App;