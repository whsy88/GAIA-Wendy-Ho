import { useState } from 'react';

export default function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleInputChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <div style={cardStyle}>
      <h2>Example 3: Object State Management</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
        <input
          placeholder="Name"
          value={user.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <input
          placeholder="Email"
          value={user.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
        <input
          placeholder="Phone"
          value={user.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
      </div>
      <div>
        <h3>User Info:</h3>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
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
