import React from 'react'
import ReactDOM from 'react-dom/client'
import AppProvider from './contexts'
import Routes from './routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <Routes />
    </AppProvider>
  </React.StrictMode>
)
