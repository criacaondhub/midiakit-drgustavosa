import type { Trecho } from '@/config/content'
import { cn } from '@/lib/utils'

/** Renderiza o copy com os trechos em negrito (destaque da arte). */
export function Trechos({ trechos, forteClassName }: { trechos: readonly Trecho[]; forteClassName?: string }) {
  return (
    <>
      {trechos.map((t, i) =>
        t.forte ? (
          <strong key={i} className={cn('font-semibold', forteClassName)}>
            {t.texto}
          </strong>
        ) : (
          <span key={i}>{t.texto}</span>
        ),
      )}
    </>
  )
}
