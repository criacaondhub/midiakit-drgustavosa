import { CONTENT } from '@/config/content'
import { Fundo } from '@/components/ui/Fundo'
import { Reveal } from '@/components/ui/Reveal'
import { Trechos } from '@/components/ui/Trechos'

/** Página 03 — Foto + frase
 *  Molde: pág. 3 do CEEX (foto inteira escurecida, frase no centro, botão em
 *  pílula embaixo). O texto fica na área da mesa, longe do rosto. */
export function Slide03Bastidores() {
  const c = CONTENT.bastidores

  return (
    <div className="relative h-full w-full overflow-hidden text-white">
      <Fundo src="assets/bg/consultorio.webp" posicao="50% 30%" />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/75 via-black/40 to-transparent" />

      {/* tipografia da pág. 3 do CEEX: regular leve, entreletra aberto,
          destaque em bold de entreletra normal, linhas soltas */}
      <div className="absolute inset-x-0 bottom-[150px] flex flex-col items-center">
        <Reveal className="w-[1480px]">
          <p className="text-center text-[50px] font-light leading-[1.18] tracking-[0.03em] [text-wrap:balance]">
            <Trechos trechos={c.frase} forteClassName="font-bold tracking-[-0.005em]" />
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-[44px]">
          <div className="rounded-full border border-white/75 px-[92px] py-[20px] text-[32px] font-light tracking-[0.03em]">
            {c.pilula}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
