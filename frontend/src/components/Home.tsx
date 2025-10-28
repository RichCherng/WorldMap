import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ApiResponse {
  message?: string;
  timestamp?: string;
  error?: string;
}

interface StatusResponse {
  status?: string;
  uptime?: string;
  version?: string;
  error?: string;
}

const Home: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [statusResponse, setStatusResponse] = useState<StatusResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchHello = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>('/api/hello');
      setApiResponse(response.data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setApiResponse({ error: 'Failed to fetch from API: ' + errorMessage });
    }
    setLoading(false);
  };

  const fetchStatus = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await axios.get<StatusResponse>('/api/status');
      setStatusResponse(response.data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setStatusResponse({ error: 'Failed to fetch status: ' + errorMessage });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div>
      <div className="card">
        <h2>Welcome to WorldMap!</h2>
        <p>
          This is a full-stack application demonstrating the integration of:
        </p>
        <ul>
          <li><strong>Backend:</strong> Spring Boot (Java) with REST API</li>
          <li><strong>Frontend:</strong> React with TypeScript</li>
          <li><strong>Build System:</strong> Gradle with Node.js plugin</li>
        </ul>
      </div>

      <div className="card">
        <h3>API Integration Demo</h3>
        <p>Test the connection between React frontend and Spring Boot backend:</p>
        
        <button className="button" onClick={fetchHello} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Hello Message'}
        </button>
        
        <button className="button" onClick={fetchStatus} disabled={loading}>
          {loading ? 'Loading...' : 'Check API Status'}
        </button>

        {apiResponse && (
          <div>
            <h4>Hello API Response:</h4>
            <div className="api-response">
              {JSON.stringify(apiResponse, null, 2)}
            </div>
          </div>
        )}

        {statusResponse && (
          <div>
            <h4>Status API Response:</h4>
            <div className="api-response">
              {JSON.stringify(statusResponse, null, 2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;