"""Junta as páginas exportadas num único PDF e prepara o arquivo para envio.

Uso:  python -I scripts/juntar_pdf.py SAIDA.pdf pagina01.pdf pagina02.pdf ...

- Informações do arquivo (título, assunto, autor) e o leitor mostra o título.
- Miniatura embutida em cada página (/Thumb): vários apps usam direto como prévia.
- Não recomprime imagens: o Chrome grava os degradês de CSS como imagens e eles
  quebram no leitor do Chrome/Edge (as fotos já vão em JPEG).
"""
from __future__ import annotations

import sys

import pymupdf

TITULO = "Mídia Kit · Plano 2027 · Dr. Gustavo Sá"
ASSUNTO = "Mídia kit para patrocinadores do Plano 2027 — 5 de dezembro de 2026, Amigo Tech, São Paulo"


def main(saida: str, partes: list[str]) -> None:
    doc = pymupdf.open()
    for f in partes:
        doc.insert_pdf(pymupdf.open(f))

    doc.set_metadata(
        {
            "title": TITULO,
            "subject": ASSUNTO,
            "author": "Nova Dimensão",
            "creator": "Nova Dimensão",
            "producer": "Nova Dimensão",
            "keywords": "Plano 2027, mídia kit, patrocínio, Dr. Gustavo Sá, Amigo Tech",
        }
    )
    # abre na página 1, uma página por vez, com o título na janela do leitor
    cat = doc.pdf_catalog()
    doc.xref_set_key(cat, "PageLayout", "/SinglePage")
    doc.xref_set_key(cat, "PageMode", "/UseNone")
    doc.xref_set_key(cat, "ViewerPreferences", "<< /DisplayDocTitle true >>")

    # miniaturas embutidas (JPEG ~ 320 px de largura)
    for page in doc:
        pix = page.get_pixmap(matrix=pymupdf.Matrix(320 / page.rect.width, 320 / page.rect.width))
        jpg = pix.tobytes("jpg", jpg_quality=80)
        xref = doc.get_new_xref()
        doc.update_object(
            xref,
            f"<< /Type /XObject /Subtype /Image /Width {pix.width} /Height {pix.height} "
            f"/ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode >>",
        )
        doc.update_stream(xref, jpg, new=True, compress=False)
        doc.xref_set_key(page.xref, "Thumb", f"{xref} 0 R")

    doc.save(saida, garbage=4, deflate=True)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2:])
