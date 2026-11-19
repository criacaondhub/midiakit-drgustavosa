import { CONTENT } from '@/config/content'
import { Assinatura } from '@/components/ui/Assinatura'
import { FundoVidro } from '@/components/ui/FundoVidro'
import { LuzesDesfocadas } from '@/components/ui/Letreiro'
import { Reveal } from '@/components/ui/Reveal'

/* foto real do ensaio, sem filtro (a versão azulada foi retirada) */
const FOTO = 'assets/fotos/gustavo-sa-anfitriao.webp'

/** Página 09 — 1 dia
 *  Molde: pág. 8 do CEEX ("2 DIAS de experiências únicas!": número gigante à
 *  direita). À esquerda a foto; à direita o vidro canelado no azul da ID. */
export function Slide09UmDia() {
  const c = CONTENT.umDia

  return (
    <div className="relative h-full w-full overflow-hidden text-white">
      {/* direita: como a pág. 8 do CEEX — campo de luz desfocado atrás de faixas finas */}
      <FundoVidro tom="azul" vidroClassName="inset-y-0 left-[44%] right-0" largura={80}>
        <LuzesDesfocadas />
      </FundoVidro>

      {/* esquerda: foto */}
      <div className="absolute inset-y-0 left-0 w-[44%] overflow-hidden bg-[#d2d2d0]">
        <img
          src={FOTO}
          alt="Dr. Gustavo Sá, anfitrião do Plano 2027"
          width={560}
          height={800}
          className="h-full w-full object-cover"
          style={{ objectPosition: '50% 0%' }}
        />
      </div>

      <Reveal className="absolute right-[115px] top-[57px]" y={0}>
        <Assinatura logo="fim" />
      </Reveal>

      <div className="absolute inset-y-0 left-[54.2%] flex flex-col justify-center">
        <Reveal delay={0.05}>
          <span className="block whitespace-nowrap text-[262px] font-normal leading-[0.8] tracking-[-0.055em]">{c.numero}</span>
        </Reveal>
        <Reveal delay={0.15} className="mt-[34px]">
          <p className="text-[70px] font-light uppercase leading-[1] tracking-[-0.02em]">
            {c.linha.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
        </Reveal>
      </div>

      <Reveal className="absolute bottom-[57px] left-[115px]" y={0}>
        <Assinatura logo="inicio" />
      </Reveal>
    </div>
  )
}
