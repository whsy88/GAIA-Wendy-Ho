import { useState, useEffect } from 'react';

export default function LifecycleDemo({ userId }) {
  const [user, setUser] = useState(null);

  // Mount: Setup
  useEffect(() => {
    console.log('Component mounted');

    // Cleanup function (unmount)
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  // Helper function so fetchUser works
  function fetchUser(id) {
    setUser({ id, name: `User ${id}` });
  }

  // Update: When userId changes
  useEffect(() => {
    console.log('UserId changed:', userId);
    fetchUser(userId);
  }, [userId]);

  // Update: When user data changes
  useEffect(() => {
    if (user) {
      console.log('User data updated:', user);
      document.title = `Profile: ${user.name}`; // fixed to backticks ``
    }
  }, [user]);

  return <div>{user ? user.name : 'Loading...'}</div>;
}