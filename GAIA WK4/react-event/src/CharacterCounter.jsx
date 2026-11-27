import { useState } from 'react';

function CharacterCounter() {
  const [text, setText] = useState('');
  const maxLength = 100;

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  };

  const remaining = maxLength - text.length;

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', textAlign: 'left' }}>
      <h3>Exercise 1: Character Counter</h3>
      <textarea
        value={text}
        onChange={handleChange}
        maxLength={maxLength}
        rows="4"
        placeholder="Type up to 100 characters..."
        style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
      />
      <p style={{ color: remaining < 10 ? 'red' : 'white' }}>
        Characters remaining: {remaining} / {maxLength}
      </p>
    </div>
  );
}

export default CharacterCounter;