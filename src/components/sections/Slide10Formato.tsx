import { CONTENT } from '@/config/content'
import { Pendente } from '@/components/ui/Pendente'
import { Reveal } from '@/components/ui/Reveal'

const INCLINACAO = ['perspective(1600px) rotateY(16deg)', 'none', 'perspective(1600px) rotateY(-16deg)']
const ORIGEM = ['right center', 'center', 'left center']

/** Página 10 — O formato
 *  Molde: pág. 9 do CEEX ("3 PALCOS. 2 DIAS. 1 MOVIMENTO.": título em 3 linhas
 *  com a última em faixa colorida, lista à direita, fotos embaixo). */
export function Slide10Formato() {
  const c = CONTENT.formato
  const [l1, l2, l3] = c.titulo

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f3f3f1] text-tinta">
      <Reveal className="absolute left-[140px] top-[230px]">
        <h2 className="text-[80px] font-normal uppercase leading-[0.9] tracking-[0.015em]">
          <span className="block pl-[8px]">{l1}</span>
          <span className="block pl-[8px]">{l2}</span>
          <span className="mt-[4px] inline-block bg-degrade px-[8px] pb-[6px] pt-[2px] text-white">{l3}</span>
        </h2>
      </Reveal>

      <div className="absolute left-[59%] right-[100px] top-[150px] space-y-[30px]">
        {c.itens.map((it, i) => (
          <Reveal key={it.titulo} delay={0.1 + i * 0.07}>
            <p className="text-[30px] font-normal leading-[1.16] tracking-[0.02em] text-pretty">
              <strong className="font-semibold">{it.titulo}</strong> {it.texto}
            </p>
          </Reveal>
        ))}
        <Reveal delay={0.32}>
          <p className="rounded-[64px] bg-white/75 px-[46px] py-[26px] text-[25px] font-normal leading-[1.25] tracking-[0.02em] text-tinta/80 text-pretty">{c.pilula}</p>
        </Reveal>
      </div>

      {/* três quadros embaixo */}
      {/* subidos para os quadros aparecerem inteiros (antes saíam cortados pela base) */}
      <div className="absolute bottom-[56px] left-[24px] right-[24px] flex h-[36%] items-end gap-[28px]">
        {c.fotos.map((f, i) => (
          <Reveal key={f.legenda} delay={0.3 + i * 0.08} className="h-full flex-1" y={40}>
            <div
              className="h-full w-full overflow-hidden border-[7px] border-white bg-white shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
              style={{ transform: INCLINACAO[i], transformOrigin: ORIGEM[i] }}
            >
              {f.src ? (
                <img src={f.src} alt={f.legenda} className="h-full w-full object-cover" style={{ objectPosition: f.foco }} />
              ) : (
                <Pendente rotulo={f.legenda} />
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
