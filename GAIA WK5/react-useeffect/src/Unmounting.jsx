import { useEffect } from 'react';

export default function Unmounting() {
  // --- EXACT CODE FROM SLIDE 8 ---
  useEffect(() => {
    return () => {
      console.log('Component will unmount');
      // Equivalent to componentWillUnmount
    };
  }, []);
  // -------------------------------

  return (
    <div style={{ padding: '20px', border: '1px solid #e74c3c', borderRadius: '8px', margin: '20px auto', maxWidth: '400px' }}>
      <h3>Slide 8: Unmounting Demo</h3>
      <p>This component is currently active on screen.</p>
    </div>
  );
}