import type { CSSProperties, ReactNode } from "react";
import { useSlide } from "@/components/deck/SlideContext";
import { MODO_FUNDO } from "@/lib/modo";

/** Fundo decorativo (vidro, desfoques) que no PDF vira UMA imagem JPEG.
 *  Em vetor, cada faixa do vidro leva uma cópia inteira da cena (até 35 por
 *  página) e o arquivo fica pesado. A exportação (scripts/capturar.mjs) abre a
 *  página com ?fundo, fotografa este bloco sozinho e salva em
 *  assets/pdf/<id da página>.jpg; no PDF entra a imagem no lugar. Na tela e
 *  no celular continua ao vivo. Só um por página (o mais externo vale).
 *  `escala`: resolução da imagem em relação à página (padrão da exportação:
 *  1,25). Use 1 para fotos que já estão em tamanho natural na página. */
export function FundoPdf({
  className,
  style,
  escala,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  escala?: number;
  children: ReactNode;
}) {
  const { pdf } = useSlide();
  if (pdf && !MODO_FUNDO)
    return (
      <div aria-hidden className={className} style={style}>
        <img
          src={`assets/pdf/${pdf}.jpg`}
          alt=""
          className="absolute inset-0 size-full max-w-none"
        />
      </div>
    );
  return (
    <div
      aria-hidden
      data-pdf-fundo={pdf ?? ""}
      data-pdf-escala={escala}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
