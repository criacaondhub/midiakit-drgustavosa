/** ?fundo — usado só na exportação: esconde os textos (tudo que entra com
 *  <Reveal>) para capturar o fundo da capa como uma imagem única. */
export const MODO_FUNDO = new URLSearchParams(window.location.search).has('fundo')
