import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

const TONS = {
  azul: 'linear-gradient(90deg, #608df4, #205fd5 45%, #003dac)',
  destaque: 'linear-gradient(90deg, #b8cdfb, #608df4 50%, #a9c2fb)',
}

/** Pílula com borda em degradê (pág. 20 do CEEX). */
export function BordaDegrade({
  children,
  className,
  tom = 'azul',
  espessura = 2,
  style,
}: {
  children: ReactNode
  className?: string
  tom?: keyof typeof TONS
  espessura?: number
  style?: CSSProperties
}) {
  return (
    <div
      className={cn('rounded-full', className)}
      style={{
        border: `${espessura}px solid transparent`,
        background: `linear-gradient(#fafafa, #fafafa) padding-box, ${TONS[tom]} border-box`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
