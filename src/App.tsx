import { Deck } from '@/components/deck/Deck'
import { SLIDES } from '@/slides'

const params = new URLSearchParams(window.location.search)
const isPrint = params.has('print')

/* ?print&paginas=1,4,7 → só essas páginas (útil para conferir/exportar partes) */
const paginas = (params.get('paginas') ?? '')
  .split(',')
  .map((n) => Number.parseInt(n, 10))
  .filter((n) => Number.isFinite(n))
const slides = paginas.length ? SLIDES.filter((_, i) => paginas.includes(i + 1)) : SLIDES

export default function App() {
  return (
    <main>
      <Deck slides={slides} print={isPrint} />
    </main>
  )
}
