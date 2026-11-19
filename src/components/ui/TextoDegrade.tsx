import { useId, type ElementType } from 'react'

const DEGRADES = {
  azul: [
    ['0%', '#003dac'],
    ['52%', '#205fd5'],
    ['100%', '#608df4'],
  ],
  destaque: [
    ['0%', '#a9c2fb'],
    ['45%', '#608df4'],
    ['100%', '#3f72e6'],
  ],
} as const

/* métricas verticais da Inter (ascender / descender) para alinhar a linha de base */
const ASC = 0.96875
const DESC = 0.2412

type TextoDegradeProps = {
  linhas: readonly string[]
  tamanho: number
  /** line-height (múltiplo do tamanho) */
  entrelinha: number
  /** letter-spacing em em */
  tracking: number
  peso?: number
  degrade?: keyof typeof DEGRADES
  className?: string
  as?: ElementType
}

/** Título com o degradê da ID desenhado em SVG (texto em vetor com
 *  preenchimento em degradê). Substitui o background-clip: text, que no PDF do
 *  Chrome saía com um contorno fino em volta e cortava a última letra. */
export function TextoDegrade({ linhas, tamanho, entrelinha, tracking, peso = 500, degrade = 'azul', className, as: Tag = 'h2' }: TextoDegradeProps) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const altura = tamanho * entrelinha
  const base = (altura - (ASC + DESC) * tamanho) / 2 + ASC * tamanho
  const fonte = { fontSize: tamanho, letterSpacing: `${tracking}em`, fontWeight: peso }

  return (
    <Tag className={className} style={{ ...fonte, lineHeight: `${altura}px` }} aria-label={linhas.join(' ')}>
      {linhas.map((linha, i) => (
        <span key={i} aria-hidden className="relative block w-fit">
          {/* o texto invisível dá o tamanho da linha; o SVG desenha por cima */}
          <span className="invisible whitespace-nowrap">{linha}</span>
          <svg className="absolute left-0 top-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id={`${id}-${i}`} x1="0" x2="1" y1="0" y2="0">
                {DEGRADES[degrade].map(([offset, cor]) => (
                  <stop key={offset} offset={offset} stopColor={cor} />
                ))}
              </linearGradient>
            </defs>
            <text x="0" y={base} fill={`url(#${id}-${i})`} style={fonte}>
              {linha}
            </text>
          </svg>
        </span>
      ))}
    </Tag>
  )
}
