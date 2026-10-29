export interface Solucao {
  slug: string;
  n: string;
  titulo: string;
  resumo: string;
  chips: string[];
  h2: string;
  h2Light: string;
  steps: { t: string; d: string }[];
  gains: string[];
  viz: {
    status: string;
    ctx: string;
    kind: 'chart' | 'chat';
    svg?: 'perdas' | 'bombeamento' | 'preditiva' | 'qualidade';
    chat?: { quem: string; pergunta: string; ia: string; passos: string[]; fonte: string };
    vf: { l: string; v: string; cls?: string }[];
  };
}

export const solucoes: Solucao[] = [
  {
    slug: 'perdas',
    n: '01',
    titulo: 'Perdas e vazamentos',
    resumo: 'Balanço por setor e detecção de vazamentos ocultos',
    chips: ['Rede', 'Macromedição'],
    h2: 'Encontrar a água perdida',
    h2Light: 'antes que ela apareça na rua.',
    steps: [
      { t: 'Medir', d: 'Vazão e pressão por setor da rede' },
      { t: 'Comparar', d: 'Água entregue contra água faturada' },
      { t: 'Detectar', d: 'Padrões noturnos e vazamentos ocultos' },
      { t: 'Priorizar', d: 'Equipe onde a perda é maior' },
    ],
    gains: ['Menos água perdida', 'Equipes de campo direcionadas', 'Base para as metas de perdas'],
    viz: {
      status: 'Simulação ilustrativa',
      ctx: 'Setor 04 · últimas 24 h',
      kind: 'chart',
      svg: 'perdas',
      vf: [
        { l: 'Vazão noturna', v: '+14 L/s', cls: 'w' },
        { l: 'Janela', v: '02h-04h' },
        { l: 'Ação', v: 'Pesquisa de vazamento', cls: 'a' },
      ],
    },
  },
  {
    slug: 'bombeamento',
    n: '02',
    titulo: 'Bombeamento eficiente',
    resumo: 'Agenda das bombas fora do horário de ponta',
    chips: ['Elevatória', 'Reservatório'],
    h2: 'Bombas no horário certo,',
    h2Light: 'com a menor conta de energia.',
    steps: [
      { t: 'Monitorar', d: 'Consumo, nível e horário de ponta' },
      { t: 'Prever', d: 'Demanda de cada reservatório' },
      { t: 'Otimizar', d: 'Agenda das bombas fora da ponta' },
      { t: 'Controlar', d: 'Ajuste integrado ao SCADA' },
    ],
    gains: ['Conta de energia menor', 'Reservatórios estáveis', 'Menos partidas e desgaste'],
    viz: {
      status: 'Simulação ilustrativa',
      ctx: 'Elevatória 02 · 24 h',
      kind: 'chart',
      svg: 'bombeamento',
      vf: [
        { l: 'Horas na ponta', v: '0 h', cls: 'a' },
        { l: 'Nível', v: 'Dentro da faixa' },
        { l: 'Partidas/dia', v: '2' },
      ],
    },
  },
  {
    slug: 'preditiva',
    n: '03',
    titulo: 'Manutenção preditiva',
    resumo: 'Alerta de falha em bombas e motores com antecedência',
    chips: ['Elevatória', 'ETA'],
    h2: 'Saber que a bomba vai falhar',
    h2Light: 'antes que ela pare.',
    steps: [
      { t: 'Instrumentar', d: 'Vibração, temperatura e corrente' },
      { t: 'Aprender', d: 'O padrão normal de cada ativo' },
      { t: 'Alertar', d: 'Desvio com dias de antecedência' },
      { t: 'Orientar', d: 'Ordem de serviço com a ação sugerida' },
    ],
    gains: ['Menos falta d’água por parada', 'Manutenção planejada', 'Vida útil maior dos ativos'],
    viz: {
      status: 'Simulação ilustrativa',
      ctx: 'Bomba 02 · 30 dias',
      kind: 'chart',
      svg: 'preditiva',
      vf: [
        { l: 'Ativo', v: 'Bomba 02' },
        { l: 'Antecedência', v: '3 dias', cls: 'w' },
        { l: 'Ação', v: 'Inspecionar rolamento', cls: 'a' },
      ],
    },
  },
  {
    slug: 'qualidade',
    n: '04',
    titulo: 'Qualidade da água',
    resumo: 'Cloro e turbidez acompanhados e projetados',
    chips: ['ETA', 'Reservatório'],
    h2: 'Qualidade acompanhada em tempo real,',
    h2Light: 'não só no laudo.',
    steps: [
      { t: 'Coletar', d: 'Cloro, turbidez e pH em linha' },
      { t: 'Prever', d: 'Desvios antes de sair da faixa' },
      { t: 'Recomendar', d: 'Ajuste de dosagem ao operador' },
      { t: 'Registrar', d: 'Histórico pronto para auditoria' },
    ],
    gains: ['Resposta rápida a desvios', 'Uso racional de produtos químicos', 'Mais segurança para a população'],
    viz: {
      status: 'Simulação ilustrativa',
      ctx: 'Reservatório R3 · 48 h',
      kind: 'chart',
      svg: 'qualidade',
      vf: [
        { l: 'Ponto', v: 'Reservatório R3' },
        { l: 'Previsão', v: 'Mínimo em ~6 h', cls: 'w' },
        { l: 'Ação', v: 'Ajustar dosagem', cls: 'a' },
      ],
    },
  },
  {
    slug: 'copiloto',
    n: '05',
    titulo: 'Copiloto da operação',
    resumo: 'Assistente que responde com manuais e histórico',
    chips: ['Centro de operação', 'Campo'],
    h2: 'Um assistente que conhece',
    h2Light: 'a rede, os manuais e o histórico.',
    steps: [
      { t: 'Conectar', d: 'Manuais, ordens de serviço e SCADA' },
      { t: 'Perguntar', d: 'Em linguagem natural, no celular' },
      { t: 'Responder', d: 'Com a fonte de cada resposta' },
      { t: 'Proteger', d: 'Acesso por perfil e LGPD' },
    ],
    gains: ['Conhecimento que não se perde', 'Novos operadores mais rápidos', 'Decisões com histórico à mão'],
    viz: {
      status: 'Simulação ilustrativa',
      ctx: 'Elevatória 02 · campo',
      kind: 'chat',
      chat: {
        quem: 'Operador · campo',
        pergunta: 'Como faço a partida da bomba 2 da elevatória depois da manutenção?',
        ia: 'Copiloto Next AI',
        passos: [
          'Confirme a liberação do bloqueio na ordem de serviço.',
          'Abra a válvula de sucção e escorve a bomba.',
          'Parta com o recalque parcialmente aberto e acompanhe a corrente no SCADA.',
        ],
        fonte: 'Fonte: manual de operação · seção 4.2',
      },
      vf: [
        { l: 'Fontes', v: 'Manuais e OS' },
        { l: 'Canal', v: 'Celular' },
        { l: 'Acesso', v: 'Por perfil', cls: 'a' },
      ],
    },
  },
];

export const desafios = [
  { n: '01', t: 'Perdas físicas', d: 'Vazamentos visíveis e ocultos na rede' },
  { n: '02', t: 'Perdas comerciais', d: 'Medição imprecisa e ligações irregulares' },
  { n: '03', t: 'Energia', d: 'Bombeamento, um dos maiores custos' },
  { n: '04', t: 'Manutenção', d: 'Bombas e motores param sem aviso' },
  { n: '05', t: 'Qualidade', d: 'Cloro e turbidez dentro da norma' },
  { n: '06', t: 'Operação', d: 'Conhecimento espalhado em manuais e pessoas' },
];
