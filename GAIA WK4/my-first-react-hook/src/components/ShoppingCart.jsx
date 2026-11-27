import { useState } from 'react';

export default function ShoppingCart() {
  const product = [
    { id: 1, name: 'Apple', price: 2 },
    { id: 2, name: 'Orange', price: 3 },
    { id: 3, name: 'Banana', price: 1.5 }
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={cardStyle}>
      <h2>Exercise 2: Shopping Cart</h2>
      
      <h3>Products</h3>
      {product.map((p) => (
        <div key={p.id} style={{ marginBottom: '6px' }}>
          {p.name} - ${p.price}{' '}
          <button onClick={() => addToCart(p)}>Add</button>
        </div>
      ))}

      <h3>Cart</h3>
      {cart.map((item, index) => (
        <div key={index} style={{ marginBottom: '6px' }}>
          {item.name} - ${item.price}{' '}
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}

      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}

const cardStyle = {
  padding: '16px',
  border: '1px solid #ccc',
  borderRadius: '8px',
  marginBottom: '20px',
  backgroundColor: '#fafafa'
};