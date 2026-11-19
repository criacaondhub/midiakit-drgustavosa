import type { IconType } from 'react-icons'
import { TbCoffee, TbFlag, TbGift, TbGlassFull, TbId, TbPresentation } from 'react-icons/tb'
import { CONTENT } from '@/config/content'
import { Reveal } from '@/components/ui/Reveal'

const ICONES: IconType[] = [TbGlassFull, TbId, TbPresentation, TbCoffee, TbGift, TbFlag]

/** Página 14 — Onde a sua marca aparece
 *  Molde: pág. 19 do CEEX ("Respire a Creator Economy por todos os cantos do
 *  evento!": título à esquerda com palavras em faixa, planta à direita).
 *  No lugar da planta: o mapa do dia — 6 pontos ligados por linha, cada um com
 *  ícone e nome (ilustração esquemática, não planta técnica). */
export function Slide15OndeAparece() {
  const c = CONTENT.ondeAparece

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#f3f3f1] text-tinta">
      {/* título com as palavras em faixa */}
      <div className="absolute inset-y-0 left-[118px] flex items-center">
        <Reveal>
          <h2 className="text-[90px] font-normal leading-[1.02] tracking-[0.005em]">
            {c.titulo.map((l) =>
              l.forte ? (
                <span key={l.texto} className="my-[4px] block w-fit bg-degrade px-[10px] pb-[8px] text-white">
                  {l.texto}
                </span>
              ) : (
                <span key={l.texto} className="block">
                  {l.texto}
                </span>
              ),
            )}
          </h2>
        </Reveal>
      </div>

      {/* mapa do dia: percurso vertical com os 6 pontos */}
      <div className="absolute inset-y-0 right-[115px] flex items-center">
        <Reveal delay={0.12}>
          <div className="relative w-[700px] rounded-[28px] bg-white px-[60px] py-[52px] shadow-[0_30px_80px_rgba(0,30,110,0.10)]">
            {/* linha que liga os pontos (atrás dos círculos) */}
            <div
              aria-hidden
              className="absolute bottom-[92px] left-[101px] top-[150px] w-[3px] rounded-full"
              style={{ background: 'linear-gradient(180deg, #003dac 0%, #205fd5 50%, #608df4 100%)' }}
            />

            <ol className="relative">
              {c.pontos.map((ponto, i) => {
                const Icone = ICONES[i]
                const novoDia = i === 0 || c.pontos[i - 1].dia !== ponto.dia
                return (
                  <li key={ponto.nome} data-sem-checagem>
                    {novoDia && (
                      <p className={`${i === 0 ? '' : 'mt-[30px]'} mb-[18px] ml-[112px] text-[15px] font-medium uppercase tracking-[0.12em] text-azul`}>
                        {ponto.dia}
                      </p>
                    )}
                    <div className={`flex items-center gap-[28px] ${novoDia ? '' : 'mt-[22px]'}`}>
                      <span className="relative flex size-[84px] shrink-0 items-center justify-center rounded-full bg-degrade text-white shadow-[0_12px_28px_rgba(0,61,172,0.28)] ring-[7px] ring-white">
                        <Icone className="size-[38px]" aria-hidden />
                      </span>
                      <span className="flex items-baseline gap-[18px]">
                        <span className="w-[34px] text-[17px] font-semibold tabular-nums tracking-[0.04em] text-destaque">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[34px] font-medium leading-none tracking-[-0.01em]">{ponto.nome}</span>
                      </span>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
