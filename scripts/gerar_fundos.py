"""Gera os fundos rasterizados do mídia kit (efeito vidro canelado do CEEX).

Uso:  python -I scripts/gerar_fundos.py            (a partir da raiz do projeto)

Os fundos são imagens (e não backdrop-filter no CSS) para o efeito sair
idêntico na web e na exportação em PDF.

Vidro canelado, como no CEEX:
  • faixas verticais de ~137px (em 1920) com bordas nítidas;
  • cada faixa mostra o que está atrás levemente comprimido (as formas
    "quebram" e se repetem na emenda);
  • sombreado de cilindro: escuro à esquerda, claro à direita, com um fio
    de luz bem fino na emenda;
  • o branco das letras continua branco — o sombreado aparece só no azul.
"""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
SRC = RAIZ / "scripts" / "src"
FOTOS = RAIZ / "public" / "assets" / "fotos"
OUT_BG = RAIZ / "public" / "assets" / "bg"
OUT_LOGO = RAIZ / "public" / "assets" / "logo"
FONTE_INTER = RAIZ / "node_modules" / "@fontsource-variable" / "inter" / "files" / "inter-latin-wght-normal.woff2"

W, H = 1920, 1080
# fractal-glass (tomzidani): columnsNumber = 30 → 1920 / 30 = 64px por coluna
FAIXA = 64

# Tokens da ID Plano 2027 (estáticos aprovados)
AZUL_LOGO = "#1E3FA8"
AZUL_PROFUNDO = "#003DAC"
AZUL = "#205FD5"
DESTAQUE = "#608DF4"


# ---------------------------------------------------------------------------
# Utilidades
# ---------------------------------------------------------------------------
def hex_rgb(h: str) -> np.ndarray:
    h = h.lstrip("#")
    return np.array([int(h[i : i + 2], 16) for i in (0, 2, 4)], dtype=np.float32)


def gradiente(stops: list[tuple[float, str]], angulo: float = 20.0, w: int = W, h: int = H) -> np.ndarray:
    a = np.deg2rad(angulo)
    ys, xs = np.mgrid[0:h, 0:w].astype(np.float32)
    t = xs * np.cos(a) + ys * np.sin(a)
    t = (t - t.min()) / (t.max() - t.min())
    pos = np.array([s[0] for s in stops], dtype=np.float32)
    cores = np.stack([hex_rgb(s[1]) for s in stops])
    out = np.empty((h, w, 3), dtype=np.float32)
    for c in range(3):
        out[..., c] = np.interp(t, pos, cores[:, c])
    return out


def mapa_cores(lum: np.ndarray, stops: list[tuple[float, str]]) -> np.ndarray:
    """Duotone: luminância 0..1 → degradê de cores."""
    pos = np.array([s[0] for s in stops], dtype=np.float32)
    cores = np.stack([hex_rgb(s[1]) for s in stops])
    out = np.empty(lum.shape + (3,), dtype=np.float32)
    for c in range(3):
        out[..., c] = np.interp(lum, pos, cores[:, c])
    return out


def para_img(arr: np.ndarray) -> Image.Image:
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


def para_arr(img: Image.Image) -> np.ndarray:
    return np.asarray(img.convert("RGB"), dtype=np.float32)


def desfocar(arr: np.ndarray, raio: float) -> np.ndarray:
    return para_arr(para_img(arr).filter(ImageFilter.GaussianBlur(raio)))


def logo_alpha(largura: int) -> Image.Image:
    logo = Image.open(SRC / "PLANO-2027_logo_branco_4000px.png").convert("RGBA")
    alt = round(logo.height * largura / logo.width)
    return logo.resize((largura, alt), Image.LANCZOS).getchannel("A")


def camada_alpha(w: int, h: int, alpha: Image.Image, x: int, y: int, blur: float = 0) -> np.ndarray:
    camada = Image.new("L", (w, h), 0)
    camada.paste(alpha, (x, y))
    if blur > 0:
        camada = camada.filter(ImageFilter.GaussianBlur(blur))
    return np.asarray(camada, dtype=np.float32) / 255.0


def sobrepor(base: np.ndarray, alpha: np.ndarray, cor: str | np.ndarray = "#FFFFFF", forca: float = 1.0) -> np.ndarray:
    c = hex_rgb(cor) if isinstance(cor, str) else cor
    a = (alpha * forca)[..., None]
    return base * (1 - a) + c * a


def brilho_letra(a: np.ndarray, ganho: float = 1.45) -> np.ndarray:
    """Miolo da letra desfocada em branco puro, com halo — como no CEEX."""
    return np.clip(a * ganho, 0, 1)


def zona(w: int, h: int, retangulos: list[tuple[int, int, int, int]], desfoque: float) -> np.ndarray:
    m = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(m)
    for r in retangulos:
        d.rectangle(r, fill=255)
    return np.asarray(m.filter(ImageFilter.GaussianBlur(desfoque)), dtype=np.float32) / 255.0


def texto_alpha(texto: str, tamanho: int, peso: bytes = b"Regular", tracking: float = -0.04) -> Image.Image:
    """Texto em Inter (mesma fonte da web) como máscara alpha, com tracking."""
    fonte = ImageFont.truetype(str(FONTE_INTER), tamanho)
    fonte.set_variation_by_name(peso)
    ascent, descent = fonte.getmetrics()
    larguras = [fonte.getlength(ch) for ch in texto]
    total = int(sum(larguras) + tracking * tamanho * (len(texto) - 1)) + tamanho
    img = Image.new("L", (total, ascent + descent), 0)
    d = ImageDraw.Draw(img)
    x = 0.0
    for ch, lw in zip(texto, larguras):
        d.text((x, 0), ch, font=fonte, fill=255)
        x += lw + tracking * tamanho
    return img.crop(img.getbbox())


# Sombreado de cada coluna — o ::before do fractal-glass (tomzidani):
# linear-gradient(90deg, rgba(0,0,0,.1) 10%, transparent 70%, rgba(0,0,0,.1) 110%)
SOMBRA_U = np.array([0.0, 0.10, 0.70, 1.10], dtype=np.float32)
SOMBRA_A = np.array([0.10, 0.10, 0.0, 0.10], dtype=np.float32)


def canelado(arr: np.ndarray, x0: int = 0, x1: int | None = None, faixa: int = FAIXA, distorcao: float = 3.0,
             forca: float = 1.0, fio: float = 0.0) -> np.ndarray:
    """Fractal glass — mesmo algoritmo do repositório tomzidani/fractal-glass.

    Para cada coluna (largura `faixa`), o script dele recorta um trecho da imagem
    com 3 colunas de largura (`distorcao`) começando no início da coluna, desenha
    a metade da direita normal e a da esquerda ESPELHADA, e espreme tudo de volta
    na largura de 1 coluna (background-size: 100% 100%). Em cada posição u (0..1)
    da coluna isso equivale a ler a imagem em  início + 1,5·faixa·|2u − 1|.
    Depois vem o degradê escuro por cima de cada coluna e um blur de 1px
    (backdrop-filter: blur(1px)).
    """
    h, w, _ = arr.shape
    x1 = w if x1 is None else x1
    out = arr.copy()
    xs = np.arange(x0, x1)
    idx = (xs - x0) // faixa
    inicio = x0 + idx * faixa
    u = (xs - inicio + 0.5) / faixa
    trecho = faixa * distorcao                       # portionWidth
    inicio_src = np.minimum(inicio, w - trecho)      # o "clamp" do script na última coluna
    src = inicio_src + (trecho / 2) * np.abs(2 * u - 1)
    src = np.clip(src, 0, w - 1)
    s0 = np.floor(src).astype(int)
    s1 = np.clip(s0 + 1, 0, w - 1)
    f = (src - s0)[None, :, None]
    reg = arr[:, s0] * (1 - f) + arr[:, s1] * f
    # degradê escuro de cada coluna
    alpha = forca * np.interp(u, SOMBRA_U, SOMBRA_A)
    reg = reg * (1 - alpha[None, :, None])
    if fio > 0:
        linha = fio * np.exp(-(((xs - inicio) / (faixa / 64 * 1.1)) ** 2))
        reg = reg + (255 - reg) * linha[None, :, None]
    out[:, x0:x1] = reg
    # backdrop-filter: blur(1px)
    regiao = para_img(out[:, x0:x1]).filter(ImageFilter.GaussianBlur(1))
    out[:, x0:x1] = para_arr(regiao)
    return out


def grao(arr: np.ndarray, intensidade: float = 1.8, seed: int = 7) -> np.ndarray:
    rng = np.random.default_rng(seed)
    return arr + rng.normal(0, intensidade, arr.shape[:2])[..., None]


def salvar(arr: np.ndarray, nome: str, qualidade: int = 90) -> None:
    OUT_BG.mkdir(parents=True, exist_ok=True)
    destino = OUT_BG / nome
    para_img(arr).save(destino, quality=qualidade, method=6)
    print("ok", destino.relative_to(RAIZ))


def foto(nome: str) -> Image.Image:
    return Image.open(FOTOS / f"{nome}.webp").convert("RGB")


def cobrir(img: Image.Image, w: int, h: int, foco_y: float = 0.5) -> Image.Image:
    escala = max(w / img.width, h / img.height)
    nw, nh = round(img.width * escala), round(img.height * escala)
    img = img.resize((nw, nh), Image.LANCZOS)
    x = (nw - w) // 2
    y = int((nh - h) * foco_y)
    return img.crop((x, y, x + w, y + h))


DEGRADE = [(0.0, AZUL_PROFUNDO), (0.45, AZUL), (1.0, DESTAQUE)]
DEGRADE_DESTAQUE = [(0.0, "#4F7FEF"), (0.55, DESTAQUE), (1.0, "#8DB0FA")]


# ---------------------------------------------------------------------------
# Símbolo (ícones das pílulas): o "Λ" do logotipo
# ---------------------------------------------------------------------------
def gerar_simbolo() -> None:
    logo = Image.open(SRC / "PLANO-2027_logo_branco_4000px.png").convert("RGBA")
    a = np.asarray(logo.getchannel("A"))
    topo = a[: int(a.shape[0] * 0.40)]
    linhas = np.where(topo.max(axis=1) > 0)[0]
    topo = topo[: linhas.max() + 1]
    cols = topo.max(axis=0) > 0
    segs, dentro, ini = [], False, 0
    for x, v in enumerate(cols):
        if v and not dentro:
            dentro, ini = True, x
        elif not v and dentro:
            dentro = False
            segs.append((ini, x))
    x0, x1 = segs[2]  # P, L, Λ, N, O
    recorte = logo.crop((x0, 0, x1, topo.shape[0]))
    recorte = recorte.crop(recorte.getbbox())
    OUT_LOGO.mkdir(parents=True, exist_ok=True)
    recorte.save(OUT_LOGO / "simbolo.png")
    print("ok simbolo", recorte.size)


# ---------------------------------------------------------------------------
# Fundos
# ---------------------------------------------------------------------------
def gerar_capa(largura: int = 2560) -> None:
    """01 — logo PLANO 2027 gigante, desfocado, atrás do vidro canelado.

    Gerado com 2560 de largura: em telas mais largas que 16:9 a imagem não
    estica (faixas e desfoque mantêm o tamanho); no 16:9/PDF corta a direita.
    Halo curto e azul saturado, como no CEEX: miolo branco, muito azul em volta."""
    w = largura
    base = gradiente([(0.0, "#002A9E"), (0.35, AZUL_PROFUNDO), (0.72, AZUL), (1.0, "#3B73E3")], angulo=24, w=w, h=H)
    a = camada_alpha(w, H, logo_alpha(2480), -140, 10, blur=24)
    # atrás da frase (alto, direita — anda conforme a largura da tela) e do título
    z = zona(w, H, [(1090, 160, w, 545), (40, 600, 1060, 960)], desfoque=90)
    base = sobrepor(base, a * (1 - 0.8 * z))
    salvar(grao(canelado(base)), "capa.webp")


def gerar_texturas() -> None:
    """Degradês canelados reutilizáveis (faixas, painéis, fundos)."""
    # azul da ID — com um brilho suave atrás do vidro para as faixas "pegarem luz"
    base = gradiente(DEGRADE, angulo=24)
    brilho = zona(W, H, [(700, -200, 1100, 1300), (1500, -200, 1750, 1300)], desfoque=160)
    base = sobrepor(base, brilho, "#FFFFFF", 0.10)
    salvar(grao(canelado(base)), "degrade-canelado.webp")

    # destaque (2ª cor do CEEX → destaque da ID)
    base = gradiente(DEGRADE_DESTAQUE, angulo=24)
    salvar(grao(canelado(base, forca=0.85)), "destaque-canelado.webp")

    # névoa clara (págs. 10, 15, 16)
    base = gradiente([(0.0, "#F7F7F6"), (0.5, "#EEEEEC"), (1.0, "#F5F5F4")], angulo=0)
    salvar(grao(canelado(base, forca=0.18, fio=0.0), 1.2), "nevoa-canelado.webp")

    # palco (pág. 12): azul com o logo bem desfocado atrás
    base = gradiente(DEGRADE, angulo=30)
    a = camada_alpha(W, H, logo_alpha(2600), -300, 180, blur=55)
    base = sobrepor(base, a, forca=0.32)
    salvar(grao(canelado(base)), "palco.webp")

    # noite (pág. 14): azul quase preto com luzes desfocadas
    base = gradiente([(0.0, "#020511"), (0.6, "#06123A"), (1.0, "#0B2470")], angulo=40)
    luzes = zona(W, H, [(150, 250, 420, 560), (900, 600, 1150, 900), (1350, 120, 1600, 380)], desfoque=120)
    base = sobrepor(base, luzes, AZUL, 0.55)
    salvar(grao(canelado(base, forca=1.2, fio=0.06)), "noite-canelado.webp")


def estender_estudio(nome: str, saida: str, largura: int = 2560, centro_x: int = 1450) -> None:
    """06 — foto inteira, com o fundo liso do estúdio prolongado para fechar
    o quadro (sem IA, sem recortar a pessoa)."""
    img = foto(nome)
    esc = H / img.height
    img = img.resize((round(img.width * esc), H), Image.LANCZOS)
    arr = para_arr(img)
    pw = arr.shape[1]
    x = centro_x - pw // 2
    # fundo: a cor da borda esquerda/direita da foto (média de 6px por linha),
    # replicada e suavizada — o estúdio é liso, então a emenda some
    esq = arr[:, :6].mean(axis=1, keepdims=True)
    dir_ = arr[:, -6:].mean(axis=1, keepdims=True)
    meio = x + pw // 2
    tela = np.concatenate([np.repeat(esq, meio, axis=1), np.repeat(dir_, largura - meio, axis=1)], axis=1)
    tela = desfocar(tela, 110)
    # foto inteira por cima, com emenda suave só nas laterais (a pessoa fica intacta)
    mascara = np.ones(pw, dtype=np.float32)
    rampa = 70
    mascara[:rampa] = np.linspace(0, 1, rampa)
    mascara[-rampa:] = np.linspace(1, 0, rampa)
    m = mascara[None, :, None]
    tela[:, x : x + pw] = arr * m + tela[:, x : x + pw] * (1 - m)
    salvar(grao(tela, 1.2), saida, 92)


def gerar_consultorio() -> None:
    """03 — foto inteira do consultório, escurecida, com o entorno desfocado."""
    img = foto("gustavo-sa-consultorio")
    largura = 2560
    fundo = desfocar(para_arr(cobrir(img, largura, H, 0.45)), 38)
    esc = H / img.height
    frente = para_arr(img.resize((round(img.width * esc), H), Image.LANCZOS))
    pw = frente.shape[1]
    x = (largura - pw) // 2
    mascara = np.ones(pw, dtype=np.float32)
    rampa = 120
    mascara[:rampa] = np.linspace(0, 1, rampa) ** 1.5
    mascara[-rampa:] = np.linspace(1, 0, rampa) ** 1.5
    m = mascara[None, :, None]
    fundo[:, x : x + pw] = frente * m + fundo[:, x : x + pw] * (1 - m)
    salvar(grao(fundo, 1.2), "consultorio.webp", 92)


def gerar_um_dia() -> None:
    """09 — foto com o filtro azul da ID à esquerda; à direita o mesmo azul
    desfocado atrás do vidro canelado (como o "2 DIAS" do CEEX)."""
    img = foto("gustavo-sa-anfitriao")
    corte = 845  # 44% de 1920
    lum = np.asarray(img.convert("L"), dtype=np.float32) / 255.0
    lum = np.clip((lum - 0.08) / 0.85, 0, 1)
    duo = para_img(mapa_cores(lum, [(0.0, "#000A3D"), (0.45, "#1238C9"), (0.8, "#4F7FEF"), (1.0, "#D4E2FF")]))
    esquerda = para_arr(cobrir(duo, corte, H, 0.0))
    direita = para_arr(cobrir(duo, W, H, 0.3))
    direita = desfocar(direita, 45)
    direita = direita * 0.55 + gradiente(DEGRADE_DESTAQUE, angulo=20) * 0.45
    tela = direita.copy()
    tela = canelado(tela, x0=corte)
    tela[:, :corte] = esquerda
    salvar(grao(tela, 1.2), "um-dia.webp", 92)


def gerar_na_sala(escala: int = 2) -> None:
    """18 — "NA SALA" gigante: nítido à esquerda, canelado e desfocado à direita."""
    w, h = W * escala, H * escala
    base = gradiente([(0.0, DESTAQUE), (0.6, "#3F72E6"), (1.0, AZUL)], angulo=15, w=w, h=h)
    letras = texto_alpha("NA SALA", 470 * escala, b"Regular", tracking=-0.045)
    y = round(982 * escala - letras.height)
    nitido = camada_alpha(w, h, letras, -16 * escala, y)
    desf = brilho_letra(camada_alpha(w, h, letras, -16 * escala, y, blur=26 * escala))
    corte = 1000 * escala
    a = nitido.copy()
    a[:, corte:] = desf[:, corte:]
    tela = sobrepor(base, a)
    tela = canelado(tela, x0=corte, faixa=FAIXA * escala)
    salvar(grao(tela, 1.4), "na-sala.webp", 90)


def gerar_contato(escala: int = 2) -> None:
    """19 — logo gigante: metade em foco, metade desfocada atrás do vidro."""
    w, h = W * escala, H * escala
    base = gradiente(DEGRADE, angulo=35, w=w, h=h)
    lw = 1380 * escala
    logo = logo_alpha(lw)
    x, y = (w - lw) // 2 - 40 * escala, (h - logo.height) // 2
    nitido = camada_alpha(w, h, logo, x, y)
    desf = brilho_letra(camada_alpha(w, h, logo, x, y, blur=30 * escala))
    corte = 960 * escala
    a = nitido.copy()
    a[:, corte:] = desf[:, corte:]
    tela = sobrepor(base, a)
    tela = canelado(tela, x0=corte, faixa=FAIXA * escala)
    salvar(grao(tela, 1.4), "contato.webp", 90)


def gerar_um_dia_foto() -> None:
    """09 — só a foto com o filtro azul da ID (o vidro é aplicado ao vivo no CSS)."""
    img = foto("gustavo-sa-anfitriao")
    img = img.resize((img.width * 2, img.height * 2), Image.LANCZOS)
    lum = np.asarray(img.convert("L"), dtype=np.float32) / 255.0
    lum = np.clip((lum - 0.08) / 0.85, 0, 1)
    duo = mapa_cores(lum, [(0.0, "#000A3D"), (0.45, "#1238C9"), (0.8, "#4F7FEF"), (1.0, "#D4E2FF")])
    salvar(duo, "um-dia-foto.webp", 92)


def gerar_desfocados() -> None:
    """Versões já desfocadas do que fica ATRÁS do vidro (guia ceex-fractal-glass,
    "versão mais leve"): cada faixa recebe uma cópia da cena, então o desfoque
    vem pronto na imagem em vez de ser recalculado em cada cópia."""
    # logo branco desfocado, no tamanho exato em que aparece em cada página
    # (largura de exibição, raio do desfoque). A imagem ganha uma margem de 3×raio.
    for nome, largura, raio in [("capa", 2480, 22), ("contato", 1380, 30), ("palco", 2600, 44)]:
        a = logo_alpha(largura)
        m = raio * 3
        tela = Image.new("L", (a.width + 2 * m, a.height + 2 * m), 0)
        tela.paste(a, (m, m))
        tela = tela.filter(ImageFilter.GaussianBlur(raio))
        rgba = Image.merge("RGBA", (Image.new("L", tela.size, 255),) * 3 + (tela,))
        destino = OUT_BG / f"logo-desfocado-{nome}.webp"
        rgba.save(destino, quality=90, method=6)
        print("ok", destino.relative_to(RAIZ), "margem", m)
    # fotos desfocadas
    for origem, saida, raio in [
        (OUT_BG / "anfitriao.webp", "anfitriao-desfocado.webp", 26),
        (FOTOS / "gustavo-sa-quem-e.webp", "quem-e-desfocado.webp", 22),
        (OUT_BG / "um-dia-foto.webp", "um-dia-foto-desfocado.webp", 34),
    ]:
        img = Image.open(origem).convert("RGB").filter(ImageFilter.GaussianBlur(raio))
        destino = OUT_BG / saida
        img.save(destino, quality=88, method=6)
        print("ok", destino.relative_to(RAIZ))


def gerar_mapa() -> None:
    """05 — mapa da região da Amigo Tech (R. Fidêncio Ramos, 100 · Vila Olímpia),
    capturado do Google Maps (scripts/src/mapa-bruto.png, 3400×2000) e deixado
    "bem clarinho" como no CEEX: tons de cinza com contraste reduzido.
    A atribuição "Dados cartográficos ©2026 Google" vai na página."""
    img = Image.open(SRC / "mapa-bruto.png").convert("L")
    lum = np.asarray(img, dtype=np.float32)
    claro = 255 - (255 - lum) * 0.8          # cinzas claros, como no CEEX
    rgb = np.repeat(claro[..., None], 3, axis=2)
    salvar(rgb, "mapa-amigo-tech.webp", 90)


def gerar_linhas_logo() -> None:
    """01 — as duas linhas do logo separadas e desfocadas: PLANO (vai no alto à
    esquerda) e 2027 (vai embaixo à direita), como o "ce" / "ex" do CEEX.
    Saída com margem de 3×raio; o tamanho do glifo vai no nome do print."""
    logo = Image.open(SRC / "PLANO-2027_logo_branco_4000px.png").convert("RGBA").getchannel("A")
    a = np.asarray(logo)
    cheias = a.max(axis=1) > 0
    # linhas = blocos contínuos de pixels (PLANO em cima, 2027 embaixo)
    blocos, dentro, ini = [], False, 0
    for y, v in enumerate(cheias):
        if v and not dentro:
            dentro, ini = True, y
        elif not v and dentro:
            dentro = False
            blocos.append((ini, y))
    if dentro:
        blocos.append((ini, len(cheias)))
    for nome, (y0, y1), largura, raio in [("plano", blocos[0], 1400, 20), ("2027", blocos[-1], 1250, 22)]:
        linha = logo.crop((0, y0, logo.width, y1))
        linha = linha.crop(linha.getbbox())
        alt = round(linha.height * largura / linha.width)
        linha = linha.resize((largura, alt), Image.LANCZOS)
        m = raio * 3
        tela = Image.new("L", (largura + 2 * m, alt + 2 * m), 0)
        tela.paste(linha, (m, m))
        tela = tela.filter(ImageFilter.GaussianBlur(raio))
        rgba = Image.merge("RGBA", (Image.new("L", tela.size, 255),) * 3 + (tela,))
        destino = OUT_BG / f"logo-{nome}-desfocado.webp"
        rgba.save(destino, quality=90, method=6)
        print("ok", destino.relative_to(RAIZ), "glifo", largura, "x", alt, "margem", m)


if __name__ == "__main__":
    gerar_simbolo()
    gerar_capa()
    gerar_texturas()
    gerar_consultorio()
    estender_estudio("gustavo-sa-anfitriao", "anfitriao.webp")
    gerar_um_dia()
    gerar_um_dia_foto()
    gerar_na_sala()
    gerar_contato()
    gerar_desfocados()
    gerar_mapa()
    gerar_linhas_logo()
