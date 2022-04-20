import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './contexts'
import Routes from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)
