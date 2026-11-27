import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [{ user, posts }, setData] = useState({
    user: null,
    posts: null
  });
  const [loading, setLoading] = useState({
    user: false,
    posts: false
  });
  const [error, setError] = useState({
    user: null,
    posts: null
  });

  // Fetch user data when userId changes
  useEffect(() => {
    if (!userId) {
      setData({ user: null, posts: null });
      return;
    }

    const abortController = new AbortController();

    const fetchUser = async () => {
      setLoading(prev => ({ ...prev, user: true }));
      setError(prev => ({ ...prev, user: null }));

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(`/api/users/${userId}`, {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        setData(prev => ({ ...prev, user: userData }));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(prev => ({ ...prev, user: err.message }));
        }
      } finally {
        setLoading(prev => ({ ...prev, user: false }));
      }
    };

    fetchUser();

    return () => {
      abortController.abort();
    };
  }, [userId]);

  // Fetch user posts when user changes
  useEffect(() => {
    if (!user) {
      setData(prev => ({ ...prev, posts: null }));
      return;
    }

    const abortController = new AbortController();

    const fetchPosts = async () => {
      setLoading(prev => ({ ...prev, posts: true }));
      setError(prev => ({ ...prev, posts: null }));

      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        const response = await fetch(`/api/users/${user.id}/posts`, {
          signal: abortController.signal
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status}`);
        }

        const postsData = await response.json();
        setData(prev => ({ ...prev, posts: postsData }));
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(prev => ({ ...prev, posts: err.message }));
        }
      } finally {
        setLoading(prev => ({ ...prev, posts: false }));
      }
    };

    fetchPosts();

    return () => {
      abortController.abort();
    };
  }, [user]);

  // Update page title when user changes
  useEffect(() => {
    if (user) {
      document.title = `Profile: ${user.name}`;
    } else {
      document.title = 'User Profile';
    }

    return () => {
      document.title = 'React App';
    };
  }, [user]);

  // Simulate real API responses
  useEffect(() => {
    // Mock API setup
    const mockUsers = {
      1: { id: 1, name: 'John Doe', email: 'john@example.com', avatar: 'https://placeholder.com' },
      2: { id: 2, name: 'Jane Smith', email: 'jane@example.com', avatar: 'https://placeholder.com' }
    };

    const mockPosts = {
      1: [
        { id: 101, title: "My First Post", content: "Hello world!", date: "2024-03-15" },
        { id: 102, title: "React Tips", content: "useEffect is powerful.", date: "2024-03-17" }
      ],
      2: [
        { id: 201, title: "JavaScript Tricks", content: "Async/await is great!", date: "2024-03-18" }
      ]
    };

    const originalFetch = window.fetch;

    window.fetch = async (url, options) => {
      if (url.includes('/api/users/') && !url.includes('/posts')) {
        const userId = parseInt(url.split('/').pop());
        const user = mockUsers[userId];

        if (user) {
          return {
            ok: true,
            json: async () => user
          };
        } else {
          return {
            ok: false,
            status: 404
          };
        }
      }

      if (url.includes('/posts')) {
        const userId = parseInt(url.split('/')[3]);
        const posts = mockPosts[userId] || [];

        return {
          ok: true,
          json: async () => posts
        };
      }

      return originalFetch(url, options);
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  if (!userId) {
    return (
      <div className="user-profile">
        <p>Please select a user to view their profile.</p>
      </div>
    );
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      {loading.user && <div className="loading">Loading user...</div>}

      {error.user && (
        <div className="error">
          <p>Error loading user: {error.user}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!loading.user && !error.user && user && (
        <div className="user-info">
          <img src={user.avatar} alt={user.name} style={{ width: '80px', borderRadius: '50%' }} />
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        </div>
      )}

      <div className="posts-section">
        <h3>User Posts</h3>

        {loading.posts && <div className="loading">Loading posts...</div>}

        {error.posts && (
          <div className="error">
            <p>Error loading posts: {error.posts}</p>
          </div>
        )}

        {posts && posts.length > 0 && !loading.posts && (
          <ul className="posts-list">
            {posts.map(post => (
              <li key={post.id} className="post-card">
                <h4>{post.title}</h4>
                <p>{post.content}</p>
                <small>{post.date}</small>
              </li>
            ))}
          </ul>
        )}

        {posts && posts.length === 0 && !loading.posts && !error.posts && user && (
          <p>No posts found for this user.</p>
        )}
      </div>
    </div>
  );
}

// Default export wrapper to make it immediately testable
export default function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setSelectedUserId(null)} style={{ marginRight: '10px' }}>Clear</button>
        <button onClick={() => setSelectedUserId(1)} style={{ marginRight: '10px' }}>Select User 1 (John)</button>
        <button onClick={() => setSelectedUserId(2)}>Select User 2 (Jane)</button>
      </div>
      <hr />
      <UserProfile userId={selectedUserId} />
    </div>
  );
}