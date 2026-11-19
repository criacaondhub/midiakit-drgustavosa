// Checagem automática das páginas (modo impressão = o que vai para o PDF):
//  • nenhum bloco de texto termina com uma palavra sozinha na última linha;
//  • nenhum texto sai da página.
// Uso: node scripts/checar.mjs [--prancha]   (requer npm run dev)
import puppeteer from 'puppeteer-core'

const CHROME = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const URL = process.env.DECK_URL ?? 'http://localhost:5173/?print'

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto(URL, { waitUntil: 'networkidle0' })
await page.evaluate(() => document.fonts.ready)

const problemas = await page.evaluate(() => {
  const out = []
  const secoes = [...document.querySelectorAll('section')]
  secoes.forEach((sec, si) => {
    const sb = sec.getBoundingClientRect()
    const blocos = [...sec.querySelectorAll('p, h1, h2, h3, li, span.block')].filter((el) => el.textContent.trim().length > 0 && !el.closest('[data-sem-checagem]'))
    for (const el of blocos) {
      // linhas do bloco (agrupando retângulos de texto pela posição vertical)
      const range = document.createRange()
      range.selectNodeContents(el)
      const rects = [...range.getClientRects()].filter((r) => r.width > 1)
      if (!rects.length) continue
      const linhas = []
      for (const r of rects) {
        const l = linhas.find((x) => Math.abs(x.top - r.top) < r.height * 0.5)
        if (l) { l.left = Math.min(l.left, r.left); l.right = Math.max(l.right, r.right) } else linhas.push({ top: r.top, left: r.left, right: r.right, h: r.height })
      }
      if (linhas.length > 1) {
        const ultima = linhas.sort((a, b) => a.top - b.top).at(-1)
        // palavras na última linha
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
        let palavras = 0
        while (walker.nextNode()) {
          const n = walker.currentNode
          const re = /\S+/g
          let m
          while ((m = re.exec(n.data))) {
            const rr = document.createRange()
            rr.setStart(n, m.index)
            rr.setEnd(n, m.index + m[0].length)
            const rc = rr.getClientRects()[0]
            if (rc && Math.abs(rc.top - ultima.top) < ultima.h * 0.5) palavras++
          }
        }
        if (palavras === 1) out.push(`pág ${si + 1}: palavra sozinha → "${el.textContent.trim().slice(-40)}"`)
      }
      for (const l of linhas) {
        if (l.right > sb.right + 1 || l.left < sb.left - 1 || l.top < sb.top - 1 || l.top + l.h > sb.bottom + 1) {
          out.push(`pág ${si + 1}: texto fora da página → "${el.textContent.trim().slice(0, 40)}"`)
          break
        }
      }
    }
  })
  return out
})

console.log(problemas.length ? problemas.join('\n') : 'OK — nenhuma palavra sozinha, nenhum texto fora da página')

if (process.argv.includes('--prancha')) {
  const secoes = await page.$$('section')
  const { mkdirSync } = await import('node:fs')
  const dir = process.env.PRANCHA_DIR ?? 'screens'
  mkdirSync(dir, { recursive: true })
  for (const [i, el] of secoes.entries()) await el.screenshot({ path: `${dir}/${String(i + 1).padStart(2, '0')}.png` })
  console.log('prancha em', dir)
}
await browser.close()
