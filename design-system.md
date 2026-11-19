# Design System — Mídia Kit Plano 2027 · Dr. Gustavo Sá

Molde: mídia kit do CEEX 2025 (`BR.pdf`) — ordem, diagramação e ritmo.
Cor, fonte e logo: ID do Plano 2027 (extraídas dos estáticos aprovados em `Social Mídia/` e dos PSDs).
Navegação: idêntica à proposta SelfMedClub (`dr.gustavosa.com.br/selfmedclub/proposta/`).

## 1. Tokens de Cor

| Token | Hex | Uso |
|---|---|---|
| `azul` | `#205FD5` | azul principal da ID (estáticos) |
| `azul-profundo` | `#003DAC` | início do degradê, fundos escuros |
| `azul-logo` | `#1E3FA8` | cor do logotipo azul |
| `destaque` | `#608DF4` | destaque da ID — substitui o laranja do CEEX |
| `tinta` | `#0E0E10` | títulos sobre branco |
| `cinza` | `#7C7C7C` | corpo leve sobre branco |
| `linha` | `#C4C4C4` | fios e bordas das pílulas |
| `nevoa` | `#EDEDEB` | fundos claros |
| `background-dark` | `#04060C` | fundo do deck e escurecimento da transição |

- **Degradê** (no lugar do azul → ciano do CEEX): `azul-profundo → azul → destaque` (utilitários `bg-degrade` / `text-degrade`).
- **Nada de laranja** (cor do Protocolo 10K).

## 2. Tipografia

- **Inter** (variável, com tamanho óptico) — fonte única, no lugar da grotesca do CEEX. Títulos grandes em caixa alta, peso 500, tracking negativo (≈ -0.045em). Corpo leve (300).
- Assinatura, etiquetas e rótulos: Inter regular, caixa alta, 16px — igual ao CEEX (não usar fonte mono).
- Nenhum bloco termina com uma palavra sozinha: `text-pretty` ou quebras definidas no conteúdo (`<Justificado>`).

## 3. Canvas, Espaçamentos e Grid

- Página-base **1920×1080** (16:9 = página do PDF). Na tela, o canvas estica no eixo que sobrar para ocupar a janela inteira; elementos ancorados nas bordas e fundos em `object-cover`.
- Margem lateral: **115px** (equivalente à do CEEX).
- Assinatura do topo: `top 57px`, alinhada à margem. Rodapé: `bottom 57px`.
- Páginas com bloco dividido por fios (07, 18): assinatura e texto **centralizados no bloco** da direita, como no CEEX.
- Mobile (< 768px): páginas empilhadas, escaladas pela largura (comportamento da referência).

## 4. Navegação (deck)

- Página nova entra pela lateral (`x 100% → 0`); a anterior recua: `scale 0.88`, `border-radius 28px`, `x -28%`, escurecimento 65%.
- Duração 1,1s, curva `cubic-bezier(0.77, 0, 0.175, 1)`.
- Teclas: → / PageDown avança · ← / PageUp volta. Pílula de progresso fixa no rodapé central.
- Conteúdo da página entra com `Reveal` depois da transição.

## 5. Símbolo e Imagens

- **Logo** (arquivo do zip `LOGO`, como máscara): na assinatura do topo e do rodapé, no lugar do sol do CEEX — **sempre na mesma cor da tipografia** que o acompanha (branco com texto branco, cinza com texto cinza).
- **Ícones** (pílulas, cards, botões): o próprio logo PLANO 2027 como máscara (`<Simbolo>`), em degradê azul ou destaque.
- **Vidro canelado (fractal glass)**: ao vivo no CSS, conforme o guia `fractal-glass-effect.md` — `<VidroCanelado>` / `<FundoVidro>`: faixas de **137px** (ritmo do CEEX), cada uma com o próprio `backdrop-filter: blur()`, degradê `#fff 0% → #000 28% → #fff 100%` em `overlay` (20%; 26% na capa) e fio branco 10% nas laterais. Blur: 20px na capa (letreiro legível), 26–46px nas demais.
  - O vidro nunca fica dentro de `<Reveal>` (opacidade/filtro no pai cortam o backdrop).
  - ⚠️ O Chrome não imprime `backdrop-filter`: na exportação do PDF as camadas de vidro são capturadas como imagem e o texto continua em vetor por cima.
- "Dr. Gustavo Sá" nunca quebra entre linhas (espaços não separáveis no `content.ts`).
- Fotos: só fotos reais do Gu, sem recorte no rosto, nenhum texto encostando no rosto/cabeça.

| Arquivo | Página |
|---|---|
| `bg/capa.webp` | 01 — logo PLANO 2027 inteiro, gigante e desfocado atrás do vidro canelado |
