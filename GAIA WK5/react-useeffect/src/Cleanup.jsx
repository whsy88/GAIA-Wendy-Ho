import { useEffect } from 'react';

export default function Cleanup() {
  // Slide 11: Timer cleanup pattern
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    // Cleanup function runs when component unmounts
    return () => {
      clearInterval(timer);
      console.log('Timer cleared!');
    };
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #27ae60', margin: '20px auto', maxWidth: '350px', borderRadius: '8px' }}>
      <h3>Slide 11: Cleanup Demo</h3>
      <p>Check the console for <code>"Timer tick"</code> every second.</p>
      <p>Unmount this component to trigger <code>clearInterval()</code>!</p>
    </div>
  );
}