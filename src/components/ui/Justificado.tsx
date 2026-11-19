import { cn } from '@/lib/utils'

/** Texto justificado como no CEEX, com as quebras de linha definidas no conteúdo.
 *  Cada linha ocupa a largura toda; a última fica alinhada à esquerda.
 *  Garante que nenhum bloco termine com uma palavra sozinha. */
export function Justificado({ linhas, className }: { linhas: readonly string[]; className?: string }) {
  return (
    <p className={className}>
      {linhas.map((linha, i) => (
        <span
          key={i}
          className={cn('block', i < linhas.length - 1 ? 'text-justify [text-align-last:justify]' : 'text-left')}
        >
          {linha}
        </span>
      ))}
    </p>
  )
}
