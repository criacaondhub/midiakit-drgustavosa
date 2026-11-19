import type React from 'react'
import { CONTENT } from '@/config/content'
import { Assinatura } from '@/components/ui/Assinatura'
import { Justificado } from '@/components/ui/Justificado'
import { Reveal } from '@/components/ui/Reveal'
import { FUNDO_AZUL } from '@/components/ui/Letreiro'
import { Vidro } from '@/components/ui/Vidro'

/* Linhas do logo já desfocadas (scripts/gerar_fundos.py → gerar_linhas_logo):
   tamanho do glifo e margem (3 × raio) de cada imagem. */
const PLANO = { src: 'assets/bg/logo-plano-desfocado.webp', w: 1400, h: 223, m: 60 }
const ANO = { src: 'assets/bg/logo-2027-desfocado.webp', w: 1250, h: 291, m: 66 }

/** Uma linha do logo desfocada, numa caixa com a proporção do glifo
 *  (a imagem tem margem para o desfoque, que sai para fora da caixa). */
function Linha({ img, className, style }: { img: typeof PLANO; className: string; style: React.CSSProperties }) {
  return (
    <div className={`absolute ${className}`} style={{ aspectRatio: `${img.w} / ${img.h}`, ...style }}>
      <img
        src={img.src}
        alt=""
        aria-hidden
        width={img.w + 2 * img.m}
        height={img.h + 2 * img.m}
        className="absolute max-w-none"
        style={{
          left: `${(-img.m / img.w) * 100}%`,
          top: `${(-img.m / img.h) * 100}%`,
          width: `${((img.w + 2 * img.m) / img.w) * 100}%`,
        }}
      />
    </div>
  )
}

/** Cena: fundo + leve degradê #1E3FA8 de baixo para cima + o logo em duas
 *  linhas, como o "ce" / "ex" do CEEX — PLANO no alto à esquerda (até antes da
 *  frase) e 2027 embaixo à direita (depois do título), sem ficar atrás de texto. */
const CENA = (
  <>
    <div className="absolute inset-0" style={{ background: FUNDO_AZUL }} />
    <div
      className="absolute inset-x-0 bottom-0 h-[72%]"
      style={{ background: 'linear-gradient(to top, rgba(30,63,168,0.78) 0%, rgba(30,63,168,0.5) 38%, rgba(30,63,168,0) 100%)' }}
    />
    {/* PLANO: do canto esquerdo até antes da frase (a frase ocupa os 795px da direita) */}
    <Linha img={PLANO} className="left-[-80px] top-[150px]" style={{ width: 'calc(100% - 820px)' }} />
    {/* 2027: depois do título (que vai até ~900px) até o canto direito */}
    <Linha img={ANO} className="bottom-[120px] right-[-60px]" style={{ width: 'calc(100% - 1000px)' }} />
  </>
)

/** Página 01 — Capa
 *  Molde: pág. 1 do CEEX (letreiro grande desfocado no fundo, título embaixo à
 *  esquerda, frase em caixa alta no alto à direita). O letreiro é o logo
 *  PLANO 2027 gigante atrás do vidro canelado (fractal glass). */
export function Slide01Capa() {
  const c = CONTENT.capa

  return (
    <div className="relative isolate h-full w-full overflow-hidden text-white">
      {/* cena atrás do vidro + vidro canelado com refração (cada faixa recebe uma
          cópia da cena, ampliada e deslocada — guia ceex-fractal-glass-hero) */}
      {CENA}
      <Vidro className="inset-0" cena={CENA} largura={137} refracao={1.45} desloc={-0.22} />

      <Reveal className="absolute right-[115px] top-[57px]" y={0}>
        <Assinatura logo="fim" />
      </Reveal>

      <Reveal className="absolute right-[115px] top-[214px] w-[680px]" delay={0.1}>
        <Justificado linhas={c.frase} className="whitespace-nowrap text-[52px] font-normal leading-[1.12] tracking-[-0.03em]" />
      </Reveal>

      <div className="absolute bottom-[150px] left-[115px]">
        <Reveal delay={0.2}>
          <h1 className="text-[168px] font-medium leading-[0.9] tracking-[-0.055em]">{c.titulo}</h1>
        </Reveal>
        <Reveal delay={0.32}>
          <p className="mt-[34px] w-[790px] text-[29px] font-light leading-[1.38] tracking-[-0.01em] text-white/90 text-pretty">{c.apoio}</p>
        </Reveal>
      </div>

      <Reveal className="absolute bottom-[57px] left-[115px]" y={0}>
        <Assinatura logo="inicio" />
      </Reveal>
    </div>
  )
}
