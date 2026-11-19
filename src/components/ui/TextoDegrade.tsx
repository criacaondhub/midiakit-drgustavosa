import type { ElementType } from 'react'

const DEGRADES = {
  azul: [
    [0, '#003dac'],
    [0.52, '#205fd5'],
    [1, '#608df4'],
  ],
  destaque: [
    [0, '#a9c2fb'],
    [0.45, '#608df4'],
    [1, '#3f72e6'],
  ],
} as const

type Degrade = keyof typeof DEGRADES

function rgb(hex: string) {
  const h = hex.replace('#', '')
  return [0, 2, 4].map((i) => Number.parseInt(h.slice(i, i + 2), 16))
}

/** Cor do degradê na posição t (0..1). */
function corEm(degrade: Degrade, t: number) {
  const stops = DEGRADES[degrade]
  for (let i = 1; i < stops.length; i++) {
    const [p1, c1] = stops[i]
    const [p0, c0] = stops[i - 1]
    if (t <= p1) {
      const f = (t - p0) / (p1 - p0 || 1)
      const a = rgb(c0)
      const b = rgb(c1)
      return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * f)).join(',')})`
    }
  }
  return stops[stops.length - 1][1]
}

type TextoDegradeProps = {
  linhas: readonly string[]
  tamanho: number
  /** line-height (múltiplo do tamanho) */
  entrelinha: number
  /** letter-spacing em em */
  tracking: number
  peso?: number
  degrade?: Degrade
  className?: string
  as?: ElementType
}

/** Título no degradê da ID, com cada letra numa cor sólida tirada do degradê
 *  (da primeira à última letra da linha). No tamanho dos títulos a passagem fica
 *  igual a um degradê contínuo — e funciona em qualquer leitor de PDF.
 *  (background-clip: text saía com contorno; texto SVG com degradê sumia no
 *  leitor do Chrome/Edge.) */
export function TextoDegrade({ linhas, tamanho, entrelinha, tracking, peso = 500, degrade = 'azul', className, as: Tag = 'h2' }: TextoDegradeProps) {
  return (
    <Tag
      className={className}
      style={{ fontSize: tamanho, lineHeight: entrelinha, letterSpacing: `${tracking}em`, fontWeight: peso }}
    >
      {linhas.map((linha, i) => {
        const letras = [...linha]
        const n = Math.max(letras.length - 1, 1)
        return (
          <span key={i} className="block whitespace-nowrap">
            {letras.map((ch, k) => (
              <span key={k} style={{ color: corEm(degrade, k / n) }}>
                {ch}
              </span>
            ))}
          </span>
        )
      })}
    </Tag>
  )
}
