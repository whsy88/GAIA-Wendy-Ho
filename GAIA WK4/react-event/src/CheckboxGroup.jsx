import { useState } from 'react';

function CheckboxGroup() {
  const options = ['React', 'Vue', 'Angular', 'Svelte'];
  const [selected, setSelected] = useState([]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelected(prev => [...prev, value]);
    } else {
      setSelected(prev => prev.filter(item => item !== value));
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '20px auto', textAlign: 'left' }}>
      <h3>Exercise 2: Multi-Select Checkboxes</h3>
      {options.map((option) => (
        <label key={option} style={{ display: 'block', margin: '5px 0' }}>
          <input
            type="checkbox"
            value={option}
            checked={selected.includes(option)}
            onChange={handleCheckboxChange}
          />
          {option}
        </label>
      ))}
      <p>Selected frameworks: {selected.join(', ') || 'None'}</p>
    </div>
  );
}

export default CheckboxGroup;