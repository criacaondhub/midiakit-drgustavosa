/** ?fundo — usado só na exportação: os fundos com vidro (<FundoPdf>) ficam ao
 *  vivo para serem fotografados (o resto da página é escondido pelo script). */
export const MODO_FUNDO = new URLSearchParams(window.location.search).has('fundo')
