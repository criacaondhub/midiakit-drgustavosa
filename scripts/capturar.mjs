// Exportação do PDF final (e screenshots, se precisar).
//
//   node scripts/capturar.mjs --pdf        → MIDIA-KIT-PLANO-2027.pdf (19 páginas 16:9)
//   node scripts/capturar.mjs [3 5]        → screens/NN.png (todas ou só as indicadas)
//
// Requer o servidor rodando (npm run dev) em http://localhost:5173
//
// O PDF é gerado UMA PÁGINA POR VEZ e depois juntado: quando o Chrome imprime
// várias páginas de uma vez, ele encolhe o conteúdo (~93%) e sobra borda escura.
// Página por página sai em tamanho cheio, com o texto em vetor.
import puppeteer from 'puppeteer-core'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = process.env.DECK_URL ?? 'http://localhost:5173/?print'
const args = process.argv.slice(2)
const pdf = args.includes('--pdf')
const only = args.filter((a) => /^\d+$/.test(a)).map(Number)

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--force-color-profile=srgb'] })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })

async function abrir(url) {
  await page.goto(url, { waitUntil: 'networkidle0' })
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))))
  })
  await new Promise((r) => setTimeout(r, 300))
}

if (pdf) {
  await abrir(BASE)
  const total = (await page.$$('section')).length
  const paginas = only.length ? only : Array.from({ length: total }, (_, i) => i + 1)
  const tmp = mkdtempSync(join(tmpdir(), 'midia-kit-'))
  const partes = []
  for (const n of paginas) {
    await abrir(`${BASE}&paginas=${n}`)
    const arq = join(tmp, `${String(n).padStart(2, '0')}.pdf`)
    await page.pdf({ path: arq, width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true })
    partes.push(arq)
    process.stdout.write(`página ${n} ok\n`)
  }
  const out = resolve(process.env.PDF_OUT ?? 'MIDIA-KIT-PLANO-2027.pdf')
  // Junta as páginas. Peso: as fotos ficam em JPEG nos assets — o Chrome guarda
  // JPEG como está, mas regrava WebP sem compressão (a foto da equipe ia de
  // 455 KB para 5 MB). Não recomprimir imagens aqui: o Chrome grava os degradês
  // de CSS como imagens e eles quebram no leitor do Chrome/Edge.
  const juntar = [
    'import pymupdf, sys',
    'out = pymupdf.open()',
    'for f in sys.argv[2:]:',
    '    out.insert_pdf(pymupdf.open(f))',
    'out.save(sys.argv[1], garbage=4, deflate=True)',
  ].join('\n')
  execFileSync('python', ['-I', '-c', juntar, out, ...partes])
  rmSync(tmp, { recursive: true, force: true })
  console.log('PDF:', out)
} else {
  await abrir(BASE)
  mkdirSync('screens', { recursive: true })
  const sections = await page.$$('section')
  for (const [i, el] of sections.entries()) {
    if (only.length && !only.includes(i + 1)) continue
    const file = `screens/${String(i + 1).padStart(2, '0')}.png`
    await el.screenshot({ path: file })
    console.log(file)
  }
}
await browser.close()
