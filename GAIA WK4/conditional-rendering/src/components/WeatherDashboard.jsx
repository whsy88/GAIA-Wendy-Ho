import { useState } from 'react';

// Mock weather database
const weatherData = {
  'New York': {
    temp: 22,
    condition: 'Sunny',
    humidity: '60%',
    wind: '12 km/h',
    forecast: ['Mon: 22°C', 'Tue: 24°C', 'Wed: 19°C']
  },
  'London': {
    temp: 14,
    condition: 'Rainy',
    humidity: '85%',
    wind: '20 km/h',
    forecast: ['Mon: 14°C', 'Tue: 13°C', 'Wed: 15°C']
  },
  'Tokyo': {
    temp: 31,
    condition: 'Hot',
    humidity: '70%',
    wind: '8 km/h',
    forecast: ['Mon: 31°C', 'Tue: 33°C', 'Wed: 30°C']
  },
  'Reykjavik': {
    temp: -2,
    condition: 'Snowy',
    humidity: '90%',
    wind: '25 km/h',
    forecast: ['Mon: -2°C', 'Tue: -4°C', 'Wed: 0°C']
  }
};

export default function WeatherDashboard() {
  const [selectedCity, setSelectedCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Helper function to return icon based on condition
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny': return '☀️';
      case 'Rainy': return '🌧️';
      case 'Snowy': return '❄️';
      case 'Hot': return '🔥';
      default: return '☁️';
    }
  };

  // Helper function for conditional temperature styling
  const getTempColor = (temp) => {
    if (temp >= 30) return '#e74c3c'; // Hot (Red)
    if (temp >= 15) return '#f39c12'; // Warm (Orange)
    if (temp >= 0) return '#3498db';  // Cool (Blue)
    return '#9b59b6';                 // Freezing (Purple)
  };

  // Handle city selection & simulate API loading/error state
  const handleSelectCity = async (city) => {
    setSelectedCity(city);
    setError(null);
    setWeather(null);

    if (!city) return;

    setIsLoading(true);

    try {
      // Simulate network request delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (city === 'ErrorTest') {
        throw new Error('Failed to fetch weather data. Please try again.');
      }

      setWeather(weatherData[city]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', fontFamily: 'sans-serif', padding: '20px', border: '1px solid #ddd', borderRadius: '12px' }}>
      <h2>🌤️ Weather Dashboard</h2>

      {/* Location Selector */}
      <div style={{ marginBottom: '20px' }}>
        <label>Select Location: </label>
        <select value={selectedCity} onChange={(e) => handleSelectCity(e.target.value)}>
          <option value="">-- Choose a City --</option>
          <option value="New York">New York</option>
          <option value="London">London</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Reykjavik">Reykjavik</option>
          <option value="ErrorTest">Simulate Error</option>
        </select>
      </div>

      {/* 1. Empty State */}
      {!selectedCity && !isLoading && (
        <div style={{ padding: '20px', background: '#f9f9f9', textAlign: 'center', borderRadius: '8px' }}>
          <p>👉 Please select a location to view the weather forecast.</p>
        </div>
      )}

      {/* 2. Loading State */}
      {isLoading && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>🔄 Fetching latest weather data...</p>
        </div>
      )}

      {/* 3. Error Handling */}
      {error && (
        <div style={{ padding: '15px', background: '#fde8e8', color: '#e74c3c', borderRadius: '8px', marginBottom: '15px' }}>
          <p>❌ {error}</p>
          <button onClick={() => handleSelectCity(selectedCity)}>Retry</button>
        </div>
      )}

      {/* 4. Weather Details & Conditional Display */}
      {weather && !isLoading && (
        <div style={{ border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
          <h3>
            {selectedCity} {getWeatherIcon(weather.condition)}
          </h3>

          {/* Conditional Temperature Styling */}
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: getTempColor(weather.temp), margin: '10px 0' }}>
            {weather.temp}°C
          </p>
          <p>Condition: <strong>{weather.condition}</strong></p>

          {/* User Preference Toggle */}
          <button 
            onClick={() => setShowDetails(!showDetails)}
            style={{ padding: '8px 12px', cursor: 'pointer', margin: '10px 0' }}
          >
            {showDetails ? 'Hide Detailed Forecast' : 'Show Detailed Forecast'}
          </button>

          {/* Show/Hide Detailed Forecast */}
          {showDetails && (
            <div style={{ marginTop: '15px', paddingTop: '15px', borderTop: '1px dashed #ccc' }}>
              <p>💧 Humidity: {weather.humidity}</p>
              <p>💨 Wind Speed: {weather.wind}</p>
              <h4>3-Day Forecast:</h4>
              <ul>
                {weather.forecast.map((day, index) => (
                  <li key={index}>{day}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}