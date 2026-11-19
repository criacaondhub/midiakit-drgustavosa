import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useSlide } from '@/components/deck/SlideContext'
import { MODO_FUNDO } from '@/lib/modo'

type Medidas = { x: number; y: number; w: number; h: number; pw: number; ph: number }

type VidroProps = {
  /** o que aparece DENTRO do vidro, desenhado nas coordenadas do contêiner pai
   *  (o mesmo sistema da cena que fica atrás) */
  cena: ReactNode
  /** área do vidro (classes absolute…), relativa ao contêiner pai */
  className?: string
  style?: CSSProperties
  /** largura de cada faixa — guia: 14 faixas na largura (137px em 1920) */
  largura?: number
  /** zoom horizontal dentro de cada faixa — guia: 1.45 (1 = sem refração) */
  refracao?: number
  /** deslocamento da cena dentro da faixa, em fração da faixa — guia: -22% */
  desloc?: number
  /** intensidade do brilho/sombra de cada faixa (0–1) */
  sombra?: number
  /** cor da linha fina de luz na borda direita de cada faixa */
  fio?: string
  /** brilho extra perto da borda direita de cada faixa (0 = nenhum), como os
   *  fios de luz fortes do CEEX */
  brilho?: number
}

/** Fractal glass com refração, como no guia "ceex-fractal-glass-hero.md":
 *  cada faixa recebe uma cópia da cena, alinhada com a original, ampliada a
 *  partir do centro da própria faixa (scaleX) e deslocada (translateX). Por
 *  cima, o brilho em soft-light e a linha de luz. Funciona igual no PDF. */
export function Vidro({
  cena,
  className,
  style,
  largura = 137,
  refracao = 1.45,
  desloc = -0.22,
  sombra = 1,
  fio = 'rgba(255, 255, 255, 0.18)',
  brilho = 0,
}: VidroProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [m, setM] = useState<Medidas | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    const pai = el?.offsetParent as HTMLElement | null
    if (!el || !pai) return
    const medir = () =>
      setM({ x: el.offsetLeft, y: el.offsetTop, w: el.clientWidth, h: el.clientHeight, pw: pai.clientWidth, ph: pai.clientHeight })
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    ro.observe(pai)
    return () => ro.disconnect()
  }, [])

  const n = m ? Math.ceil(m.w / largura) : 0
  const { pdf } = useSlide()

  // no PDF: a imagem fotografada na exportação (ver FundoPdf)
  if (pdf && !MODO_FUNDO)
    return (
      <div ref={ref} aria-hidden className={cn('fr-strips', className)} style={style}>
        <img src={`assets/pdf/${pdf}.jpg`} alt="" className="absolute inset-0 size-full max-w-none" />
      </div>
    )

  return (
    <div
      ref={ref}
      aria-hidden
      data-pdf-fundo={pdf ?? ''}
      className={cn('fr-strips isolate', className)}
      style={{ '--fr-sombra': sombra, '--fr-fio': fio, ...style } as CSSProperties}
    >
      {m &&
        Array.from({ length: n }, (_, i) => {
          const esquerda = i * largura // dentro da área do vidro
          const centroNaCena = m.x + esquerda + largura / 2
          return (
            // +1px de sobra: com a página escalada não fica fresta entre faixas
            <div key={i} className="fr-strip" style={{ left: esquerda, width: largura + 1 }}>
              <div
                className="absolute"
                style={{
                  left: -(m.x + esquerda),
                  top: -m.y,
                  width: m.pw,
                  height: m.ph,
                  transformOrigin: `${centroNaCena}px 50%`,
                  transform: `translateX(${desloc * largura}px) scaleX(${refracao})`,
                }}
              >
                {cena}
              </div>
              {brilho > 0 && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, transparent 78%, rgba(255,255,255,${brilho}) 95%, rgba(255,255,255,${brilho * 0.4}) 100%)`,
                  }}
                />
              )}
            </div>
          )
        })}
    </div>
  )
}
