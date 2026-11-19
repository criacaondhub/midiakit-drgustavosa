import { useEffect, useState, type ComponentType } from 'react'
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion'
import { DeckNav } from './DeckNav'
import { SlideContext, type SlideState } from './SlideContext'
import { STAGE_H, STAGE_W, Stage, stageFor } from './Stage'
import { useMediaQuery, useViewport } from '@/hooks/useViewport'

export type Entrada = 'side' | 'bottom' | 'top'

export type SlideDef = {
  id: string
  Component: ComponentType
  /** cor de base da página (aparece nas bordas quando a tela não é 16:9) */
  fundo: string
  /** por onde a página entra — padrão: pela lateral */
  entrada?: Entrada
}

/* ── Navegação idêntica à da proposta SelfMedClub ─────────────────────────── */
const NEAR = 2
const NEXT_KEYS = ['ArrowRight', 'PageDown']
const PREV_KEYS = ['ArrowLeft', 'PageUp']
const TRANSITION = { duration: 1.1, ease: [0.77, 0, 0.175, 1] as const }

const CURRENT = { x: '0%', y: '0%', scale: 1, borderRadius: 0, dim: 0 }
const ENTER: Record<Entrada, typeof CURRENT> = {
  side: { ...CURRENT, x: '100%' },
  bottom: { ...CURRENT, y: '100%' },
  top: { ...CURRENT, y: '-100%' },
}
const BEHIND = { scale: 0.88, borderRadius: 28, dim: 0.65 }
const EXIT: Record<Entrada, typeof CURRENT> = {
  side: { ...CURRENT, ...BEHIND, x: '-28%' },
  bottom: { ...CURRENT, ...BEHIND, y: '-14%' },
  top: { ...CURRENT, ...BEHIND, y: '14%' },
}

function poseFor(index: number, current: number, entradas: Entrada[]) {
  if (index === current) return CURRENT
  if (index > current) return ENTER[entradas[index]]
  return EXIT[entradas[index + 1] ?? 'side']
}

function stateFor(index: number, current: number): SlideState {
  return index === current ? 'current' : index < current ? 'past' : 'future'
}

function indexFromHash(total: number) {
  const n = Number.parseInt(window.location.hash.replace('#', ''), 10)
  return Number.isFinite(n) ? Math.min(Math.max(n - 1, 0), total - 1) : 0
}

/* ── Desktop: deck em tela cheia ──────────────────────────────────────────── */
function DesktopDeck({ slides }: { slides: SlideDef[] }) {
  const total = slides.length
  const [current, setCurrent] = useState(() => indexFromHash(total))
  const reduce = useReducedMotion()
  const progress = useMotionValue(total > 1 ? current / (total - 1) : 0)
  const { w, h } = useViewport()
  const stage = stageFor(w, h)
  const entradas = slides.map((s) => s.entrada ?? 'side')

  const go = (dir: number) => setCurrent((c) => Math.min(Math.max(c + dir, 0), total - 1))

  useEffect(() => {
    const target = total > 1 ? current / (total - 1) : 0
    const controls = animate(progress, target, reduce ? { duration: 0 } : TRANSITION)
    window.history.replaceState(null, '', `#${current + 1}`)
    return () => controls.stop()
  }, [current, total, progress, reduce])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return
      const t = e.target
      if (t instanceof Element && t.closest('input, textarea, select, [contenteditable="true"]')) return
      if (NEXT_KEYS.includes(e.key)) {
        e.preventDefault()
        go(1)
      } else if (PREV_KEYS.includes(e.key)) {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <>
      <div className="relative h-svh overflow-hidden bg-background-dark">
        {slides.map(({ id, Component, fundo }, i) => {
          const { dim, ...pose } = poseFor(i, current, entradas)
          const near = Math.abs(i - current) <= NEAR
          const t = reduce ? { duration: 0 } : TRANSITION
          const layerT = reduce ? t : { ...t, borderRadius: { duration: 0 } }

          return (
            <motion.section
              key={id}
              aria-label={`Página ${i + 1} de ${total}`}
              aria-hidden={i !== current}
              inert={i !== current}
              className="absolute inset-0 overflow-hidden"
              style={{ zIndex: i, visibility: near ? 'visible' : 'hidden', willChange: near ? 'transform' : 'auto', backgroundColor: fundo }}
              initial={false}
              animate={pose}
              transition={layerT}
            >
              <SlideContext.Provider value={{ state: stateFor(i, current), isStatic: false }}>
                <Stage {...stage}>
                  <Component />
                </Stage>
              </SlideContext.Provider>
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-50 bg-background-dark"
                initial={false}
                animate={{ opacity: dim }}
                transition={t}
              />
            </motion.section>
          )
        })}
      </div>
      <DeckNav current={current} total={total} progress={progress} onPrevious={() => go(-1)} onNext={() => go(1)} />
    </>
  )
}

/* ── Mobile: páginas empilhadas, como na referência ───────────────────────── */
function MobileDeck({ slides }: { slides: SlideDef[] }) {
  const { w } = useViewport()
  const scale = w / STAGE_W

  return (
    <div className="flex flex-col">
      {slides.map(({ id, Component, fundo }, i) => (
        <section
          key={id}
          aria-label={`Página ${i + 1} de ${slides.length}`}
          className="relative w-full overflow-hidden"
          style={{ height: STAGE_H * scale, backgroundColor: fundo }}
        >
          <SlideContext.Provider value={{ state: 'current', isStatic: true }}>
            <Stage width={STAGE_W} height={STAGE_H} scale={scale}>
              <Component />
            </Stage>
          </SlideContext.Provider>
        </section>
      ))}
    </div>
  )
}

/* ── PDF: uma página 1920×1080 por slide, sem animação ────────────────────── */
function PrintDeck({ slides }: { slides: SlideDef[] }) {
  return (
    <div>
      {slides.map(({ id, Component, fundo }) => (
        <section
          key={id}
          className="relative overflow-hidden break-after-page"
          style={{ width: STAGE_W, height: STAGE_H, backgroundColor: fundo }}
        >
          <SlideContext.Provider value={{ state: 'current', isStatic: true, pdf: id }}>
            <Stage width={STAGE_W} height={STAGE_H} scale={1}>
              <Component />
            </Stage>
          </SlideContext.Provider>
        </section>
      ))}
    </div>
  )
}

export function Deck({ slides, print = false }: { slides: SlideDef[]; print?: boolean }) {
  const desktop = useMediaQuery('(min-width: 768px)')
  if (print) return <PrintDeck slides={slides} />
  return desktop ? <DesktopDeck slides={slides} /> : <MobileDeck slides={slides} />
}
