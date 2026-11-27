import { useState } from 'react';

export default function UserProfile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <div style={cardStyle}>
      <h2>Example 2: Managing Multiple State Variables</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
      </div>
      <div style={{ marginTop: '12px' }}>
        <h3>Hello, {firstName} {lastName}!</h3>
        <p>Email: {email}</p>
        <p>Age: {age}</p>
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