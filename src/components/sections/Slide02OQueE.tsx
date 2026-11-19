import { CONTENT } from '@/config/content'
import { Assinatura } from '@/components/ui/Assinatura'
import { Justificado } from '@/components/ui/Justificado'
import { FundoVidro } from '@/components/ui/FundoVidro'
import { Reveal } from '@/components/ui/Reveal'
import { Simbolo } from '@/components/ui/Simbolo'
import { Trechos } from '@/components/ui/Trechos'

const DEGRADE_ICONE = 'linear-gradient(180deg, #608df4, #205fd5 55%, #003dac)'
const DEGRADE_DESTAQUE = 'linear-gradient(90deg, #a9c2fb, #608df4 45%, #3f72e6)'
const COLUNAS = [
  { x: '6%', w: 485 },
  { x: '39.2%', w: 453 },
  { x: '70.6%', w: 450 },
]
const titulo = 'text-[88px] font-medium uppercase leading-none tracking-[-0.055em]'

/** Página 02 — O que é o Plano 2027
 *  Molde: pág. 2 do CEEX (título em pílulas com ícones na metade de cima,
 *  três colunas no degradê embaixo). */
export function Slide02OQueE() {
  const c = CONTENT.oQueE

  return (
    <div className="relative h-full w-full bg-white text-tinta">
      {/* topo */}
      <Reveal className="absolute left-[115px] top-[40px]" y={0}>
        <Simbolo className="h-[40px] text-cinza" />
      </Reveal>
      <Reveal className="absolute right-[115px] top-[52px]" y={0}>
        <Assinatura logo="nenhum" className="text-cinza" />
      </Reveal>

      {/* linha 1: [ PLANO 2027 É ] ( Λ )   O DIA */}
      <div className="absolute inset-x-0 top-[11.85%] h-[25.9%] overflow-hidden border-y border-linha">
        <div className="absolute inset-y-[-1px] left-[-300px] w-[1030px] rounded-full border border-linha" />
        <div className="absolute inset-y-[-1px] left-[730px] aspect-square rounded-full border border-linha">
          <Reveal className="flex h-full w-full items-center justify-center" delay={0.15}>
            <Simbolo className="w-[56%]" fill={DEGRADE_ICONE} />
          </Reveal>
        </div>
        <Reveal className="absolute left-[115px] top-1/2 -translate-y-1/2" delay={0.05}>
          <h2 className={`${titulo} text-degrade pb-[0.06em]`}>{c.linha1.antes}</h2>
        </Reveal>
        <Reveal className="absolute right-[115px] top-1/2 -translate-y-1/2" delay={0.1}>
          <span className={`${titulo} block pb-[0.06em]`} style={{ backgroundImage: DEGRADE_DESTAQUE, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
            {c.linha1.depois}
          </span>
        </Reveal>
      </div>

      {/* linha 2: ( ( Λ )  EM QUE 2027 SE DECIDE   [ pílula ] */}
      <div className="absolute inset-x-0 top-[37.75%] h-[25.9%] overflow-hidden border-b border-linha">
        <div className="absolute inset-y-[-1px] left-0 flex -translate-x-1/4">
          <div className="aspect-square h-full rounded-full border border-linha" />
          <div className="ml-[2px] flex aspect-square h-full items-center justify-center rounded-full border border-linha">
            <Reveal className="flex h-full w-full items-center justify-center" delay={0.2}>
              <Simbolo className="w-[56%]" fill={DEGRADE_DESTAQUE} />
            </Reveal>
          </div>
        </div>
        <Reveal className="absolute left-[462px] top-1/2 -translate-y-1/2" delay={0.12}>
          <span className={`${titulo} text-degrade block pb-[0.06em]`}>{c.linha2}</span>
        </Reveal>
        <div className="absolute inset-y-[-1px] left-[calc(100%-392px)] w-[700px] rounded-full border border-linha">
          <Reveal className="absolute left-[72px] top-1/2 -translate-y-1/2" delay={0.25}>
            <Justificado linhas={c.pilula} className="w-[218px] text-[16px] font-normal leading-[1.18] text-tinta/80" />
          </Reveal>
        </div>
      </div>

      {/* faixa em degradê com as três colunas */}
      <div className="absolute inset-x-0 bottom-0 top-[63.65%] overflow-hidden text-white">
        {/* vidro discreto, como na faixa do CEEX: estrias finas e suaves sobre o degradê */}
        <FundoVidro tom="azul" largura={56} refracao={1.18} sombra={0.35} fio="rgba(255, 255, 255, 0.07)" />
        <div className="absolute inset-y-[10%] left-[35.4%] w-px bg-white/35" />
        <div className="absolute inset-y-[10%] left-[66.7%] w-px bg-white/35" />
        {c.colunas.map((col, i) => (
          <Reveal
            key={i}
            delay={0.3 + i * 0.08}
            className="absolute top-[19%]"
            // colunas do CEEX em 1920: 115–600 · 752–1205 · 1356–1806
            style={{ left: COLUNAS[i].x, width: COLUNAS[i].w }}
          >
            <p className="text-justify text-[24px] font-light leading-[1.45] tracking-[-0.005em] text-pretty">
              <Trechos trechos={col} forteClassName="font-medium" />
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
