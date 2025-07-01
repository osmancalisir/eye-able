import React, { useEffect, useRef, useState } from 'react'
import Chart from 'chart.js/auto'

export default function BarChart(props) {
  const { data } = props
  const [borderRadiusEnabled, setBorderRadiusEnabled] = useState(false)
  const chartRef = useRef(null)
  const canvasRef = useRef(null)
  const borderRadiusValue = borderRadiusEnabled ? 10 : 0

  useEffect(() => {
    if (canvasRef.current && data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
      const ctx = canvasRef.current.getContext('2d')
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(d => d.year),
          datasets: [{
            label: 'Population',
            data: data.map(d => d.population),
            backgroundColor: '#10b981',
            borderColor: '#10b981',
            borderWidth: 1,
            borderRadius: borderRadiusValue
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: false,
              title: { display: true, text: 'Population' }
            },
            x: {
              title: { display: true, text: 'Year' }
            }
          },
          plugins: {
            legend: { display: true },
            title: { display: true, text: 'Population Trend (Bar Chart)' }
          }
        }
      })
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, borderRadiusEnabled])

  return (
    <div>
      <button
        onClick={() => setBorderRadiusEnabled(!borderRadiusEnabled)}
        className="toggle-button"
      >
        {borderRadiusEnabled ? 'Disable Border Radius' : 'Enable Border Radius'}
      </button>
      <canvas ref={canvasRef} className="chart" />
    </div>
  )
}