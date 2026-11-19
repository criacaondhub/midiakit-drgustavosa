import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

/** Cores prontas do logo (scripts/gerar_fundos.py → gerar_marcas). */
export type CorMarca = 'branco' | 'cinza' | 'tinta' | 'azul' | 'degrade' | 'destaque'

/** O logo PLANO 2027 (arquivo do zip) como ícone — no lugar do sol e do
 *  asterisco do CEEX. Usa a imagem já pintada na cor (máscaras CSS saíam com um
 *  contorno fino no PDF). A caixa tem a proporção do logo; a imagem tem 3% de
 *  margem em volta e transborda a caixa na medida certa. */
export function Simbolo({ className, cor = 'branco', style }: { className?: string; cor?: CorMarca; style?: CSSProperties }) {
  return (
    <span aria-hidden className={cn('relative inline-block aspect-[1000/430] shrink-0', className)} style={style}>
      <img
        src={`assets/logo/marca-${cor}.png`}
        alt=""
        width={1060}
        height={490}
        className="absolute max-w-none"
        style={{ left: '-3%', top: '-6.977%', width: '106%' }}
      />
    </span>
  )
}
