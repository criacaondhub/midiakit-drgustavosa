/** Fundo da capa: gradientes empilhados nos azuis da ID (como a .fg-scene do
 *  guia ceex-fractal-glass-hero). Usado em todas as páginas azuis com vidro. */
export const FUNDO_AZUL =
  'radial-gradient(60% 95% at 100% 100%, rgba(96,141,244,0.9) 0%, rgba(96,141,244,0) 80%), ' +
  'radial-gradient(18% 70% at 100% 20%, rgba(96,141,244,0.55) 0%, rgba(96,141,244,0) 100%), ' +
  'radial-gradient(50% 85% at 75% 35%, rgba(59,115,227,0.9) 0%, rgba(59,115,227,0) 80%), ' +
  'radial-gradient(40% 60% at 30% 40%, rgba(32,95,213,0.55) 0%, rgba(32,95,213,0) 80%), ' +
  'linear-gradient(100deg, #002a9e 0%, #003dac 45%, #205fd5 100%)'

/** Campo de luz desfocado (pág. 8 do CEEX, "2 DIAS"): sem letras — só manchas
 *  de luz e de sombra nos azuis da ID, que o vidro transforma em estrias.
 *  Posições pensadas para a metade direita da página (onde fica o texto). */
export const LUZES =
  // estrias de luz (como refletores desfocados)
  'radial-gradient(5% 70% at 51% 32%, rgba(214,226,255,0.55) 0%, rgba(214,226,255,0) 100%), ' +
  'radial-gradient(4% 60% at 66% 20%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%), ' +
  'radial-gradient(6% 75% at 83% 60%, rgba(169,194,251,0.6) 0%, rgba(169,194,251,0) 100%), ' +
  'radial-gradient(4% 65% at 96% 30%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%), ' +
  // sombras profundas
  'radial-gradient(22% 38% at 60% 85%, rgba(0,26,110,0.8) 0%, rgba(0,26,110,0) 100%), ' +
  'radial-gradient(18% 30% at 92% 8%, rgba(0,34,130,0.7) 0%, rgba(0,34,130,0) 100%), ' +
  'radial-gradient(14% 40% at 74% 40%, rgba(0,40,150,0.45) 0%, rgba(0,40,150,0) 100%), ' +
  // brilho geral no azul destaque
  'radial-gradient(40% 60% at 80% 55%, rgba(96,141,244,0.55) 0%, rgba(96,141,244,0) 100%)'

export function LuzesDesfocadas() {
  return <div aria-hidden className="absolute inset-0" style={{ background: LUZES }} />
}
