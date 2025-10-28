import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Country {
  name: string;
  capital: string;
  region: string;
  population: number;
}

const WorldMap: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(false);

  // Mock data for demonstration - in a real app, this might come from your Spring Boot API
  const mockCountries: Country[] = [
    { name: 'United States', capital: 'Washington D.C.', region: 'Americas', population: 331900000 },
    { name: 'United Kingdom', capital: 'London', region: 'Europe', population: 67800000 },
    { name: 'Japan', capital: 'Tokyo', region: 'Asia', population: 125800000 },
    { name: 'Australia', capital: 'Canberra', region: 'Oceania', population: 25700000 },
    { name: 'Brazil', capital: 'Brasília', region: 'Americas', population: 215300000 },
    { name: 'Germany', capital: 'Berlin', region: 'Europe', population: 83200000 },
    { name: 'China', capital: 'Beijing', region: 'Asia', population: 1439300000 },
    { name: 'South Africa', capital: 'Cape Town', region: 'Africa', population: 59300000 },
  ];

  const regions = ['all', 'Americas', 'Europe', 'Asia', 'Africa', 'Oceania'];

  const loadCountries = async (): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real application, you might fetch from your Spring Boot API:
      // const response = await axios.get<Country[]>('/api/countries');
      // setCountries(response.data);
      
      // For now, use mock data
      setCountries(mockCountries);
    } catch (error) {
      console.error('Failed to load countries:', error);
      // Fallback to mock data
      setCountries(mockCountries);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCountries();
  }, []);

  const filteredCountries = selectedRegion === 'all' 
    ? countries 
    : countries.filter(country => country.region === selectedRegion);

  const formatPopulation = (population: number): string => {
    if (population >= 1000000000) {
      return (population / 1000000000).toFixed(1) + 'B';
    } else if (population >= 1000000) {
      return (population / 1000000).toFixed(1) + 'M';
    } else if (population >= 1000) {
      return (population / 1000).toFixed(1) + 'K';
    }
    return population.toString();
  };

  return (
    <div>
      <div className="card">
        <h2>🗺️ World Map Explorer</h2>
        <p>
          Explore countries around the world. This component demonstrates how to build 
          interactive features in React with data filtering and display.
        </p>
      </div>

      <div className="card">
        <h3>Filter by Region</h3>
        <div style={{ marginBottom: '20px' }}>
          {regions.map(region => (
            <button
              key={region}
              className={`button ${selectedRegion === region ? 'button-active' : ''}`}
              onClick={() => setSelectedRegion(region)}
              style={{ marginRight: '10px', marginBottom: '5px' }}
            >
              {region === 'all' ? 'All Regions' : region}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h3>Countries ({filteredCountries.length})</h3>
        
        {loading ? (
          <div>Loading countries...</div>
        ) : (
          <div className="countries-grid">
            {filteredCountries.map(country => (
              <div key={country.name} className="country-card">
                <h4>{country.name}</h4>
                <p><strong>Capital:</strong> {country.capital}</p>
                <p><strong>Region:</strong> {country.region}</p>
                <p><strong>Population:</strong> {formatPopulation(country.population)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <h3>Future Enhancements</h3>
        <ul>
          <li>Interactive world map visualization</li>
          <li>Country detail pages with more information</li>
          <li>Real-time data from REST API endpoints</li>
          <li>Search functionality</li>
          <li>Favorite countries feature</li>
        </ul>
      </div>
    </div>
  );
};

export default WorldMap;