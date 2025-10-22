import React, { useState } from 'react';

function SMSVerification() {
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSendCode = async () => {
    // Simulated API call to /api/sms/send
    const response = { message: "کد تأیید ارسال شد", code: "123456" }; // Simulated
    setMessage(response.message);
    console.log(`Sending code to ${mobile}`);
  };

  const handleVerifyCode = async () => {
    // Simulated API call to /api/sms/verify
    const response = { message: "شماره تأیید شد" }; // Simulated
    if (code === "123456") { // Match simulated code
      setMessage(response.message);
      console.log(`Verified ${mobile} with code ${code}`);
    } else {
      setMessage("کد تأیید نامعتبر است");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center font-poppins">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">تأیید شماره موبایل</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">شماره موبایل</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="11"
              required
            />
          </div>
          <button
            onClick={handleSendCode}
            className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
          >
            ارسال کد تأیید
          </button>
          <div>
            <label className="block text-gray-700">کد تأیید</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength="6"
              required
            />
          </div>
          <button
            onClick={handleVerifyCode}
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
          >
            تأیید کد
          </button>
          {message && <p className="text-center text-gray-700 mt-2">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default SMSVerification;