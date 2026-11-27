import { useState } from 'react';

export default function TemperatureConverter() {
  const [celcius, setCelcius] = useState('25');
  const [fahrenheit, setFahrenheit] = useState('77.00');

  const handleCelciusChange = (e) => {
    const value = e.target.value;
    setCelcius(value);
    setFahrenheit(value === '' ? '' : ((Number(value) * 9) / 5 + 32).toFixed(2));
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);
    setCelcius(value === '' ? '' : (((Number(value) - 32) * 5) / 9).toFixed(2));
  };

  return (
    <div style={containerStyle}>
      <span style={badgeStyle}>EXERCISE 1</span>
      <h2 style={titleStyle}>Temperature Converter UI</h2>

      <div style={cardWrapperStyle}>
        {/* Celsius Card */}
        <div style={celsiusCardStyle}>
          <div style={{ color: '#2563eb', fontSize: '24px' }}>🌡️</div>
          <div style={celsiusLabelStyle}>Celsius Input</div>
          <div style={inputContainerStyle}>
            <input
              type="number"
              value={celcius}
              onChange={handleCelciusChange}
              style={{ ...inputStyle, borderColor: '#3b82f6', color: '#1e3a8a' }}
              placeholder="0"
            />
            <span style={{ color: '#1e3a8a', fontWeight: 'bold' }}>°C</span>
          </div>
        </div>

        {/* Sync / Swap Icon */}
        <div style={syncIconStyle}>🔄</div>

        {/* Fahrenheit Card */}
        <div style={fahrenheitCardStyle}>
          <div style={{ color: '#ea580c', fontSize: '24px' }}>🌡️°</div>
          <div style={fahrenheitLabelStyle}>Fahrenheit Input</div>
          <div style={inputContainerStyle}>
            <input
              type="number"
              value={fahrenheit}
              onChange={handleFahrenheitChange}
              style={{ ...inputStyle, borderColor: '#f97316', color: '#7c2d12' }}
              placeholder="0"
            />
            <span style={{ color: '#7c2d12', fontWeight: 'bold' }}>°F</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline Styling objects to match the screenshot design
const containerStyle = {
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
  maxWidth: '700px',
  margin: '20px auto',
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

const badgeStyle = {
  color: '#6366f1',
  fontSize: '11px',
  fontWeight: '700',
  letterSpacing: '1px',
  textTransform: 'uppercase'
};

const titleStyle = {
  fontSize: '22px',
  fontWeight: '800',
  color: '#0f172a',
  margin: '6px 0 24px 0'
};

const cardWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
  flexWrap: 'wrap'
};

const celsiusCardStyle = {
  flex: '1',
  minWidth: '220px',
  backgroundColor: '#f0f7ff',
  border: '1px solid #dbeafe',
  borderRadius: '12px',
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px'
};

const fahrenheitCardStyle = {
  flex: '1',
  minWidth: '220px',
  backgroundColor: '#fffbeb',
  border: '1px solid #ffedd5',
  borderRadius: '12px',
  padding: '24px 16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px'
};

const celsiusLabelStyle = {
  color: '#1d4ed8',
  fontWeight: '700',
  fontSize: '15px'
};

const fahrenheitLabelStyle = {
  color: '#c2410c',
  fontWeight: '700',
  fontSize: '15px'
};

const inputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  backgroundColor: '#ffffff',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  padding: '8px 16px',
  width: '80%',
  marginTop: '8px'
};

const inputStyle = {
  border: 'none',
  outline: 'none',
  fontSize: '18px',
  fontWeight: '700',
  textAlign: 'center',
  width: '100%',
  backgroundColor: 'transparent'
};

const syncIconStyle = {
  fontSize: '20px',
  color: '#94a3b8'
};