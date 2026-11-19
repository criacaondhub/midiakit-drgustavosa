/** Todo o conteúdo mutável do mídia kit.
 *  Fonte: "MIDIA KIT - PLANO 2027 - DR. GUSTAVO SÁ - 19-11" (copy aprovado).
 *
 *  Convenções:
 *  • `forte` = trecho em negrito do copy (destaque da arte).
 *  • Arrays de linhas = quebras definidas à mão (justificado como no CEEX,
 *    sem palavra sozinha na última linha).
 *  • `null` em foto = arquivo ainda não recebido (aparece como "pendente"). */

export const CONFIG = {
  // ⚠️ PENDENTE — definir de quem é o contato (pág. 19)
  WHATSAPP: '[WhatsApp]',
  EMAIL: '[e-mail]',
} as const

export type Trecho = { texto: string; forte?: boolean }

export const CONTENT = {
  /** Topo de toda página */
  assinatura: ['©PLANO 2027', 'MÍDIA KIT', 'DR. GUSTAVO SÁ'],

  /** 01 — Capa */
  capa: {
    frase: ['O DIA EM QUE 50 MÉDICOS', 'SELECIONADOS MONTAM', 'O PLANO DE 2027 DA', 'PRÓPRIA CLÍNICA COM', 'O DR. GUSTAVO SÁ.'],
    titulo: 'Plano 2027.',
    apoio:
      'Dia 5 de dezembro, na Amigo Tech, em São Paulo, um dia presencial para médicos montarem a captação, o ticket, as vendas e o conteúdo da clínica para 2027.',
  },

  /** 02 — O que é o Plano 2027 */
  oQueE: {
    linha1: { antes: 'PLANO 2027 É', depois: 'O DIA' },
    linha2: 'EM QUE 2027 SE DECIDE',
    pilula: ['UM DIA, UMA SALA', 'FECHADA, 50 MÉDICOS.'],
    colunas: [
      [
        { texto: 'A sala tem 50 lugares, e quem ocupa cada um é médico que atende particular e quer fazer a clínica crescer em 2027. ' },
        { texto: 'Cada lugar é de quem vai aplicar o que ouvir.', forte: true },
      ],
      [
        { texto: 'Durante um dia inteiro, eles montam com o Dr. Gustavo Sá o plano de captação, oferta, vendas e conteúdo do ano que vem. ' },
        { texto: 'Na véspera, um grupo menor janta com ele.', forte: true },
      ],
      [
        { texto: 'O público é pequeno de propósito, e por isso cada contato que a sua marca faz ali tem nome, clínica e uma decisão para tomar. ' },
        { texto: 'E a sua marca pode estar nessa sala.', forte: true },
      ],
    ] as Trecho[][],
  },

  /** 03 — Foto + frase */
  bastidores: {
    frase: [
      { texto: 'O Plano 2027', forte: true },
      { texto: ' abre os bastidores da clínica que o Dr. Gustavo Sá construiu do zero, começando numa sala de coworking, para 50 médicos que querem acelerar a carreira em 2027.' },
    ] as Trecho[],
    pilula: 'A sua marca está convidada a fazer parte desse dia',
  },

  /** 04 — Quem é o Dr. Gustavo Sá */
  quemE: {
    titulo: 'O nutrólogo que foi um dos primeiros do Brasil no Mounjaro, e hoje forma outros médicos.',
    blocos: [
      'O Dr. Gustavo Sá é médico nutrólogo e CEO do Instituto LongLife, a clínica que ele construiu do zero, começando numa sala de coworking.',
      // Harvard e Yale entram como palestrante (é o que está registrado). Não trocar para "formado em".
      'Pós-graduado em Nutrologia e Psiquiatria pelo Hospital Albert Einstein, com passagem pelo Trinity College Dublin e MBA pela Link School of Business, foi palestrante em Harvard, Yale e no Trinity College e recebeu a Medalha da ALESP em 2025.',
      'Já formou 45 médicos no LEGACY, o fellowship presencial dele, e tem mais de 300 mil seguidores no Instagram.',
    ],
    pilula: 'Quem organiza o Plano 2027 já fez a própria clínica crescer.',
  },

  /** 05 — Local, data e público */
  local: {
    lugar: 'Amigo Tech, São Paulo',
    data: '5 de dezembro de 2026',
    selo: 'Público esperado',
    /** duas linhas (o "|" do copy vira a quebra de linha, com o texto maior) */
    publico: [
      [{ texto: '50', forte: true }, { texto: ' médicos qualificados' }],
      [{ texto: 'jantar de véspera em ' }, { texto: '4/12', forte: true }, { texto: ' para um grupo reduzido' }],
    ] as Trecho[][],
  },

  /** 06 — Foto do anfitrião */
  anfitriao: {
    legenda: 'Dr. Gustavo Sá · anfitrião do Plano 2027',
  },

  /** 07 — Alcance em números */
  alcance: {
    titulo: ['O ALCANCE DO', 'DR. GUSTAVO SÁ', 'EM NÚMEROS'],
    frase: 'O que o Instagram dele entregou nos últimos 90 dias, direto do painel profissional da conta.',
    cards: [
      { numero: '301', unidade: 'MIL', texto: 'seguidores no Instagram' },
      { numero: '13,8', unidade: 'MILHÕES', texto: 'de visualizações em 90 dias (Instagram + Facebook)' },
      { numero: '+3,3', unidade: 'MILHÕES', texto: 'de pessoas diferentes alcançadas em 90 dias' },
      { numero: '5,9', unidade: 'MILHÕES', texto: 'de visualizações de quem ainda não segue o perfil' },
      { numero: '+20', unidade: 'MIL', texto: 'seguidores novos em 90 dias, já descontado quem deixou de seguir' },
    ],
    fonte: 'Fonte: painel profissional do Instagram @drgustavosa, período de 21/08 a 18/11/2026.',
  },

  /** 08 — Quem acompanha o Dr. Gustavo Sá */
  publico: {
    numero: '77%',
    linha: ['DO PÚBLICO É FEMININO, E 97%', 'TEM 25 ANOS OU MAIS.'],
    apoio: [
      { texto: 'São as pessoas que confiam no Dr. Gustavo Sá para falar de saúde, emagrecimento e longevidade, e que o acompanham em ' },
      { texto: '8,9 milhões de visualizações de Reels', forte: true },
      { texto: ', ' },
      { texto: '2,7 milhões de Stories', forte: true },
      { texto: ' e ' },
      { texto: '2,1 milhões de Posts', forte: true },
      { texto: ' a cada 90 dias.' },
    ] as Trecho[],
    fecho: 'Dentro da sala, a sua marca encontra os médicos. Fora dela, o público que segue o médico que organizou o evento.',
    print: 'assets/prints/painel-5.jpeg',
  },

  /** 09 — 1 dia */
  umDia: {
    numero: '1 DIA',
    linha: ['PARA DECIDIR', 'O ANO INTEIRO'],
  },

  /** 10 — O formato */
  formato: {
    titulo: ['50 MÉDICOS.', '1 DIA.', '1 PLANO PARA 2027.'],
    itens: [
      { titulo: 'Jantar de véspera:', texto: 'na noite de 4 de dezembro, um grupo reduzido janta com o Dr. Gustavo Sá.' },
      { titulo: 'Imersão:', texto: 'em 5 de dezembro, um dia inteiro de conteúdo com o Dr. Gustavo Sá e convidados.' },
      { titulo: 'Plano na mão:', texto: 'cada médico sai da sala com o plano de 2027 da clínica escrito.' },
    ],
    pilula: 'Networking real entre médicos que estão construindo clínica, numa sala fechada e exclusiva.',
    fotos: [
      { src: 'assets/fotos/jantar.jpg', legenda: 'Jantar de véspera — mesa posta', foco: '50% 60%' },
      { src: 'assets/fotos/gustavo-sa-consultorio.jpg', legenda: 'Dr. Gustavo Sá', foco: '50% 32%' },
      { src: 'assets/fotos/sala-amigo-tech.jpg', legenda: 'Sala de evento da Amigo Tech', foco: '50% 55%' },
    ] as { src: string | null; legenda: string; foco: string }[],
  },

  /** 11 — Os temas */
  temas: {
    etiqueta: 'CONTEÚDO',
    cards: [
      { titulo: 'Captação', texto: 'De onde vem o paciente de 2027, com uma agenda que não depende só de indicação.' },
      { titulo: 'Oferta e ticket', texto: 'Como passar da consulta avulsa para o protocolo completo e cobrar pelo que se entrega de verdade.' },
      { titulo: 'Vendas', texto: 'O que a secretária precisa fazer para o paciente que pergunta o preço virar paciente agendado.' },
      { titulo: 'Conteúdo', texto: 'Como o conteúdo vira autoridade e faz o paciente procurar o médico pelo nome.' },
      { titulo: 'Networking', texto: 'Um dia ao lado de colegas que estão construindo clínica, trocando o que funcionou em 2026.' },
      { titulo: 'Plano 2027', texto: 'Os planos de marketing, oferta, demanda e vendas escritos, com o que fazer primeiro em janeiro.' },
    ],
  },

  /** 12 — Quem sobe no palco */
  palco: {
    titulo: ['QUEM SOBE NO PALCO', 'COM O DR. GUSTAVO SÁ'],
    apoio: 'Convidados que constroem negócio na medicina todos os dias.',
    // No CEEX vai o número de seguidores; aqui vai só o cargo.
    cards: [
      { nome: 'Dr. Gustavo Sá', cargo: 'Nutrólogo, CEO do Instituto LongLife e anfitrião do Plano 2027', foto: 'assets/fotos/gustavo-sa-quem-e.jpg', foco: '50% 18%' },
      { nome: 'Dr. Rafael Ultramar', cargo: 'Cirurgião de transplante capilar, à frente da Ultramar Day Clinic', foto: 'assets/fotos/rafael-ultramar.jpg', foco: '62% 30%' },
      { nome: 'Daniel Lara', cargo: 'Cofundador da Nova Dimensão, estrategista de marketing e vendas para médicos', foto: 'assets/fotos/daniel-lara.jpg', foco: '40% 15%' },
      { nome: 'Julio Lara', cargo: 'Cofundador da Nova Dimensão, à frente da área comercial', foto: 'assets/fotos/julio-lara.jpg', foco: '50% 12%' },
      // convidado ainda não anunciado: avatar genérico
      { nome: 'Convidado especial', cargo: 'Surpresa', foto: null, foco: '50% 20%' },
    ] as { nome: string; cargo: string; foto: string | null; foco: string }[],
  },

  /** 13 — Realização */
  realizacao: {
    esquerda: [
      { texto: 'O Plano 2027 é realizado pela ' },
      { texto: 'Nova Dimensão', forte: true },
      { texto: ', a agência que constrói o marketing e as vendas de médicos que ensinam outros médicos.' },
    ] as Trecho[],
    direita: 'É o mesmo time por trás dos lançamentos, eventos e salas fechadas do Dr. Gustavo Sá e do Dr. Rafael Ultramar.',
    /** foto do time da Nova Dimensão (colorida, enviada pelo cliente) */
    imagem: 'assets/fotos/equipe-nova-dimensao.jpg',
  },

  /** 15 — Onde a sua marca aparece */
  ondeAparece: {
    titulo: [
      { texto: 'A sua marca' },
      { texto: 'do credenciamento', forte: true },
      { texto: 'ao jantar', forte: true },
      { texto: 'com os 50 médicos' },
    ] as Trecho[],
    /** mapa do dia: 6 pontos ligados por linha, agrupados pelos dois dias do copy
     *  (jantar na noite de 4/12 · imersão em 5/12) */
    pontos: [
      { nome: 'Jantar de véspera', dia: '4 de dezembro · noite' },
      { nome: 'Credenciamento', dia: '5 de dezembro · imersão' },
      { nome: 'Sala da imersão', dia: '5 de dezembro · imersão' },
      { nome: 'Intervalos', dia: '5 de dezembro · imersão' },
      { nome: 'Kit do participante', dia: '5 de dezembro · imersão' },
      { nome: 'Encerramento', dia: '5 de dezembro · imersão' },
    ],
  },

  /** 16 — Por que patrocinar */
  porQue: {
    titulo: { antes: 'POR QUE PATROCINAR O', destaque: 'PLANO 2027?' },
    pilulas: [
      ['50 médicos qualificados,', 'numa sala só'],
      ['Contato olho no olho com', 'quem decide na clínica'],
      ['A sua marca ao lado de um', 'médico com 301 mil seguidores'],
      ['Presença no momento em que o', 'médico decide o que muda em 2027'],
      ['Da véspera ao encerramento,', 'em todos os pontos do dia'],
    ],
  },

  /** 17 — Formatos de patrocínio (proposta de estrutura, valores sob consulta) */
  formatos: {
    titulo: 'FORMATOS DE PATROCÍNIO',
    apoio: 'Valores sob consulta. As cotas são limitadas, para a sala continuar sendo dos médicos.',
    cotas: [
      {
        nome: 'MASTER',
        selo: '1 marca',
        itens: [
          'Exclusividade no segmento',
          'Logo em destaque em todas as peças do evento (LP, credencial, telão e kit)',
          'Fala de até 10 minutos no palco',
          'Espaço de ativação no dia',
          'Material no kit de cada participante',
          'Lugar no jantar de véspera',
        ],
      },
      {
        nome: 'OURO',
        selo: null,
        itens: ['Logo nas peças do evento e no telão', 'Espaço de ativação no dia', 'Material no kit de cada participante'],
      },
      {
        nome: 'APOIO',
        selo: null,
        itens: ['Logo no telão e na credencial', 'Material no kit de cada participante'],
      },
    ] as { nome: string; selo: string | null; itens: string[] }[],
  },

  /** 18 — Fecho */
  fecho: {
    titulo: ['2027 SE DECIDE', 'EM DEZEMBRO.', 'ESTEJA NA SALA.'],
    texto: [
      { texto: 'São 50 lugares e um único dia.', forte: true },
      { texto: ' A sua marca pode estar ao lado do Dr. Gustavo Sá quando esses médicos decidirem como a clínica cresce no próximo ano.' },
    ] as Trecho[],
    botao: 'Vamos conversar?',
    palavra: 'NA SALA',
  },

  /** 19 — Contato */
  contato: {
    texto: 'Fale com a equipe do Plano 2027',
  },
} as const
