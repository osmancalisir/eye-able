import React from 'react'
import HelloWorld from './components/HelloWorld'

export default function App() {
  return React.createElement(
    'div',
    { className: 'app' },
    React.createElement(HelloWorld),
  )
}