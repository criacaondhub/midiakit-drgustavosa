import { CONTENT } from '@/config/content'
import { Assinatura } from '@/components/ui/Assinatura'
import { Reveal } from '@/components/ui/Reveal'
import { Simbolo } from '@/components/ui/Simbolo'
import { Vidro } from '@/components/ui/Vidro'

/** Página 04 — Quem é o Dr. Gustavo Sá
 *  Molde: pág. 4 do CEEX (título no degradê à esquerda, texto em 3 blocos
 *  embaixo, foto grande à direita, pílula no rodapé). */
export function Slide04QuemE() {
  const c = CONTENT.quemE

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      {/* foto — recortada só pela borda do quadro */}
      <div className="absolute inset-y-0 left-[53.8%] right-0 overflow-hidden bg-[#d9d9d7]">
        <img
          src="assets/fotos/gustavo-sa-quem-e.jpg"
          alt="Dr. Gustavo Sá, de óculos, com as mãos juntas"
          width={900}
          height={1125}
          className="h-full w-full object-cover"
          style={{ objectPosition: '50% 22%' }}
        />
        {/* vidro canelado só na parte direita da foto (4 faixas finas, começando
            logo depois da orelha — o rosto fica de fora), como a cortina
            canelada ao lado do Vitor Cabral no CEEX */}
        <Vidro
          className="inset-y-0 right-0 w-[304px]"
          largura={76}
          cena={
            <img src="assets/bg/quem-e-desfocado.jpg" alt="" width={900} height={1125} className="h-full w-full object-cover" style={{ objectPosition: '50% 22%' }} />
          }
        />
      </div>

      {/* bloco em degradê com o título */}
      <div className="absolute left-0 top-0 h-[46%] w-[53.8%] bg-degrade text-white">
        <Reveal className="absolute left-[100px] top-[57px]" y={0}>
          <Assinatura logo="inicio" />
        </Reveal>
        <div className="absolute inset-x-0 top-[126px] h-px bg-white/35" />
        <Reveal className="absolute left-[100px] top-[175px] w-[880px]" delay={0.05}>
          <h2 className="text-[66px] font-medium leading-[1.04] tracking-[-0.045em] text-pretty">{c.titulo}</h2>
        </Reveal>
      </div>

      {/* texto em 3 blocos + pílula */}
      <div className="absolute bottom-[70px] left-[100px] top-[calc(46%+72px)] flex w-[860px] flex-col justify-between">
        <Reveal delay={0.15} className="space-y-[26px]">
          {c.blocos.map((b) => (
            <p key={b} className="text-justify text-[23px] font-light leading-[1.5] text-cinza text-pretty">
              {b}
            </p>
          ))}
        </Reveal>
        <Reveal delay={0.25}>
          <div className="inline-flex items-center gap-[18px] rounded-full border border-linha px-[30px] py-[18px] text-[24px] font-light text-cinza">
            <Simbolo className="h-[24px]" cor="azul" />
            {c.pilula}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
