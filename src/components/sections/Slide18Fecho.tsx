import { CONTENT } from '@/config/content'
import { Assinatura } from '@/components/ui/Assinatura'
import { FundoVidro } from '@/components/ui/FundoVidro'
import { Reveal } from '@/components/ui/Reveal'
import { Simbolo } from '@/components/ui/Simbolo'
import { Trechos } from '@/components/ui/Trechos'
import { TextoDegrade } from '@/components/ui/TextoDegrade'

const PALAVRA = 'absolute bottom-[34px] left-[-16px] whitespace-nowrap text-[470px] font-normal leading-none tracking-[-0.045em] text-white'

/** Página 17 — Fecho
 *  Molde: pág. 21 do CEEX ("NÃO ENTRE DEPOIS. ENTRE AGORA.": título à esquerda,
 *  texto e botão à direita, palavra gigante cortada embaixo — nítida à esquerda,
 *  desfocada atrás do vidro canelado à direita). A metade de cima é branca. */
export function Slide18Fecho() {
  const c = CONTENT.fecho

  return (
    <div className="relative h-full w-full overflow-hidden bg-white text-tinta">
      {/* metade de baixo: palavra gigante no degradê azul; nítida à esquerda e
          atrás do vidro canelado à direita (como no CEEX) */}
      <div className="absolute inset-x-0 bottom-0 top-[50%] overflow-hidden">
        <FundoVidro
          tom="azul"
          vidroClassName="inset-y-0 left-[52%] right-0"
          cenaVidro={
<span className={`${PALAVRA} blur-[24px]`}>{c.palavra}</span>
          }
        >
          <span className={PALAVRA}>{c.palavra}</span>
        </FundoVidro>
        {/* borda da placa de vidro */}
        <div aria-hidden className="absolute inset-y-0 left-[52%] w-px bg-white/45 shadow-[-6px_0_18px_rgba(0,20,90,0.18)]" />
      </div>

      {/* fios */}
      <div className="absolute left-[54.4%] top-0 h-[50%] w-px bg-linha" />
      <div className="absolute left-[54.4%] right-0 top-[126px] h-px bg-linha" />

      {/* bloco superior direito: tudo centralizado no bloco, como na pág. 21 do CEEX */}
      <div className="absolute left-[54.4%] right-0 top-0 flex h-[126px] items-center justify-center">
        <Reveal y={0}>
          <Assinatura logo="fim" cor="cinza" className="text-cinza" />
        </Reveal>
      </div>

      <div className="absolute left-[172px] top-0 flex h-[50%] items-center">
        <Reveal>
          <TextoDegrade linhas={c.titulo} tamanho={100} entrelinha={0.98} tracking={-0.05} />
        </Reveal>
      </div>

      <div className="absolute left-[54.4%] right-0 top-[126px] flex h-[calc(50%-126px)] flex-col items-center justify-center">
        <Reveal delay={0.1} className="w-[578px]">
          <p className="text-justify text-[28px] font-light leading-[1.38] text-cinza text-pretty">
            <Trechos trechos={c.texto} forteClassName="font-medium text-tinta" />
          </p>
        </Reveal>
        <Reveal delay={0.18} className="mt-[26px] w-[578px]">
          <div className="flex h-[86px] items-center gap-[24px] rounded-[10px] border border-azul/50 bg-azul/[0.05] px-[46px] text-[26px] font-normal text-azul">
            <Simbolo className="h-[30px]" cor="azul" />
            {c.botao}
          </div>
        </Reveal>
      </div>
    </div>
  )
}
