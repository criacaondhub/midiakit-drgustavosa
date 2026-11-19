import { CONTENT } from '@/config/content'
import { Reveal } from '@/components/ui/Reveal'
import { Simbolo } from '@/components/ui/Simbolo'
import { IconesCard, TopoClaro } from '@/components/ui/Topo'

const pad = (n: number) => String(n).padStart(2, '0')

/** Página 11 — Os temas
 *  Molde: pág. 10 do CEEX (grade de cards com etiqueta "conteúdo", título e uma
 *  linha, e um card final com o símbolo). */
export function Slide11Temas() {
  const c = CONTENT.temas

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <TopoClaro />

      <div className="absolute inset-x-[47px] bottom-[80px] top-[135px] grid grid-cols-4 grid-rows-2 gap-[10px]">
        {c.cards.map((card, i) => (
          <Reveal key={card.titulo} delay={0.05 + i * 0.05} className="flex flex-col rounded-[14px] border border-linha px-[30px] pb-[34px] pt-[26px]">
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-normal uppercase tracking-[0.01em] text-cinza">
                {c.etiqueta} {pad(i + 1)}
              </span>
              <IconesCard />
            </div>
            <h3 className="mt-auto text-[46px] font-normal leading-[1.02] tracking-[-0.035em] text-[#4a4a4c]">{card.titulo}</h3>
            <div className="mt-[22px] h-px bg-linha" />
            <p className="mt-[20px] min-h-[4.2em] text-[22px] font-light leading-[1.4] text-cinza text-pretty">{card.texto}</p>
          </Reveal>
        ))}

        {/* card final com o símbolo — no lugar do sol e do asterisco do CEEX */}
        <Reveal delay={0.4} className="relative col-span-2 overflow-hidden rounded-[14px] border border-linha">
          <div className="absolute inset-y-[-1px] left-[-1px] right-[36%] rounded-r-full border border-linha">
            <div className="absolute inset-0 flex items-center justify-center pl-[40px]">
              <img src="assets/logo/logo-plano2027-azul.webp" alt="Plano 2027" width={1000} height={429} className="h-[118px] w-auto" />
            </div>
          </div>
          <div className="absolute inset-y-[-1px] right-[-1px] flex aspect-square items-center justify-center rounded-full border border-linha">
            <Simbolo className="w-[52%]" fill="linear-gradient(90deg, #a9c2fb, #608df4 45%, #3f72e6)" />
          </div>
        </Reveal>
      </div>
    </div>
  )
}
