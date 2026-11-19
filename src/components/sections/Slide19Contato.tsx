import { CONFIG, CONTENT } from "@/config/content";
import { Assinatura } from "@/components/ui/Assinatura";
import { FundoPdf } from "@/components/ui/FundoPdf";
import { FundoVidro } from "@/components/ui/FundoVidro";
import { Reveal } from "@/components/ui/Reveal";

/** Página 19 — Contato
 *  Molde: pág. 22 do CEEX (símbolo gigante no degradê, parte em foco e parte
 *  desfocada atrás do vidro canelado, rodapé). */
export function Slide19Contato() {
  return (
    <div className="relative h-full w-full overflow-hidden text-white">
      <FundoPdf className="absolute inset-0">
        <FundoVidro
          tom="azul"
          // como na pág. 22 do CEEX: a placa de vidro termina um pouco antes da base,
          // o conteúdo continua quase contínuo entre as faixas (refração suave) e cada
          // faixa tem um fio de luz forte na borda direita
          vidroClassName="left-[50%] right-0 top-0 bottom-[22px]"
          refracao={1.25}
          desloc={-0.08}
          brilho={0.22}
          fio="rgba(255, 255, 255, 0.4)"
          cenaVidro={
            <>
              {/* mesma posição do logo nítido, desfocado mas ainda branco e luminoso
                (como o sol do CEEX); a imagem tem 90px de margem (3 × raio) */}
              <img
                src="assets/bg/logo-desfocado-contato.webp"
                alt=""
                width={1560}
                height={772}
                className="absolute left-1/2 top-1/2 w-[1560px] max-w-none -translate-x-[52.63%] -translate-y-1/2"
              />
              {/* véu leve: o vidro clareia em direção ao canto inferior direito, como no CEEX */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(165deg, rgba(255,255,255,0) 0%, rgba(96,141,244,0.18) 45%, rgba(169,194,251,0.45) 100%)",
                }}
              />
            </>
          }
        >
          <img
            src="assets/logo/PLANO-2027_logo_branco_2000px.png"
            alt=""
            width={2000}
            height={858}
            className="absolute left-1/2 top-1/2 w-[1380px] max-w-none -translate-x-[53%] -translate-y-1/2"
          />
        </FundoVidro>
        {/* borda da placa de vidro na divisa */}
        <div
          aria-hidden
          className="absolute bottom-[22px] left-1/2 top-0 w-px bg-white/55 shadow-[-6px_0_18px_rgba(0,20,90,0.18)]"
        />
      </FundoPdf>

      <Reveal className="absolute right-[115px] top-[57px]" y={0}>
        <Assinatura logo="fim" />
      </Reveal>

      {/* ⚠️ PENDENTE — WhatsApp e e-mail da equipe (definir de quem) */}
      <Reveal
        className="absolute bottom-[50px] right-[115px] text-right"
        delay={0.1}
      >
        <p className="text-[30px] font-medium tracking-[-0.02em]">
          {CONTENT.contato.texto}
        </p>
        <p className="mt-[6px] text-[24px] font-light text-white/85">
          {CONFIG.WHATSAPP} · {CONFIG.EMAIL}
        </p>
      </Reveal>

      <Reveal className="absolute bottom-[57px] left-[115px]" y={0}>
        <Assinatura logo="inicio" />
      </Reveal>
    </div>
  );
}
