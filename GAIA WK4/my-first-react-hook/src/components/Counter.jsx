import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div style={cardStyle}>
      <h2>Example 1: Simple Counter</h2>
      <h3>Count: {count}</h3>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>Reset</button>
      </div>
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
