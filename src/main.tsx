import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { SettingsContextProvider } from "./context/SettingsContext.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SettingsContextProvider>
        <App />
      </SettingsContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
