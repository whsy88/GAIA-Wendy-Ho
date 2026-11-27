import { useState, useEffect } from 'react';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState({
        fetch: false,
        create: false,
        update: false,
        delete: false
    });
    const [error, setError] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
    const [editingUser, setEditingUser] = useState(null);

    // Mock API base URL
    const API_BASE = 'https://jsonplaceholder.typicode.com';

    // Generic API call function 
    const apiCall = async (endpoint, options = {}) => {
        const url = `${API_BASE}${endpoint}`; // FIX 1: Added missing '{'
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options
        };

        const response = await fetch(url, config); // FIX 2: Changed URL to lowercase url

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}${response.statusText}`);
        }
        
        return response.json();
    };

    // Fetch all users
    const fetchUsers = async () => {
        setLoading(prev => ({ ...prev, fetch: true }));
        setError(null);

        try { 
            const userData = await apiCall('/users');
            setUsers(userData);
        } catch (err) {
            setError(`Failed to fetch users: ${err.message}`); // FIX 3: Changed single quotes to backticks
        } finally {
            setLoading(prev => ({ ...prev, fetch: false }));
        }
    };

    // Create new user
    const createUser = async (userData) => {
        setLoading(prev => ({ ...prev, create: true }));
        setError(null);

        try {
            const newUserData = await apiCall('/users', {
                method: 'POST',
                body: JSON.stringify(userData)
            });

            const userWithId = { ...userData, id: Date.now() };
            setUsers(prev => [...prev, userWithId]);
            setNewUser({ name: '', email: '', role: 'user' });

            return userWithId;
        } catch (err) {
            setError(`Failed to create user: ${err.message}`);
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, create: false }));
        }
    };

    // Update user
    const updateUser = async (userId, userData) => {
        setLoading(prev => ({ ...prev, update: true }));
        setError(null);

        try {
            const updatedUser = await apiCall(`/users/${userId}`, {
                method: 'PUT',
                body: JSON.stringify(userData)
            });

            setUsers(prev => prev.map(user => 
                user.id === userId ? { ...user, ...userData } : user
            ));
            setEditingUser(null);

            return updatedUser;
        } catch (err) {
            setError(`Failed to update user: ${err.message}`);
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, update: false }));
        }
    };

    // Delete user
    const deleteUser = async (userId) => {
        setLoading(prev => ({ ...prev, delete: true }));
        setError(null);

        try {
            await apiCall(`/users/${userId}`, {
                method: 'DELETE'
            });

            setUsers(prev => prev.filter(user => user.id !== userId));
        } catch (err) {
            setError(`Failed to delete user: ${err.message}`);
            throw err;
        } finally {
            setLoading(prev => ({ ...prev, delete: false }));
        }
    };

    // Load users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateSubmit = async (e) => {
        e.preventDefault();

        if (!newUser.name || !newUser.email) {
            setError('Name and email are required');
            return;
        }

        try {
            await createUser(newUser);
        } catch (err) {
            // Error already handled in createUser
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        if (!editingUser.name || !editingUser.email) {
            setError('Name and email are required');
            return;
        }

        try {
            await updateUser(editingUser.id, editingUser);
        } catch (err) {
            // Error already handled in updateUser
        }
    };

    // FIX 4: Added UI template return block
    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2>User Management System</h2>

            {error && (
                <div style={{ color: 'red', marginBottom: '10px', padding: '10px', border: '1px solid red' }}>
                    {error}
                </div>
            )}

            {editingUser ? (
                <form onSubmit={handleUpdateSubmit} style={{ marginBottom: '20px' }}>
                    <h3>Edit User</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    />
                    <button type="submit" disabled={loading.update}>
                        {loading.update ? 'Updating...' : 'Update User'}
                    </button>
                    <button type="button" onClick={() => setEditingUser(null)}>Cancel</button>
                </form>
            ) : (
                <form onSubmit={handleCreateSubmit} style={{ marginBottom: '20px' }}>
                    <h3>Create New User</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <button type="submit" disabled={loading.create}>
                        {loading.create ? 'Creating...' : 'Add User'}
                    </button>
                </form>
            )}

            <h3>User List</h3>
            {loading.fetch ? (
                <p>Loading users...</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user.id} style={{ marginBottom: '8px' }}>
                            <strong>{user.name}</strong> ({user.email})
                            <button onClick={() => setEditingUser(user)} style={{ marginLeft: '10px' }}>
                                Edit
                            </button>
                            <button onClick={() => deleteUser(user.id)} disabled={loading.delete} style={{ marginLeft: '5px' }}>
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserManagement;