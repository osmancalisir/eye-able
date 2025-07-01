export const fetcher = async (url, transform) => {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const json = await response.json();
    return transform(json);
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};