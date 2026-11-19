import { CONTENT } from '@/config/content'
import { Assinatura } from '@/components/ui/Assinatura'
import { AvatarGenerico } from '@/components/ui/AvatarGenerico'
import { FundoVidro } from '@/components/ui/FundoVidro'
import { Reveal } from '@/components/ui/Reveal'
import { Simbolo } from '@/components/ui/Simbolo'

/** Página 12 — Quem sobe no palco
 *  Molde: págs. 11 a 14 do CEEX (título grande + cards dos palestrantes),
 *  tudo numa página só. Embaixo da foto vai só o cargo (sem seguidores). */
export function Slide12Palco() {
  const c = CONTENT.palco

  return (
    <div className="relative h-full w-full overflow-hidden text-white">
      <FundoVidro tom="azul">
        <img
          src="assets/bg/logo-desfocado-palco.webp"
          alt=""
          width={2864}
          height={1379}
          className="absolute left-[-432px] top-[48px] w-[2864px] max-w-none opacity-30"
        />
      </FundoVidro>

      <Reveal className="absolute right-[115px] top-[57px]" y={0}>
        <Assinatura logo="fim" />
      </Reveal>

      <div className="absolute left-[115px] top-[150px]">
        <Reveal>
          <h2 className="text-[66px] font-medium uppercase leading-[1] tracking-[-0.045em]">
            {c.titulo.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="mt-[22px]">
          <p className="text-[27px] font-light text-white/85">{c.apoio}</p>
        </Reveal>
      </div>

      <div className="absolute inset-x-[115px] bottom-[130px] top-[410px] flex gap-[14px]">
        {c.cards.map((p, i) => (
          <Reveal key={p.nome} delay={0.15 + i * 0.07} className="flex flex-1 flex-col overflow-hidden rounded-[16px] border border-white/55 bg-white/[0.12]">
            <div className="flex gap-[8px] p-[12px]">
              <span className="flex h-[48px] flex-1 items-center justify-center rounded-full bg-white px-[14px] text-[19px] font-medium tracking-[-0.01em] text-azul">
                {p.nome}
              </span>
              <span className="flex h-[48px] w-[62px] items-center justify-center rounded-full bg-white">
                <Simbolo className="h-[17px]" fill="linear-gradient(90deg, #003dac, #205fd5 55%, #608df4)" />
              </span>
            </div>
            <div className="min-h-0 flex-1 border-t border-white/40 p-[12px]">
              <div className="h-full w-full overflow-hidden rounded-[12px] bg-white/10">
                {p.foto ? (
                  <img src={p.foto} alt={p.nome} width={560} height={800} className="h-full w-full object-cover" style={{ objectPosition: p.foco }} />
                ) : (
                  <AvatarGenerico className="rounded-[12px]" />
                )}
              </div>
            </div>
            <div className="flex min-h-[118px] items-center justify-center border-t border-white/40 px-[20px] py-[16px] text-center">
              <p className="text-[19px] font-light leading-[1.35] text-pretty">{p.cargo}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="absolute bottom-[57px] left-[115px]" y={0}>
        <Assinatura logo="inicio" />
      </Reveal>
    </div>
  )
}
