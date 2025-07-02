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
  const [fontSize, setFontSize] = React.useState(16);
  const [lineChartColor, setLineChartColor] = React.useState('#3b82f6');
  const [barChartColor, setBarChartColor] = React.useState('#10b981');

  React.useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

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
      <div className="accessibility-controls">
        <button 
          onClick={() => setFontSize(f => Math.max(12, f - 2))}
          className="accessibility-button"
          aria-label="Decrease font size"
        >
          A-
        </button>
        <button 
          onClick={() => setFontSize(16)}
          className="accessibility-button"
          aria-label="Reset font size"
        >
          Reset Font
        </button>
        <button 
          onClick={() => setFontSize(f => Math.min(24, f + 2))}
          className="accessibility-button"
          aria-label="Increase font size"
        >
          A+
        </button>
      </div>

      <div className="api-controls">
        <input
          type="text"
          value={apiUrl}
          onChange={(e) => setApiUrl(e.target.value)}
          placeholder="https://datausa.io/api/data?drilldowns=Nation&measures=Population"
          className="api-input"
          aria-label="API URL"
        />
        <button 
          onClick={fetchData} 
          className="fetch-button" 
          disabled={isLoading}
          aria-label={isLoading ? 'Fetching data' : 'Fetch data'}
        >
          {isLoading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      {error && (
        <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
          {error}
        </div>
      )}

      <div className="tab-controls">
        <div className="tab-group">
          <button 
            onClick={() => setSelectedTab('line')} 
            className={`tab-button ${selectedTab === 'line' ? 'active' : ''}`}
            style={selectedTab === 'line' ? { backgroundColor: lineChartColor } : {}}
            aria-pressed={selectedTab === 'line'}
          >
            Line Chart
          </button>
          <input
            type="color"
            value={lineChartColor}
            onChange={(e) => setLineChartColor(e.target.value)}
            aria-label="Line chart color"
          />
        </div>
        <div className="tab-group">
          <button 
            onClick={() => setSelectedTab('bar')} 
            className={`tab-button ${selectedTab === 'bar' ? 'active' : ''}`}
            style={selectedTab === 'bar' ? { backgroundColor: barChartColor } : {}}
            aria-pressed={selectedTab === 'bar'}
          >
            Bar Chart
          </button>
          <input
            type="color"
            value={barChartColor}
            onChange={(e) => setBarChartColor(e.target.value)}
            aria-label="Bar chart color"
          />
        </div>
      </div>

      <div className="controls">
        <button 
          onClick={() => setTrendLength(3)} 
          className="trend-button"
          aria-pressed={trendLength === 3}
        >
          3 Years
        </button>
        <button 
          onClick={() => setTrendLength(5)} 
          className="trend-button"
          aria-pressed={trendLength === 5}
        >
          5 Years
        </button>
        <button 
          onClick={() => setTrendLength(10)} 
          className="trend-button"
          aria-pressed={trendLength === 10}
        >
          10 Years
        </button>
      </div>

      {isLoading ? (
        <div className="loading" style={{ textAlign: 'center', padding: '20px' }}>
          Loading data...
        </div>
      ) : (
        selectedTab === 'line' 
          ? <LineChart data={filteredData} color={lineChartColor} /> 
          : <BarChart data={filteredData} color={barChartColor} />
      )}
    </div>
  );
}