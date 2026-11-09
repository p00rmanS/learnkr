import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './calm.css'
import App from './App.tsx'
import { registerServiceWorker } from './lib/pwa'

registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
