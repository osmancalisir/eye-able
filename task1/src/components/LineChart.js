import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function LineChart(props) {
  const { data, color } = props
  const chartRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current && data.length > 0) {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
      const ctx = canvasRef.current.getContext('2d')
      chartRef.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.map(d => d.year),
          datasets: [{
            label: 'Population',
            data: data.map(d => d.population),
            borderColor: color,
            backgroundColor: color,
            pointStyle: 'star',
            pointRadius: 5,
            pointBackgroundColor: color,
            fill: false,
            tension: 0.1
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
            title: { display: true, text: 'Population Trend (Line Chart)' }
          }
        }
      })
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy()
      }
    }
  }, [data, color])

  return <canvas ref={canvasRef} className="chart" aria-label="Line chart showing population trends" />
}