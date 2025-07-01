import React from 'react';
import LineChart from './components/LineChart';
import BarChart from './components/BarChart';
import { fetcher } from './utils/fetcher';

export default function App() {
  const [apiUrl, setApiUrl] = React.useState('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
  const [data, setData] = React.useState([]);
  const [trendLength, setTrendLength] = React.useState(5);
  const [selectedTab, setSelectedTab] = React.useState('line');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const transformPopulationData = (json) => {
    return json.data.map(item => ({
      year: item.Year,
      population: item.Population
    }));
  };

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const populationData = await fetcher(apiUrl, transformPopulationData);
      setData(populationData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data. Please check the API URL.');
      setData([]);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const sortedData = React.useMemo(() => [...data].sort((a, b) => a.year - b.year), [data]);
  const filteredData = React.useMemo(() => sortedData.slice(-trendLength), [sortedData, trendLength]);

  return (
    <div className="app">
      <div className="api-controls">
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="https://datausa.io/api/data?drilldowns=Nation&measures=Population"
          className="api-input"
        />
        <button onClick={fetchData} className="fetch-button" disabled={isLoading}>
          {isLoading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      {error && (
        <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
          {error}
        </div>
      )}

      <div className="tab-controls">
        <button 
          onClick={() => setSelectedTab('line')} 
          className={`tab-button ${selectedTab === 'line' ? 'active' : ''}`}
        >
          Line Chart
        </button>
        <button 
          onClick={() => setSelectedTab('bar')} 
          className={`tab-button ${selectedTab === 'bar' ? 'active' : ''}`}
        >
          Bar Chart
        </button>
      </div>

      <div className="controls">
        <button onClick={() => setTrendLength(3)} className="trend-button">
          3 Years
        </button>
        <button onClick={() => setTrendLength(5)} className="trend-button">
          5 Years
        </button>
        <button onClick={() => setTrendLength(10)} className="trend-button">
          10 Years
        </button>
      </div>

      {isLoading ? (
        <div className="loading" style={{ textAlign: 'center', padding: '20px' }}>
          Loading data...
        </div>
      ) : (
        selectedTab === 'line' 
          ? <LineChart data={filteredData} /> 
          : <BarChart data={filteredData} />
      )}
    </div>
  );
}