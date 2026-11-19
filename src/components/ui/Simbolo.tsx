import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/* o arquivo do logo não tem margem (as letras encostam nas bordas): em tamanho
   pequeno, com a página escalada, o arredondamento de pixel cortava as letras.
   A máscara ocupa 92% da caixa e a caixa é ~9% maior, então o logo mantém o tamanho. */
const LOGO = 'url(assets/logo/PLANO-2027_logo_branco_2000px.png) center / 92% auto no-repeat'

/** O logo PLANO 2027 (arquivo do zip) como ícone — no lugar do sol e do
 *  asterisco do CEEX. É uma máscara: herda a cor do texto, ou recebe um
 *  degradê via `fill`, como os ícones em degradê do CEEX. */
export function Simbolo({ className, fill, style }: { className?: string; fill?: string; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      className={cn('inline-block aspect-[1000/429] shrink-0', className)}
      style={{ background: fill ?? 'currentColor', WebkitMask: LOGO, mask: LOGO, scale: '1.087', ...style }}
    />
  )
}
