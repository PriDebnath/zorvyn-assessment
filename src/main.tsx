import './index.css'
import { StrictMode, type JSX } from 'react'
import { createRoot } from 'react-dom/client'
import { MainProvider } from '@/provider/main.provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainProvider />
  </StrictMode>,
)