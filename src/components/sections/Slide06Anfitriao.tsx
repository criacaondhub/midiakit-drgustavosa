import { CONTENT } from "@/config/content";
import { FundoPdf } from "@/components/ui/FundoPdf";
import { Reveal } from "@/components/ui/Reveal";

/* No arquivo (2560×1080) a foto original fica centrada em x = 1450. */
const CENTRO_FOTO = 1450 / 2560;

/** Página 06 — Foto do anfitrião
 *  Molde: pág. 6 do CEEX (foto ocupando a página toda, sem texto). O fundo do
 *  estúdio foi prolongado para fechar o 16:9, sem recortar a pessoa. */
export function Slide06Anfitriao() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#d2d2d0]">
      {/* foto com a pessoa centralizada na página (no PDF: já recortada na página) */}
      <FundoPdf className="absolute inset-0 overflow-hidden" escala={1}>
        <img
          src="assets/bg/anfitriao.jpg"
          alt="Dr. Gustavo Sá, anfitrião do Plano 2027"
          width={2560}
          height={1080}
          className="absolute left-1/2 top-0 h-full w-auto max-w-none"
          style={{ transform: `translateX(-${CENTRO_FOTO * 100}%)` }}
        />
      </FundoPdf>

      <Reveal className="absolute bottom-[57px] left-[115px]" y={0}>
        <p className="text-[18px] font-normal tracking-[-0.005em] text-white/80">
          {CONTENT.anfitriao.legenda}
        </p>
      </Reveal>
    </div>
  );
}
