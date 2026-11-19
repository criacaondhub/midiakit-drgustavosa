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
/* fundos com vidro no PDF: resolução (× 1920×1080) e qualidade do JPEG */
const ESCALA_FUNDO = Number(process.env.ESCALA_FUNDO ?? 1.25)
const QUALIDADE_FUNDO = Number(process.env.QUALIDADE_FUNDO ?? 76)

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

  // 1) fundos (<FundoPdf>) fotografados sozinhos → assets/pdf/<id>.jpg.
  //    Vidro: em vetor cada faixa leva uma cópia inteira da cena e o PDF fica
  //    pesado; como imagem única é leve e a página 1 gera prévia nos apps.
  //    Fotos de fundo: já saem recortadas na página (o que fica fora não vai).
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: ESCALA_FUNDO })
  const fundos = []
  for (const n of paginas) {
    await abrir(`${BASE}&paginas=${n}&fundo`)
    const alvos = await page.$$('[data-pdf-fundo]:not([data-pdf-fundo] [data-pdf-fundo])')
    if (alvos.length > 1) throw new Error(`página ${n}: mais de um <FundoPdf> (só um por página)`)
    if (!alvos.length) continue
    const [alvo] = alvos
    // esconde tudo que não é o fundo (nem quem o contém), para fotografar só ele
    const { id, escala } = await alvo.evaluate((t) => {
      for (const el of document.querySelectorAll('section *'))
        if (!t.contains(el) && !el.contains(t)) el.style.visibility = 'hidden'
      return { id: t.dataset.pdfFundo, escala: t.dataset.pdfEscala }
    })
    const png = join(tmp, `${id}.png`)
    await alvo.screenshot({ path: png })
    // fator de redução quando o bloco pede outra resolução (ex.: fotos em 1×)
    const fator = (Number(escala) || ESCALA_FUNDO) / ESCALA_FUNDO
    fundos.push(png, resolve(`public/assets/pdf/${id}.jpg`), String(fator))
  }
  if (fundos.length) {
    const jpg = [
      'import sys',
      'from PIL import Image',
      'a = sys.argv[1:]',
      'for png, jpg, f in zip(a[::3], a[1::3], a[2::3]):',
      '    im = Image.open(png).convert("RGB")',
      '    if float(f) != 1:',
      '        im = im.resize((round(im.width * float(f)), round(im.height * float(f))), Image.LANCZOS)',
      `    im.save(jpg, quality=${QUALIDADE_FUNDO}, optimize=True, progressive=True)`,
    ].join('\n')
    execFileSync('python', ['-I', '-c', jpg, ...fundos])
    process.stdout.write(`fundos em imagem: ${fundos.length / 3}\n`)
  }
  await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 })

  const partes = []
  for (const n of paginas) {
    await abrir(`${BASE}&paginas=${n}`)
    const arq = join(tmp, `${String(n).padStart(2, '0')}.pdf`)
    await page.pdf({ path: arq, width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true })
    partes.push(arq)
    process.stdout.write(`página ${n} ok\n`)
  }
  const out = resolve(process.env.PDF_OUT ?? 'MIDIA-KIT-PLANO-2027.pdf')
  // 2) junta as páginas + informações do arquivo + miniaturas (scripts/juntar_pdf.py).
  //    Peso: as fotos ficam em JPEG nos assets (o Chrome guarda JPEG como está, mas
  //    regrava WebP sem compressão).
  execFileSync('python', ['-I', resolve('scripts/juntar_pdf.py'), out, ...partes], { stdio: 'inherit' })
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
