import { TbCalendarFilled, TbMapPinFilled } from 'react-icons/tb'
import { CONTENT } from '@/config/content'
import { Reveal } from '@/components/ui/Reveal'
import { Trechos } from '@/components/ui/Trechos'

/* Mapa: captura do Google Maps (3400×2000) exibida a 60% → 2040×1200.
   O endereço (ponta do pino) fica em (1020, 599) da imagem exibida. */
const MAPA = { w: 2040, h: 1200, pinoX: 1020, pinoY: 599 }
/* onde o endereço fica na página: à direita, na altura do meio */
const PINO = { x: 1420, y: 560 }

const MASCARA =
  'linear-gradient(to right, transparent 24%, #000 54%), linear-gradient(to bottom, transparent 0%, #000 12%, #000 86%, transparent 100%)'

/** Página 05 — Local, data e público
 *  Molde: pág. 5 do CEEX (dados com ícones à esquerda, mapa clarinho ao fundo).
 *  Sem a foto do local: o mapa ocupa a direita e as informações ficam maiores. */
export function Slide05Local() {
  const c = CONTENT.local

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-[#1c1c1e]">
      {/* mapa da região bem clarinho, sumindo para a esquerda */}
      <img
        src="assets/bg/mapa-amigo-tech.webp"
        alt="Mapa da região da Amigo Tech, na Vila Olímpia, em São Paulo"
        width={3400}
        height={2000}
        className="absolute max-w-none"
        style={{
          left: PINO.x - MAPA.pinoX,
          top: PINO.y - MAPA.pinoY,
          width: MAPA.w,
          height: MAPA.h,
          WebkitMaskImage: MASCARA,
          maskImage: MASCARA,
          WebkitMaskComposite: 'source-in',
          maskComposite: 'intersect',
        }}
      />
      {/* pino do endereço no azul da ID */}
      <TbMapPinFilled
        aria-hidden
        className="absolute size-[78px] text-azul drop-shadow-[0_8px_12px_rgba(0,61,172,0.35)]"
        style={{ left: PINO.x - 39, top: PINO.y - 71 }}
      />
      <p className="absolute bottom-[40px] right-[115px] text-[13px] font-normal text-cinza/80">Dados cartográficos ©2026 Google</p>

      {/* bloco de dados — tratamento da pág. 5 do CEEX, maior para equilibrar
          com o mapa (ícones cheios, semibold, linha do público em peso médio) */}
      <div className="absolute inset-y-0 left-[155px] flex flex-col justify-center">
        <Reveal className="flex items-center gap-[18px]">
          <TbMapPinFilled className="size-[56px] text-azul" aria-hidden />
          <span className="text-[60px] font-semibold leading-[1.25] tracking-[-0.02em]">{c.lugar}</span>
        </Reveal>
        <Reveal delay={0.08} className="flex items-center gap-[18px]">
          <TbCalendarFilled className="size-[56px] text-azul" aria-hidden />
          <span className="text-[60px] font-semibold leading-[1.25] tracking-[-0.02em]">{c.data}</span>
        </Reveal>
        <Reveal delay={0.16} className="mt-[22px]">
          <span className="inline-block bg-azul px-[18px] py-[4px] text-[40px] font-medium leading-[1.3] tracking-[-0.005em] text-white">{c.selo}</span>
        </Reveal>
        <Reveal delay={0.22} className="mt-[16px] pl-[18px]">
          <p className="text-[34px] font-medium leading-[1.35] tracking-[-0.005em]">
            {c.publico.map((linha, i) => (
              <span key={i} className="block">
                <Trechos trechos={linha} forteClassName="font-bold" />
              </span>
            ))}
          </p>
        </Reveal>
      </div>
    </div>
  )
}
