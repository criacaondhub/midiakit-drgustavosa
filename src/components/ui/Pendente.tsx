import { TbPhoto } from 'react-icons/tb'
import { cn } from '@/lib/utils'

/** Espaço reservado para um arquivo que ainda não chegou.
 *  Fica visível de propósito: precisa ser trocado antes de enviar o PDF. */
export function Pendente({ rotulo, className, escuro = false }: { rotulo: string; className?: string; escuro?: boolean }) {
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-center justify-center gap-[14px] border-2 border-dashed text-center',
        escuro ? 'border-white/35 bg-white/[0.06] text-white/70' : 'border-azul/35 bg-azul/[0.05] text-azul/80',
        className,
      )}
    >
      <TbPhoto className="size-[44px]" aria-hidden />
      <span className="text-[15px] font-medium uppercase tracking-[0.08em]">Foto pendente</span>
      <span className="max-w-[80%] text-[18px] font-light leading-snug">{rotulo}</span>
    </div>
  )
}
