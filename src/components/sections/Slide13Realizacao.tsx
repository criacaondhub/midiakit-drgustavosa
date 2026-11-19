import { CONTENT } from '@/config/content'
import { Assinatura } from '@/components/ui/Assinatura'
import { FundoVidro } from '@/components/ui/FundoVidro'
import { Reveal } from '@/components/ui/Reveal'
import { Simbolo } from '@/components/ui/Simbolo'
import { Trechos } from '@/components/ui/Trechos'

/** Página 13 — Realização
 *  Molde: pág. 15 do CEEX (parceria ESPM: imagem em pílula no degradê, logo à
 *  direita, texto em duas colunas embaixo). */
export function Slide13Realizacao() {
  const c = CONTENT.realizacao

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-tinta">
      {/* faixa vertical com a assinatura */}
      <div className="absolute left-0 top-0 h-[62%] w-[183px] border-b border-r border-linha">
        <div className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2 -rotate-90">
          <Assinatura logo="nenhum" className="whitespace-nowrap text-tinta/70" />
        </div>
        <Simbolo className="absolute bottom-[54px] left-1/2 h-[30px] -translate-x-1/2" cor="tinta" />
      </div>

      {/* foto do time da Nova Dimensão ocupando o quadrante inteiro */}
      <div className="absolute left-[183px] right-[35.7%] top-0 h-[62%] overflow-hidden border-b border-linha bg-[#2a2a2a]">
        <img
          src={c.imagem}
          alt="Equipe da Nova Dimensão"
          width={2400}
          height={1600}
          className="h-full w-full object-cover"
          style={{ objectPosition: '50% 58%' }}
        />
      </div>

      {/* painel azul com o logo */}
      <div className="absolute right-0 top-0 h-[62%] w-[35.7%] overflow-hidden border-b border-linha">
        <FundoVidro tom="azul" />
        <Reveal className="absolute inset-0 flex items-center justify-center" delay={0.12}>
          <img src="assets/logo/logo-plano2027-branco.webp" alt="Plano 2027" width={1000} height={429} className="w-[64%]" />
        </Reveal>
      </div>

      {/* duas colunas de texto */}
      <div className="absolute inset-x-0 bottom-0 top-[62%] flex items-center">
        <Reveal className="ml-[158px] w-[760px]" delay={0.2}>
          <p className="text-[42px] font-normal leading-[1.38] tracking-[-0.025em] text-[#555558] text-pretty">
            <Trechos trechos={c.esquerda} forteClassName="font-semibold text-tinta" />
          </p>
        </Reveal>
        <Reveal className="ml-[88px] w-[760px]" delay={0.28}>
          <p className="text-[27px] font-light leading-[1.55] text-cinza text-pretty">{c.direita}</p>
        </Reveal>
      </div>
    </div>
  )
}
