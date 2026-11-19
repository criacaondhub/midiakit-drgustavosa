import { CONTENT } from '@/config/content'
import { Assinatura } from '@/components/ui/Assinatura'
import { FundoVidro } from '@/components/ui/FundoVidro'
import { Reveal } from '@/components/ui/Reveal'
import { Trechos } from '@/components/ui/Trechos'

/** Página 08 — Quem acompanha o Dr. Gustavo Sá
 *  Molde: pág. 8 do CEEX (imagem à esquerda com degradê, número gigante à
 *  direita). No lugar da foto de plateia, o print do painel do Instagram.
 *  ⚠️ Alcance vendido como contexto, não como entrega (regras do CFM). */
export function Slide08Publico() {
  const c = CONTENT.publico

  return (
    <div className="relative h-full w-full overflow-hidden text-white">
      {/* fundo inteiro em degradê nas cores da marca; vidro canelado só no lado direito */}
      <FundoVidro tom="marca" largura={80} vidroClassName="inset-y-0 left-[44.4%] right-0" />

      {/* esquerda: print estilizado do painel */}
      <div className="absolute inset-y-0 left-0 w-[44.4%]">
        <div className="absolute inset-0 flex items-center justify-center">
          <Reveal delay={0.05}>
            <div className="relative h-[860px] w-[397px] rounded-[54px] bg-[#0b0b0d] p-[11px] shadow-[0_40px_90px_rgba(0,20,90,0.55)]">
              <img
                src={c.print}
                alt="Painel profissional do Instagram @drgustavosa: 301.206 seguidores e 77,2% de público feminino"
                width={739}
                height={1600}
                className="h-full w-full rounded-[44px] object-cover object-top"
              />
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className="absolute right-[115px] top-[57px]" y={0}>
        <Assinatura logo="fim" />
      </Reveal>

      {/* direita: número gigante */}
      <div className="absolute inset-y-0 left-[52.5%] right-[115px] flex flex-col justify-center">
        <Reveal delay={0.1}>
          <span className="block text-[236px] font-normal leading-[0.82] tracking-[-0.06em]">{c.numero}</span>
        </Reveal>
        <Reveal delay={0.18} className="mt-[30px]">
          <p className="text-[50px] font-light uppercase leading-[1.04] tracking-[-0.02em]">
            {c.linha.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </Reveal>
        <Reveal delay={0.26} className="mt-[44px] w-[760px]">
          <p className="text-[25px] font-light leading-[1.45] text-white/90 text-pretty">
            <Trechos trechos={c.apoio} forteClassName="font-semibold text-white" />
          </p>
        </Reveal>
        <Reveal delay={0.34} className="mt-[30px] w-[760px]">
          <p className="border-l-2 border-white/60 pl-[22px] text-[27px] font-medium leading-[1.35] tracking-[-0.01em] text-pretty">{c.fecho}</p>
        </Reveal>
      </div>
    </div>
  )
}
