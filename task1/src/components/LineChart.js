import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function LineChart(props) {
  const { data } = props
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
            borderColor: '#3b82f6',
            backgroundColor: '#3b82f6',
            pointStyle: 'star',
            pointRadius: 5,
            pointBackgroundColor: '#3b82f6',
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
  }, [data])

  return <canvas ref={canvasRef} className="chart" />
}