"""Junta as páginas exportadas num único PDF e prepara o arquivo para envio.

Uso:  python -I scripts/juntar_pdf.py SAIDA.pdf pagina01.pdf pagina02.pdf ...

- Informações do arquivo (título, assunto, autor) e o leitor mostra o título.
- Miniatura embutida na página 1 (/Thumb): vários apps usam direto como prévia.
- Recomprime só as FOTOS (JPEG colocados direto na página, sem transparência):
  qualidade 76 e no máximo 1,25× o tamanho em que aparecem. Não mexe nas outras
  imagens: o Chrome grava os degradês de CSS como imagens e, recomprimidos, eles
  quebram no leitor do Chrome/Edge.
"""
from __future__ import annotations

import io
import sys

import pymupdf
from PIL import Image

QUALIDADE_FOTO = 76
MAX_ESCALA_FOTO = 1.25  # pixels da foto por px da página (1920×1080)

TITULO = "Mídia Kit · Plano 2027 · Dr. Gustavo Sá"
ASSUNTO = "Mídia kit para patrocinadores do Plano 2027 — 5 de dezembro de 2026, Amigo Tech, São Paulo"


def recomprimir_fotos(doc: pymupdf.Document) -> None:
    px_por_pt = 1920 / doc[0].rect.width
    exibida: dict[int, float] = {}  # maior largura exibida (px da página) de cada foto
    for page in doc:
        for im in page.get_images(full=True):
            xref, smask = im[0], im[1]
            if smask or im[5] not in ("DeviceRGB", "DeviceGray", "ICCBased") or "DCT" not in im[8]:
                continue
            for r in page.get_image_rects(xref):
                exibida[xref] = max(exibida.get(xref, 0), r.width * px_por_pt)
    antes = depois = 0
    for xref, larg in exibida.items():
        bruto = doc.xref_stream_raw(xref)
        img = Image.open(io.BytesIO(bruto))
        img.load()
        if img.mode not in ("RGB", "L"):  # CMYK etc.: deixa como está
            continue
        alvo = round(larg * MAX_ESCALA_FOTO)
        if img.width > alvo:
            img = img.resize((alvo, round(img.height * alvo / img.width)), Image.LANCZOS)
        buf = io.BytesIO()
        img.save(buf, "JPEG", quality=QUALIDADE_FOTO, optimize=True, progressive=True)
        novo = buf.getvalue()
        antes += len(bruto)
        if len(novo) >= len(bruto) * 0.92:  # ganho pequeno: deixa como está
            depois += len(bruto)
            continue
        depois += len(novo)
        doc.update_stream(xref, novo, compress=False)
        doc.xref_set_key(xref, "Width", str(img.width))
        doc.xref_set_key(xref, "Height", str(img.height))
        doc.xref_set_key(xref, "Filter", "/DCTDecode")
        doc.xref_set_key(xref, "DecodeParms", "null")
    print(f"fotos: {len(exibida)} | {antes / 1024:.0f} KB -> {depois / 1024:.0f} KB")


def main(saida: str, partes: list[str]) -> None:
    doc = pymupdf.open()
    for f in partes:
        doc.insert_pdf(pymupdf.open(f))
    recomprimir_fotos(doc)

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

    # miniatura embutida (JPEG ~ 320 px de largura) só na página 1: é a que os
    # apps usam como prévia; as outras o leitor desenha quando precisar
    for page in doc.pages(0, 1):
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

    # object streams: os milhares de objetos pequenos que o Chrome gera (grupos,
    # degradês, fontes) vão comprimidos juntos (PDF 1.5, abre em qualquer leitor)
    doc.save(saida, garbage=4, deflate=True, use_objstms=1)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2:])
