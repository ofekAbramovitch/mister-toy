import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from 'react-router-dom'
import { App } from './root-cmp.jsx'
import '../src/assets/css/index.css'
// import '../src/styles/global.scss'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
    <Router>
      <App />
    </Router>
)

