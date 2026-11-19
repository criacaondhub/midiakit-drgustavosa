import { CONTENT } from '@/config/content'
import { Reveal } from '@/components/ui/Reveal'
import { IconesCard, TopoClaro } from '@/components/ui/Topo'
import { cn } from '@/lib/utils'
import { TextoDegrade } from '@/components/ui/TextoDegrade'

const pad = (n: number) => String(n).padStart(2, '0')

/** Página 17 — Formatos de patrocínio
 *  Página que o CEEX não tem: mesmo visual das pílulas e cards da pág. 11,
 *  em 3 colunas. ⚠️ Estrutura proposta, para o Daniel aprovar (quantidade de
 *  cotas, exclusividade, tempo de fala, lugar no jantar). A lista de
 *  participantes não entra como contrapartida (LGPD). */
export function Slide17Formatos() {
  const c = CONTENT.formatos

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-tinta">
      <TopoClaro />

      <div className="absolute left-[115px] right-[115px] top-[140px]">
        <Reveal>
          <TextoDegrade linhas={[c.titulo]} tamanho={86} entrelinha={0.98} tracking={-0.055} />
        </Reveal>
        <Reveal delay={0.08} className="mt-[14px] w-[1100px]">
          <p className="text-[27px] font-light leading-[1.4] text-cinza text-pretty">{c.apoio}</p>
        </Reveal>
      </div>

      <div className="absolute inset-x-[47px] bottom-[80px] top-[350px] grid grid-cols-3 gap-[10px]">
        {c.cotas.map((cota, i) => {
          const master = i === 0
          return (
            <Reveal
              key={cota.nome}
              delay={0.15 + i * 0.08}
              className={cn(
                'flex flex-col overflow-hidden rounded-[14px] border px-[38px] pb-[34px] pt-[26px]',
                master ? 'border-transparent bg-degrade text-white' : 'border-linha',
              )}
            >
              <div className="flex items-center justify-between">
                <span className={cn('text-[15px] font-normal uppercase tracking-[0.01em]', master ? 'text-white/80' : 'text-cinza')}>
                  COTA {pad(i + 1)}
                </span>
                <IconesCard />
              </div>
              <div className="mt-[40px] flex items-center gap-[18px]">
                <h3 className={cn('text-[64px] font-normal leading-none tracking-[-0.04em]', !master && 'text-[#4a4a4c]')}>{cota.nome}</h3>
                {cota.selo && (
                  <span className="rounded-full border border-white/70 px-[16px] py-[6px] text-[18px] font-normal">{cota.selo}</span>
                )}
              </div>
              <div className={cn('mt-[28px] h-px', master ? 'bg-white/40' : 'bg-linha')} />
              <ul className="mt-[6px]">
                {cota.itens.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      'flex items-start gap-[16px] border-b py-[15px] text-[22px] font-light leading-[1.35] text-pretty last:border-b-0',
                      master ? 'border-white/25' : 'border-linha/70 text-cinza',
                    )}
                  >
                    <span aria-hidden className={cn('mt-[12px] size-[7px] shrink-0 rounded-full', master ? 'bg-white' : 'bg-destaque')} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
