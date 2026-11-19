import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { FUNDO_AZUL } from './Letreiro'
import { FundoPdf } from './FundoPdf'
import { Vidro } from './Vidro'

/** Tons de fundo da ID por trás do vidro. As "luzes" são manchas suaves que
 *  dão o que o vidro refratar (o efeito só aparece se houver algo atrás). */
const TONS = {
  azul: {
    fundo: FUNDO_AZUL,
    sombra: 1,
    fio: 'rgba(255, 255, 255, 0.18)',
  },
  /** degradê nas cores da marca, para o vidro refratar quando não há foto atrás
   *  (no CEEX o vidro "funciona" porque atrás dele há uma foto colorizada) */
  marca: {
    fundo:
      'radial-gradient(38% 55% at 78% 30%, rgba(169,194,251,0.75) 0%, rgba(169,194,251,0) 100%), ' +
      'radial-gradient(30% 50% at 22% 78%, rgba(0,26,110,0.7) 0%, rgba(0,26,110,0) 100%), ' +
      'radial-gradient(34% 60% at 52% 60%, rgba(96,141,244,0.6) 0%, rgba(96,141,244,0) 100%), ' +
      'linear-gradient(115deg, #002a9e 0%, #003dac 22%, #205fd5 50%, #608df4 80%, #8db0fa 100%)',
    sombra: 1,
    fio: 'rgba(255, 255, 255, 0.18)',
  },
  destaque: {
    fundo:
      'radial-gradient(50% 85% at 75% 40%, rgba(170,198,252,0.55) 0%, rgba(170,198,252,0) 80%), linear-gradient(100deg, #3f72e6 0%, #608df4 55%, #8db0fa 100%)',
    sombra: 1,
    fio: 'rgba(255, 255, 255, 0.2)',
  },
  nevoa: {
    fundo:
      'radial-gradient(30% 80% at 30% 50%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 80%), radial-gradient(28% 80% at 75% 45%, rgba(214,214,212,0.6) 0%, rgba(214,214,212,0) 80%), linear-gradient(90deg, #f6f6f5 0%, #ececea 50%, #f4f4f3 100%)',
    sombra: 0.45,
    fio: 'rgba(255, 255, 255, 0.7)',
  },
  noite: {
    fundo:
      'radial-gradient(14% 26% at 22% 38%, rgba(32,95,213,0.75) 0%, transparent 70%), radial-gradient(12% 24% at 52% 70%, rgba(96,141,244,0.55) 0%, transparent 70%), radial-gradient(12% 22% at 78% 25%, rgba(32,95,213,0.6) 0%, transparent 70%), linear-gradient(140deg, #020511 0%, #06123a 60%, #0b2470 100%)',
    sombra: 0.8,
    fio: 'rgba(255, 255, 255, 0.1)',
  },
} as const

export type TomVidro = keyof typeof TONS

type FundoVidroProps = {
  tom?: TomVidro
  className?: string
  /** o que fica atrás do vidro, nítido, fora da área de vidro */
  children?: ReactNode
  /** o que aparece dentro do vidro (padrão: o mesmo que `children`) — use a
   *  versão desfocada quando a parte de fora for nítida */
  cenaVidro?: ReactNode
  /** área coberta pelo vidro (padrão: tudo) */
  vidroClassName?: string
  vidroStyle?: CSSProperties
  largura?: number
  refracao?: number
  desloc?: number
  /** brilho/sombra das faixas (padrão do tom) — menor = vidro mais discreto */
  sombra?: number
  /** linha de luz das faixas (padrão do tom) */
  fio?: string
  /** brilho extra perto da borda de cada faixa */
  brilho?: number
}

/** Fundo da ID com o fractal glass com refração. */
export function FundoVidro({
  tom = 'azul',
  className,
  children,
  cenaVidro,
  vidroClassName = 'inset-0',
  vidroStyle,
  largura = 137,
  refracao,
  desloc,
  sombra,
  fio,
  brilho,
}: FundoVidroProps) {
  const t = TONS[tom]
  const fundo = <div className="absolute inset-0" style={{ background: t.fundo }} />

  return (
    <FundoPdf className={cn('absolute inset-0 isolate overflow-hidden', className)}>
      {fundo}
      {children}
      <Vidro
        className={vidroClassName}
        style={vidroStyle}
        largura={largura}
        refracao={refracao}
        desloc={desloc}
        sombra={sombra ?? t.sombra}
        fio={fio ?? t.fio}
        brilho={brilho}
        cena={
          <>
            {fundo}
            {cenaVidro ?? children}
          </>
        }
      />
    </FundoPdf>
  )
}
