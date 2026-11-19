import type { CSSProperties } from 'react'
import { CONTENT } from '@/config/content'
import { BordaDegrade } from '@/components/ui/BordaDegrade'
import { Reveal } from '@/components/ui/Reveal'

type Pos = { left: number; width: number; top: string; tom: 'azul' | 'destaque'; texto: number; pl: number }

/* Posições da pág. 20 do CEEX (em 1920): pílulas grandes com borda azul,
   menores com borda no destaque; algumas cortadas pela borda da página. */
const POS: Pos[] = [
  { left: 88, width: 1107, top: '24%', tom: 'azul', texto: 47, pl: 150 },
  { left: 1239, width: 820, top: '24%', tom: 'destaque', texto: 37, pl: 125 },
  { left: -60, width: 764, top: '49.2%', tom: 'destaque', texto: 37, pl: 174 },
  { left: 748, width: 1107, top: '49.2%', tom: 'azul', texto: 47, pl: 150 },
  { left: 51, width: 1107, top: '74.4%', tom: 'azul', texto: 47, pl: 150 },
]
const LOGO: Pos = { left: 1202, width: 820, top: '74.4%', tom: 'destaque', texto: 0, pl: 0 }

const caixa = (p: Pos): CSSProperties => ({ left: p.left, width: p.width, top: p.top, height: '23%' })

/** Página 16 — Por que patrocinar
 *  Molde: pág. 20 do CEEX ("Por que participar do CEEX?": título com o nome em
 *  faixa, pílulas de borda degradê, logo numa pílula). */
export function Slide16PorQue() {
  const c = CONTENT.porQue

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f3f3f1] text-tinta">
      <Reveal className="absolute inset-x-0 top-[7.5%] flex justify-center">
        <h2 className="text-[76px] font-normal uppercase leading-none tracking-[0.03em]">
          {c.titulo.antes} <span className="inline-block bg-degrade px-[12px] pb-[6px] pt-[2px] text-white">{c.titulo.destaque}</span>
        </h2>
      </Reveal>

      {c.pilulas.map((linhas, i) => {
        const p = POS[i]
        return (
          <Reveal key={i} delay={0.1 + i * 0.06} className="absolute" style={caixa(p)}>
            <BordaDegrade tom={p.tom} className="flex h-full w-full items-center" style={{ paddingLeft: p.pl }}>
              <p className="font-normal leading-[1.08] tracking-[0.025em]" style={{ fontSize: p.texto }}>
                {linhas.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </BordaDegrade>
          </Reveal>
        )
      })}

      <Reveal delay={0.42} className="absolute" style={caixa(LOGO)}>
        <BordaDegrade tom={LOGO.tom} className="flex h-full w-full items-center pl-[150px]">
          <img src="assets/logo/logo-plano2027-azul.webp" alt="Plano 2027" width={1000} height={429} className="h-[112px] w-auto" />
        </BordaDegrade>
      </Reveal>
    </div>
  )
}
