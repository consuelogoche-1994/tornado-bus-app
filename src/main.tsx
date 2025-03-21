import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/taiwind.css'
import App from './app/App.tsx'
import { AppProvider } from './context/AppProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)
