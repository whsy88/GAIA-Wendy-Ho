import { useEffect } from 'react';

export default function Mounting() {
  // --- EXACT CODE FROM SLIDE 7 ---
  useEffect(() => {
    console.log('Component mounted');
    // Equivalent to componentDidMount
  }, []);
  // -------------------------------

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px auto', maxWidth: '400px' }}>
      <h3>Slide 7: Mounting Lifecycle</h3>
      <p>Check your browser console to see "Component mounted" logged once when this page loads.</p>
    </div>
  );
}