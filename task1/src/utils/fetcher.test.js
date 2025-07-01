import { fetcher } from './fetcher';

describe('fetcher utility', () => {
  const originalError = console.error;
  const API_URL = 'https://datausa.io/api/data?drilldowns=Nation&measures=Population';
  
  beforeAll(() => {
    console.error = vi.fn();
  });
  
  afterAll(() => {
    console.error = originalError;
  });

  it('successfully fetches and transforms data from real API endpoint', async () => {
    const mockData = {
      data: [
        { Year: '2020', Population: 326569308 },
        { Year: '2021', Population: 329725481 }
      ]
    };
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve(mockData),
    };
    
    global.fetch = vi.fn().mockResolvedValue(mockResponse);
    
    const transform = (data) => data.data.map(item => ({
      year: item.Year,
      population: item.Population
    }));
    
    const result = await fetcher(API_URL, transform);
    
    expect(result).toEqual([
      { year: '2020', population: 326569308 },
      { year: '2021', population: 329725481 }
    ]);
    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  it('handles fetch errors with real API URL', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    
    await expect(fetcher(API_URL, data => data))
      .rejects
      .toThrow('Network error');
  });

  it('handles non-ok responses with real API URL', async () => {
    const mockResponse = {
      ok: false,
      status: 404,
      json: () => Promise.resolve({ error: 'Not found' }),
    };
    
    global.fetch = vi.fn().mockResolvedValue(mockResponse);
    
    await expect(fetcher(API_URL, data => data))
      .rejects
      .toThrow('HTTP error! Status: 404');
  });
  
  it('transforms real API response structure correctly', async () => {
    const mockResponse = {
      ok: true,
      json: () => Promise.resolve({
        data: [
          { Year: '2019', Population: 324697795 },
          { Year: '2020', Population: 326569308 },
        ]
      }),
    };
    
    global.fetch = vi.fn().mockResolvedValue(mockResponse);
    
    const transform = (data) => data.data.map(item => ({
      year: item.Year,
      population: item.Population
    }));
    
    const result = await fetcher(API_URL, transform);
    
    expect(result).toEqual([
      { year: '2019', population: 324697795 },
      { year: '2020', population: 326569308 },
    ]);
  });
});