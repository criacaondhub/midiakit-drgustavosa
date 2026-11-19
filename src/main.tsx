import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Lenis from 'lenis'
import '@fontsource-variable/inter/opsz.css'
import './index.css'
import App from './App'

const isPrint = new URLSearchParams(window.location.search).has('print')

// Smooth scroll — só tem efeito no mobile, onde as páginas ficam empilhadas
if (!isPrint) new Lenis({ autoRaf: true })

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
