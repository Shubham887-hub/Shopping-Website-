import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart } = location.state || { cart: [] };
  
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment successful!');
    navigate('/');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Payment Method</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id} className="flex justify-between mb-1">
              <span>{item.name} x {item.qty}</span>
              <span>₹{item.price * item.qty}</span>
            </li>
          ))}
        </ul>
        <div className="font-bold mt-2">Total: ₹{total}</div>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Card Number</label>
          <input type="text" className="border rounded px-3 py-2 w-full" placeholder="1234 5678 9012 3456" required />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block mb-1">Expiry</label>
            <input type="text" className="border rounded px-3 py-2 w-full" placeholder="MM/YY" required />
          </div>
          <div>
            <label className="block mb-1">CVV</label>
            <input type="password" className="border rounded px-3 py-2 w-full" placeholder="123" required />
          </div>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Pay Now</button>
      </form>
    </div>
  );
}
