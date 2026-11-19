import { createContext, useContext } from 'react'

/** past = já vista (fica atrás, recuada) · current = na tela · future = ainda vai entrar */
export type SlideState = 'past' | 'current' | 'future'

export type SlideContextValue = {
  state: SlideState
  /** true na exportação em PDF: tudo no estado final, sem animação */
  isStatic: boolean
}

export const SlideContext = createContext<SlideContextValue>({ state: 'current', isStatic: true })

export const useSlide = () => useContext(SlideContext)
