# Mídia Kit · Plano 2027 · Dr. Gustavo Sá

Mídia kit para patrocinadores do **Plano 2027** (5 de dezembro · Amigo Tech · São Paulo), em formato de apresentação web com a navegação da proposta SelfMedClub. O entregável final é o **PDF 16:9 (18 páginas)**.

- Molde visual: mídia kit do CEEX 2025 (`BR.pdf`) — ordem, diagramação e ritmo.
- Cor, fonte e logo: ID do Plano 2027 (ver [`design-system.md`](design-system.md)).
- Copy: "MIDIA KIT - PLANO 2027 - DR. GUSTAVO SÁ - 19-11", todo em [`src/config/content.ts`](src/config/content.ts).

## Rodar

```bash
npm install
npm run dev          # http://localhost:5173
```

- Navegação: → / PageDown avança · ← / PageUp volta · `#N` na URL abre a página N.
- `?print` mostra as páginas como saem no PDF · `?print&paginas=1,5` só algumas.

## Exportar o PDF

Com o `npm run dev` rodando:

```bash
node scripts/capturar.mjs --pdf     # → MIDIA-KIT-PLANO-2027.pdf
node scripts/checar.mjs             # palavra sozinha no fim de linha / texto fora da página
```

O PDF é gerado página por página e depois juntado (o Chrome encolhe o conteúdo quando imprime várias páginas de uma vez). O texto sai em vetor.

## Estrutura

```
src/
  components/deck/      deck (navegação, escala do canvas 1920×1080, modo impressão)
  components/sections/  uma página por arquivo
  components/ui/        Vidro (fractal glass com refração), FundoVidro, Assinatura…
  config/content.ts     todo o copy
public/assets/          fundos, fotos, logos e print do painel
scripts/gerar_fundos.py fotos tratadas, logo desfocado, mapa (python -I scripts/gerar_fundos.py)
```

## Pendências antes de enviar

- [ ] WhatsApp e e-mail de contato (pág. 18)
- [ ] Convidado especial: confirmar se fica "Surpresa" (pág. 12)
- [ ] Cotas de patrocínio: estrutura proposta, valores em aberto (pág. 16)
- [ ] Números do Instagram são do painel de 19/11 (90 dias) — atualizar se o kit sair depois de dezembro
