import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Wireless Headphones', price: 1999 },
  { id: 2, name: 'Bluetooth Speaker', price: 1499 },
  { id: 3, name: 'Smart Watch', price: 2999 },
];

export default function Home() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const increment = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrement = (productId) => {
    setCart(
      cart.map((item) =>
        item.id === productId && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="flex gap-4 mb-8">
        {products.map((product) => (
          <div key={product.id} className="border rounded p-4 w-64 shadow">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="mb-2">₹{product.price}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      
      <h2 className="text-xl font-bold mb-2">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} className="flex items-center gap-4 mb-2">
                <span className="w-40">{item.name}</span>
                <span>₹{item.price}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-gray-300 px-2 rounded"
                    onClick={() => decrement(item.id)}
                  >
                    -
                  </button>
                  <span>{item.qty}</span>
                  <button
                    className="bg-gray-300 px-2 rounded"
                    onClick={() => increment(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => removeFromCart(item.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          
          <div className="mt-4">
            <Link 
              to="/payment" 
              state={{ cart }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Proceed to Payment
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
