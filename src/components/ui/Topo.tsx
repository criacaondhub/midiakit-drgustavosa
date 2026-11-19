import { Assinatura } from './Assinatura'
import { Reveal } from './Reveal'
import { Simbolo } from './Simbolo'

/** Topo das páginas claras do CEEX (págs. 2 e 10): logo à esquerda,
 *  assinatura em cinza à direita. */
export function TopoClaro() {
  return (
    <>
      <Reveal className="absolute left-[115px] top-[40px]" y={0}>
        <Simbolo className="h-[40px]" cor="cinza" />
      </Reveal>
      <Reveal className="absolute right-[115px] top-[52px]" y={0}>
        <Assinatura logo="nenhum" className="text-cinza" />
      </Reveal>
    </>
  )
}

/** Par de ícones dos cards (no CEEX: sol + asterisco) — o logo em degradê. */
export function IconesCard() {
  return (
    <span className="flex items-center" aria-hidden>
      <span className="flex size-[38px] items-center justify-center rounded-full border border-linha bg-white">
        <Simbolo className="w-[24px]" cor="degrade" />
      </span>
      <span className="-ml-[8px] flex size-[38px] items-center justify-center rounded-full border border-linha bg-white">
        <Simbolo className="w-[24px]" cor="destaque" />
      </span>
    </span>
  )
}
