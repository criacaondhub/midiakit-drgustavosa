import { cn } from '@/lib/utils'

/** Avatar genérico (silhueta) para o convidado ainda não anunciado. */
export function AvatarGenerico({ className, rotulo = 'Convidado especial' }: { className?: string; rotulo?: string }) {
  return (
    <div
      role="img"
      aria-label={rotulo}
      className={cn('relative h-full w-full overflow-hidden', className)}
      style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.08) 100%)' }}
    >
      <svg viewBox="0 0 100 110" preserveAspectRatio="xMidYMax meet" className="absolute inset-x-0 bottom-0 h-[86%] w-full" aria-hidden>
        <circle cx="50" cy="38" r="19" fill="rgba(255,255,255,0.78)" />
        <path d="M8 110 C8 80 27 64 50 64 C73 64 92 80 92 110 Z" fill="rgba(255,255,255,0.78)" />
      </svg>
    </div>
  )
}
