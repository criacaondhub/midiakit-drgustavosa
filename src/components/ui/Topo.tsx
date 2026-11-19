import { Assinatura } from './Assinatura'
import { Reveal } from './Reveal'
import { Simbolo } from './Simbolo'

/** Topo das páginas claras do CEEX (págs. 2 e 10): logo à esquerda,
 *  assinatura em cinza à direita. */
export function TopoClaro() {
  return (
    <>
      <Reveal className="absolute left-[115px] top-[40px]" y={0}>
        <Simbolo className="h-[40px] text-cinza" />
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
        <Simbolo className="w-[24px]" fill="linear-gradient(90deg, #003dac, #205fd5 55%, #608df4)" />
      </span>
      <span className="-ml-[8px] flex size-[38px] items-center justify-center rounded-full border border-linha bg-white">
        <Simbolo className="w-[24px]" fill="linear-gradient(90deg, #a9c2fb, #608df4 50%, #3f72e6)" />
      </span>
    </span>
  )
}
