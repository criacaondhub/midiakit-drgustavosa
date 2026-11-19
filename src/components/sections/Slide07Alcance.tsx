import { CONTENT } from '@/config/content'
import { Assinatura } from '@/components/ui/Assinatura'
import { FundoVidro } from '@/components/ui/FundoVidro'
import { Reveal } from '@/components/ui/Reveal'

/** Página 07 — Alcance em números
 *  Molde: pág. 7 do CEEX ("Creator economy em números": título à esquerda,
 *  frase à direita, 5 cards com número grande no degradê). */
export function Slide07Alcance() {
  const c = CONTENT.alcance

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-tinta">
      {/* fios */}
      <div className="absolute left-[54.4%] top-0 h-[50%] w-px bg-linha" />
      <div className="absolute left-[54.4%] right-0 top-[126px] h-px bg-linha" />

      {/* bloco superior direito: assinatura e frase centralizadas no bloco, como no CEEX */}
      <div className="absolute left-[54.4%] right-0 top-0 flex h-[126px] items-center justify-center">
        <Reveal y={0}>
          <Assinatura logo="inicio" className="text-cinza" />
        </Reveal>
      </div>

      <div className="absolute inset-x-0 top-0 flex h-[50%] items-center">
        <Reveal className="ml-[103px]">
          <h2 className="text-degrade pb-[0.08em] text-[86px] font-medium uppercase leading-[0.98] tracking-[-0.055em]">
            {c.titulo.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </Reveal>
      </div>

      <div className="absolute left-[54.4%] right-0 top-[126px] flex h-[calc(50%-126px)] items-center justify-center">
        <Reveal delay={0.1} className="w-[560px]">
          <p className="text-[32px] font-light leading-[1.4] tracking-[-0.01em] text-cinza text-pretty">{c.frase}</p>
        </Reveal>
      </div>

      {/* faixa com os cards */}
      <div className="absolute inset-x-0 bottom-0 top-[50%] overflow-hidden text-white">
        {/* vidro discreto, como na faixa do CEEX: estrias finas e suaves sobre o degradê */}
        <FundoVidro tom="azul" largura={56} refracao={1.18} sombra={0.35} fio="rgba(255, 255, 255, 0.07)" />
        <div className="absolute inset-x-[76px] bottom-[16%] top-[10%] flex gap-[10px]">
          {c.cards.map((card, i) => (
            <Reveal
              key={card.texto}
              delay={0.15 + i * 0.07}
              className="flex flex-1 flex-col border border-white/50 bg-white/[0.14] px-[44px] pb-[38px] pt-[34px]"
            >
              {/* número em destaque + unidade menor à direita, na mesma linha de base
                  (como o "+7 MILHÕES" do CEEX); o bloco fica centralizado no card */}
              <div className="flex flex-1 items-center justify-center">
                <div className="flex items-baseline gap-[10px] whitespace-nowrap">
                  <span className="text-[96px] font-medium leading-none tracking-[-0.05em]">{card.numero}</span>
                  <span className="text-[22px] font-light uppercase leading-none tracking-[0.01em] text-white/80">{card.unidade}</span>
                </div>
              </div>
              <div className="mt-[26px] h-px bg-white/40" />
              <p className="mt-[28px] min-h-[3.9em] text-[20px] font-light leading-[1.3] text-pretty">{card.texto}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="absolute bottom-[5.5%] left-[76px]" delay={0.5} y={0}>
          <p className="text-[16px] font-light text-white/75">{c.fonte}</p>
        </Reveal>
      </div>
    </div>
  )
}
