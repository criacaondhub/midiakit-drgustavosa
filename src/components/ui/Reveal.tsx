import type { CSSProperties, ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useSlide } from '@/components/deck/SlideContext'
import { MODO_FUNDO } from '@/lib/modo'

type RevealProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  y?: number
}

const EASE_OUT = [0.22, 1, 0.36, 1] as const
/** espera a página terminar de entrar (o deck leva 1,1 s) */
const ENTRY_DELAY = 0.45

/** Entrada suave do conteúdo quando a página chega na tela.
 *  Na exportação (isStatic) renderiza direto no estado final. */
export function Reveal({ children, className, style, delay = 0, y = 28 }: RevealProps) {
  const { state, isStatic } = useSlide()
  const reduce = useReducedMotion()

  if (isStatic)
    return (
      <div className={className} style={MODO_FUNDO ? { ...style, visibility: 'hidden' } : style}>
        {children}
      </div>
    )

  const shown = state !== 'future'
  const hidden = { opacity: 0, y, filter: 'blur(10px)' }
  const visible = { opacity: 1, y: 0, filter: 'blur(0px)' }

  return (
    <motion.div
      className={className}
      style={style}
      initial={hidden}
      animate={shown ? visible : hidden}
      transition={
        reduce
          ? { duration: 0 }
          : shown
            ? { duration: 1, delay: ENTRY_DELAY + delay, ease: EASE_OUT }
            : { duration: 0, delay: 1.1 }
      }
    >
      {children}
    </motion.div>
  )
}
