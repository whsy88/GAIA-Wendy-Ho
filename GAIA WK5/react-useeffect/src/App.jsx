// import DependencyArray from './DependencyArray';

// function App() {
//   return (
//     <div>
//       <DependencyArray />
//     </div>
//   );
// }

// export default App;

// import Mounting from './Mounting';

// function App() {
//   return (
//     <div>
//       <Mounting />
//     </div>
//   );
// }

// export default App;

// import { useState } from 'react';
// import Unmounting from './Unmounting';

// function App() {
//   const [showComponent, setShowComponent] = useState(true);

//   return (
//     <div style={{ textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
//       <h2>Slide 8 Lifecycle Demonstration</h2>
      
//       <button onClick={() => setShowComponent(!showComponent)}>
//         {showComponent ? 'Remove (Unmount) Component' : 'Add (Mount) Component'}
//       </button>

//       {showComponent && <Unmounting />}
//     </div>
//   );
// }

// export default App;

// import { useState } from 'react';
// import LifecycleDemo from './LifecycleDemo';

// function App() {
//   const [showDemo, setShowDemo] = useState(true);

//   return (
//     <div style={{ textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
//       <h2>Slide 9 Demonstration</h2>

//       <button onClick={() => setShowDemo(!showDemo)}>
//         {showDemo ? 'Unmount Component' : 'Mount Component'}
//       </button>

//       {showDemo && <LifecycleDemo userId={1} />}
//     </div>
//   );
// }

// export default App;

// import { useState } from 'react';
// import Cleanup from './Cleanup';

// function App() {
//   const [showTimer, setShowTimer] = useState(true);

//   return (
//     <div style={{ textAlign: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
//       <h2>Slide 11: Timer Cleanup Demonstration</h2>

//       <button onClick={() => setShowTimer(!showTimer)}>
//         {showTimer ? 'Unmount Component (Stop Timer)' : 'Mount Component (Start Timer)'}
//       </button>

//       {showTimer && <Cleanup />}
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react';

// function RealTimeClock() {
//   const [time, setTime] = useState(new Date());
//   const [isRunning, setIsRunning] = useState(true);
//   const [format24Hour, setFormat24Hour] = useState(false);

//   useEffect(() => {
//     let interval;

//     if (isRunning) {
//       interval = setInterval(() => {
//         setTime(new Date());
//       }, 1000);
//     }

//     // Cleanup function
//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [isRunning]); // Re-run effect when isRunning changes

//   // Update document title with current time
//   useEffect(() => {
//     document.title = `Clock - ${formatTime(time)}`;

//     // Cleanup: Reset title when component unmounts
//     return () => {
//       document.title = 'React App';
//     };
//   }, [time, format24Hour]);

//   const formatTime = (date) => {
//     const options = {
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: !format24Hour
//     };
//     return date.toLocaleTimeString('en-US', options);
//   };

//   const formatDate = (date) => {
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   return (
//     <div className="clock-container">
//       <div className="date">{formatDate(time)}</div>
//       <div className="time">{formatTime(time)}</div>

//       <div className="controls">
//         <button onClick={() => setIsRunning(!isRunning)}>
//           {isRunning ? 'Pause' : 'Resume'}
//         </button>
//         <label>
//           <input
//             type="checkbox"
//             checked={format24Hour}
//             onChange={(e) => setFormat24Hour(e.target.checked)}
//           />
//           24-hour format
//         </label>
//       </div>

//       <div className="status">
//         Clock is {isRunning ? 'running' : 'paused'}
//       </div>
//     </div>
//   );
// }

// export default RealTimeClock;

// import { useState, useEffect } from 'react';

// export default function App() {
//   const [windowSize, setWindowSize] = useState({
//     width: window.innerWidth,
//     height: window.innerHeight
//   });

//   const [scrollPosition, setScrollPosition] = useState({
//     x: window.scrollX,
//     y: window.scrollY
//   });

//   const [isOnline, setIsOnline] = useState(navigator.onLine);

//   // Window resize effect
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });
//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   // Scroll tracking effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrollPosition({
//         x: window.scrollX,
//         y: window.scrollY
//       });
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   // Online/Offline status effect
//   useEffect(() => {
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);

//   // Local storage effect
//   useEffect(() => {
//     const data = {
//       windowSize,
//       scrollPosition,
//       timestamp: new Date().toISOString()
//     };

//     localStorage.setItem('windowTracker', JSON.stringify(data));
//   }, [windowSize, scrollPosition]);

//   // Page visibility effect
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.hidden) {
//         console.log('Page is hidden');
//       } else {
//         console.log('Page is visible');
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//     };
//   }, []);

//   return (
//     <div className="window-tracker">
//       <h1>Window & Scroll Tracker</h1>

//       <div className="info-grid">
//         <div className="info-card">
//           <h3>Window Dimensions</h3>
//           <p>Width: {windowSize.width}px</p>
//           <p>Height: {windowSize.height}px</p>
//           <p>Aspect Ratio: {(windowSize.width / windowSize.height).toFixed(2)}</p>
//         </div>

//         <div className="info-card">
//           <h3>Scroll Position</h3>
//           <p>X: {scrollPosition.x}px</p>
//           <p>Y: {scrollPosition.y}px</p>
//           <p>Total Scrolled: {Math.round(Math.sqrt(scrollPosition.x ** 2 + scrollPosition.y ** 2))}px</p>
//         </div>

//         <div className="info-card">
//           <h3>Connection Status</h3>
//           <span className={`status-badge ${isOnline ? 'online' : 'offline'}`}>
//             {isOnline ? '🟢 Online' : '🔴 Offline'}
//           </span>
//         </div>

//         <div className="info-card">
//           <h3>Viewport Classification</h3>
//           <p>
//             {windowSize.width < 768 ? 'Mobile' : windowSize.width < 1024 ? 'Tablet' : 'Desktop'}
//           </p>
//         </div>
//       </div>

//       {/* Add some content to enable scrolling */}
//       <div style={{ height: '200vh', background: 'linear-gradient(to bottom, #fafafa, #eaeaea)' }}>
//         <p>Scroll down to see the scroll position change...</p>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from 'react';

// export default function App() {
//   // Main state to track which user is currently selected in the dropdown
//   const [selectedUserId, setSelectedUserId] = useState('');

//   const [{ user, posts }, setData] = useState({
//     user: null,
//     posts: null
//   });
//   const [loading, setLoading] = useState({
//     user: false,
//     posts: false
//   });
//   const [error, setError] = useState({
//     user: null,
//     posts: null
//   });

//   // Fetch user data when selectedUserId changes
//   useEffect(() => {
//     if (!selectedUserId) {
//       setData({ user: null, posts: null });
//       return;
//     }

//     const abortController = new AbortController();

//     const fetchUser = async () => {
//       setLoading(prev => ({ ...prev, user: true }));
//       setError(prev => ({ ...prev, user: null }));

//       try {
//         // Simulate API network delay (1 second)
//         await new Promise(resolve => setTimeout(resolve, 1000));

//         const response = await fetch(`/api/users/${selectedUserId}`, {
//           signal: abortController.signal
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const userData = await response.json();
//         setData(prev => ({ ...prev, user: userData }));
//       } catch (err) {
//         if (err.name !== 'AbortError') {
//           setError(prev => ({ ...prev, user: err.message }));
//         }
//       } finally {
//         setLoading(prev => ({ ...prev, user: false }));
//       }
//     };

//     fetchUser();

//     return () => {
//       abortController.abort();
//     };
//   }, [selectedUserId]);

//   // Fetch user posts when user changes
//   useEffect(() => {
//     if (!user) {
//       setData(prev => ({ ...prev, posts: null }));
//       return;
//     }

//     const abortController = new AbortController();

//     const fetchPosts = async () => {
//       setLoading(prev => ({ ...prev, posts: true }));
//       setError(prev => ({ ...prev, posts: null }));

//       try {
//         // Simulate API network delay (0.8 seconds)
//         await new Promise(resolve => setTimeout(resolve, 800));

//         const response = await fetch(`/api/users/${user.id}/posts`, {
//           signal: abortController.signal
//         });

//         if (!response.ok) {
//           throw new Error(`Failed to fetch posts: ${response.status}`);
//         }

//         const postsData = await response.json();
//         setData(prev => ({ ...prev, posts: postsData }));
//       } catch (err) {
//         if (err.name !== 'AbortError') {
//           setError(prev => ({ ...prev, posts: err.message }));
//         }
//       } finally {
//         setLoading(prev => ({ ...prev, posts: false }));
//       }
//     };

//     fetchPosts();

//     return () => {
//       abortController.abort();
//     };
//   }, [user]);

//   // Update page title when user changes
//   useEffect(() => {
//     if (user) {
//       document.title = `Profile: ${user.name}`;
//     } else {
//       document.title = 'User Profile';
//     }

//     return () => {
//       document.title = 'React App';
//     };
//   }, [user]);

//   // Simulate real API responses (Mock Interceptor)
//   useEffect(() => {
//     const mockUsers = {
//       1: { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://unsplash.com' },
//       2: { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://unsplash.com' }
//     };

//     const mockPosts = {
//       1: [
//         { id: 101, title: 'My First Post', content: 'Hello world!', date: '2024-03-15' },
//         { id: 102, title: 'React Tips', content: 'useEffect is powerful.', date: '2024-03-17' }
//       ],
//       2: [
//         { id: 201, title: 'JavaScript Tricks', content: 'Async/await is great!', date: '2024-03-18' }
//       ]
//     };

//     const originalFetch = window.fetch;

//     window.fetch = async (url, options) => {
//       if (url.includes('/api/users/') && !url.includes('/posts')) {
//         const userId = parseInt(url.split('/').pop());
//         const user = mockUsers[userId];

//         if (user) {
//           return { ok: true, json: async () => user };
//         } else {
//           return { ok: false, status: 404 };
//         }
//       }

//       if (url.includes('/posts')) {
//         const userId = parseInt(url.split('/'));
//         const posts = mockPosts[userId] || [];

//         return { ok: true, json: async () => posts };
//       }

//       return originalFetch(url, options);
//     };

//     return () => {
//       window.fetch = originalFetch;
//     };
//   }, []);

//   return (
//     <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      
//       {/* Dropdown controls added directly into the UI */}
//       <div style={{ marginBottom: '25px', display: 'flex', gap: '10px', alignItems: 'center' }}>
//         <label htmlFor="user-select" style={{ fontWeight: 'bold' }}>Select Profile:</label>
//         <select 
//           id="user-select"
//           value={selectedUserId} 
//           onChange={(e) => setSelectedUserId(e.target.value)}
//           style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px', flexGrow: 1 }}
//         >
//           <option value="">-- Choose a user --</option>
//           <option value="1">User 1: John Doe</option>
//           <option value="2">User 2: Jane Smith</option>
//           <option value="99">User 99: (Trigger 404 Error)</option>
//         </select>
//       </div>
      
//       <hr style={{ border: 'none', borderTop: '1px solid #eee', marginBottom: '25px' }} />

//       {!selectedUserId ? (
//         <div className="user-profile" style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
//           <p>Please select a user from the dropdown above to view their profile.</p>
//         </div>
//       ) : (
//         <div className="user-profile">
//           <h2 style={{ marginBottom: '20px' }}>User Profile</h2>

//           {loading.user && (
//             <div className="loading" style={{ color: '#0070f3', fontWeight: '500', marginBottom: '15px' }}>
//               ⏳ Loading user details...
//             </div>
//           )}

//           {error.user && (
//             <div className="error" style={{ padding: '15px', background: '#fee2e2', border: '1px solid #f87171', borderRadius: '6px', color: '#991b1b', marginBottom: '20px' }}>
//               <p style={{ margin: '0 0 10px 0' }}>🚨 Error loading user: {error.user}</p>
//               <button 
//                 onClick={() => setSelectedUserId('')}
//                 style={{ padding: '6px 12px', background: '#991b1b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
//               >
//                 Reset Selection
//               </button>
//             </div>
//           )}

//           {!loading.user && !error.user && user && (
//             <div className="user-info" style={{ display: 'flex', gap: '20px', alignItems: 'center', background: '#f8fafc', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '25px' }}>
//               <img 
//                 src={user.avatar} 
//                 alt={user.name} 
//                 style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', background: '#cbd5e1' }} 
//               />
//               <div>
//                 <h3 style={{ margin: '0 0 5px 0', fontSize: '20px' }}>{user.name}</h3>
//                 <p style={{ margin: 0, color: '#475569' }}>{user.email}</p>
//               </div>
//             </div>
//           )}

//           <div className="posts-section" style={{ marginTop: '20px' }}>
//             <h3 style={{ borderBottom: '2px solid #f1f5f9', paddingBottom: '8px', marginBottom: '15px' }}>User Posts</h3>

//             {loading.posts && (
//               <div className="loading" style={{ color: '#0070f3', fontWeight: '500' }}>
//                 ⏳ Loading posts...
//               </div>
//             )}

//             {error.posts && (
//               <div className="error" style={{ color: '#991b1b' }}>
//                 ❌ Error loading posts: {error.posts}
//               </div>
//             )}

//             {posts && posts.length > 0 && !loading.posts && (
//               <ul className="posts-list" style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
//                 {posts.map(post => (
//                   <li key={post.id} className="post-card" style={{ border: '1px solid #e2e8f0', padding: '15px', marginBottom: '12px', borderRadius: '6px', background: '#fff' }}>
//                     <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>{post.title}</h4>
//                     <p style={{ margin: '0 0 10px 0', color: '#334155', lineHeight: '1.5' }}>{post.content}</p>
//                     <small style={{ color: '#94a3b8' }}>📅 {post.date}</small>
//                   </li>
//                 ))}
//               </ul>
//             )}

//             {posts && posts.length === 0 && !loading.posts && !error.posts && user && (
//               <p style={{ color: '#64748b', fontStyle: 'italic' }}>No posts found for this user.</p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import LiveChatSimulator from './LiveChatSimulator';

// export default function App() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <LiveChatSimulator />
//     </div>
//   );
// }

// import SystemMonitor from './SystemMonitor';

// export default function App() {
//   return (
//     <div style={{ background: '#020617', minHeight: '100vh', padding: '10px' }}>
//       <SystemMonitor />
//     </div>
//   );
// }

// import UserManagement from './UserManagement';

// function App() {
//   return (
//     <div>
//       <UserManagement />
//     </div>
//   );
// }

// export default App;

import NewsAggregator from "./NewsAggregator";

function App() {
  return (
    <div>
      <NewsAggregator />
    </div>
  );
}

export default App;

// import WeatherApp from "./WeatherApp";

// function App() {
//   return (
//     <div>
//       <WeatherApp />
//     </div>
//   );
// }

// export default App;