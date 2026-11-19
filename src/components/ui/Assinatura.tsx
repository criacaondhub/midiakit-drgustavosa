import { CONTENT } from '@/config/content'
import { cn } from '@/lib/utils'
import { Simbolo } from './Simbolo'

type AssinaturaProps = {
  /** lado do logo, como o sol no CEEX: no fim (topo à direita) ou no início (rodapé à esquerda) */
  logo?: 'inicio' | 'fim' | 'nenhum'
  className?: string
}

/** ©PLANO 2027 · MÍDIA KIT · DR. GUSTAVO SÁ — o topo de toda página.
 *  Mesma tipografia do CEEX: sans regular, caixa alta, pequena.
 *  O logo sai sempre na mesma cor da tipografia (herda a cor do texto). */
export function Assinatura({ logo = 'fim', className }: AssinaturaProps) {
  const marca = <Simbolo className="h-[34px]" />

  return (
    <div className={cn('flex items-center gap-[40px] text-[16px] font-normal uppercase leading-none tracking-[-0.01em]', className)}>
      {logo === 'inicio' && marca}
      {CONTENT.assinatura.map((item) => (
        <span key={item}>{item}</span>
      ))}
      {logo === 'fim' && marca}
    </div>
  )
}
