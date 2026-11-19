import type { SlideDef } from '@/components/deck/Deck'
import { Slide01Capa } from '@/components/sections/Slide01Capa'
import { Slide02OQueE } from '@/components/sections/Slide02OQueE'
import { Slide03Bastidores } from '@/components/sections/Slide03Bastidores'
import { Slide04QuemE } from '@/components/sections/Slide04QuemE'
import { Slide05Local } from '@/components/sections/Slide05Local'
import { Slide06Anfitriao } from '@/components/sections/Slide06Anfitriao'
import { Slide07Alcance } from '@/components/sections/Slide07Alcance'
import { Slide08Publico } from '@/components/sections/Slide08Publico'
import { Slide09UmDia } from '@/components/sections/Slide09UmDia'
import { Slide10Formato } from '@/components/sections/Slide10Formato'
import { Slide11Temas } from '@/components/sections/Slide11Temas'
import { Slide12Palco } from '@/components/sections/Slide12Palco'
import { Slide13Realizacao } from '@/components/sections/Slide13Realizacao'
import { Slide15OndeAparece } from '@/components/sections/Slide15OndeAparece'
import { Slide16PorQue } from '@/components/sections/Slide16PorQue'
import { Slide17Formatos } from '@/components/sections/Slide17Formatos'
import { Slide18Fecho } from '@/components/sections/Slide18Fecho'
import { Slide19Contato } from '@/components/sections/Slide19Contato'

/** As 18 páginas do mídia kit, na ordem do copy (a pág. "Jantar de véspera" saiu). */
export const SLIDES: SlideDef[] = [
  { id: 'capa', Component: Slide01Capa, fundo: '#0a47c4' },
  { id: 'o-que-e', Component: Slide02OQueE, fundo: '#ffffff' },
  { id: 'bastidores', Component: Slide03Bastidores, fundo: '#111111' },
  { id: 'quem-e', Component: Slide04QuemE, fundo: '#ffffff' },
  { id: 'local', Component: Slide05Local, fundo: '#ffffff' },
  { id: 'anfitriao', Component: Slide06Anfitriao, fundo: '#d6d6d4' },
  { id: 'alcance', Component: Slide07Alcance, fundo: '#ffffff' },
  { id: 'publico', Component: Slide08Publico, fundo: '#205fd5' },
  { id: 'um-dia', Component: Slide09UmDia, fundo: '#1238c9' },
  { id: 'formato', Component: Slide10Formato, fundo: '#f1f1f0' },
  { id: 'temas', Component: Slide11Temas, fundo: '#ffffff' },
  { id: 'palco', Component: Slide12Palco, fundo: '#205fd5' },
  { id: 'realizacao', Component: Slide13Realizacao, fundo: '#ffffff' },
  { id: 'onde-aparece', Component: Slide15OndeAparece, fundo: '#f1f1f0' },
  { id: 'por-que', Component: Slide16PorQue, fundo: '#f1f1f0' },
  { id: 'formatos', Component: Slide17Formatos, fundo: '#ffffff' },
  { id: 'fecho', Component: Slide18Fecho, fundo: '#ffffff' },
  { id: 'contato', Component: Slide19Contato, fundo: '#205fd5' },
]
