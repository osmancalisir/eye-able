# Eyeable - Task 1

React-based data visualization dashboard that fetches population data from the USA Data API and displays it in interactive charts. Users can switch between line and bar charts, adjust time ranges, and customize visualizations.

## Key Features

- **Dynamic API Integration**: Fetch data from any compatible endpoint
- **Interactive Charts**: Line and bar visualizations with Chart.js
- **Time Range Filtering**: View 3, 5, or 10 years of data
- **Customizable UI**: Toggle bar chart border radius

## Technologies Used

- React 19
- Chart.js 4.5
- Vite 7
- Vitest (testing)

## Development

```bash
npm run dev
```

## Testing

```bash
npm test
npm run coverage
```

## Project Structure

```
src/
├── components/    # Chart components
├── utils/         # Utility functions
├── test/          # Test setup
├── App.js         # Main application
├── main.js        # Entry point
└── styles.css     # Global styles
```

## API Endpoint

Default URL:  
`https://datausa.io/api/data?drilldowns=Nation&measures=Population`

Customize in the input field to use different data sources (this feature could not tested because I could not find another endpoint from the data source)
