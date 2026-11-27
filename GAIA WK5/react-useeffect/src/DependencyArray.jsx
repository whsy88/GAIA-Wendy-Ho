import { useState, useEffect } from 'react';

export default function DependencyArray() {
  // Declare state variables so `count` and `name` are defined
  const [count, setCount] = useState(0);
  const [name, setName] = useState('Alice');

  // --- EXACT CODE FROM SLIDE 6 ---
  // Effect runs on every render
  useEffect(() => {
    console.log('Runs on every render');
  });

  // Effect runs only once (on mount)
  useEffect(() => {
    console.log('Runs only on mount');
  }, []);

  // Effect runs when dependencies change
  useEffect(() => {
    console.log('Runs when count changes');
  }, [count]);

  // Effect with multiple dependencies
  useEffect(() => {
    console.log('Runs when count or name changes');
  }, [count, name]);
  // -------------------------------

  return (
    <div style={{ padding: '20px', textAlign: 'center', border: '1px solid #ccc', margin: '20px auto', maxWidth: '400px' }}>
      <h2>Dependency Array Demo</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <br /><br />
      <p>Name: {name}</p>
      <button onClick={() => setName(name === 'Alice' ? 'Bob' : 'Alice')}>Toggle Name</button>
    </div>
  );
}