import { cn } from '@/lib/utils'

/** Imagem de fundo decorativa ocupando todo o contêiner. */
export function Fundo({ src, className, posicao }: { src: string; className?: string; posicao?: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      draggable={false}
      className={cn('pointer-events-none absolute inset-0 h-full w-full object-cover', className)}
      style={posicao ? { objectPosition: posicao } : undefined}
    />
  )
}
