import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./styles/index.css"
import './styles/normalize.css'
import './styles/input.css'
import './styles/button.css'
import './styles/link.css'
import './styles/label.css'
import './styles/text.css'
import './styles/spinner.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
    <App />
  </React.Fragment>,
)
