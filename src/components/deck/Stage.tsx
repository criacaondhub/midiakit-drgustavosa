import type { ReactNode } from 'react'

/** Página-base: 1920×1080 (16:9 = página do PDF).
 *  Na tela, o canvas estica no eixo que sobrar para ocupar a janela inteira
 *  (sem faixas), mantendo a mesma escala de desenho. Os elementos ficam
 *  ancorados nas bordas (top/right/bottom/left) e os fundos usam object-cover. */
export const STAGE_W = 1920
export const STAGE_H = 1080

export function stageFor(vw: number, vh: number) {
  const ratio = vw / vh
  const width = Math.max(STAGE_W, STAGE_H * ratio)
  const height = Math.max(STAGE_H, STAGE_W / ratio)
  return { width, height, scale: vw / width }
}

type StageProps = {
  width: number
  height: number
  scale: number
  children: ReactNode
}

export function Stage({ width, height, scale, children }: StageProps) {
  return (
    <div
      className="absolute left-0 top-0 overflow-hidden"
      style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left' }}
    >
      {children}
    </div>
  )
}
