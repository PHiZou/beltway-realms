import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { GameStateProvider } from './state/GameStateProvider'
import { ToastProvider } from './components/ToastProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <GameStateProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </GameStateProvider>
    </BrowserRouter>
  </StrictMode>,
)
