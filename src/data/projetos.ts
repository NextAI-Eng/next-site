import icoCondominio from '../assets/ilustracoes/icone-condominio.png';
import icoPesquisas from '../assets/ilustracoes/icone-pesquisas.png';
import icoBombas from '../assets/ilustracoes/icone-bombas.png';
import icoEstacao from '../assets/ilustracoes/icone-estacao.png';

export interface Projeto {
  icone?: ImageMetadata;
  id: 'condominio' | 'pesquisas' | 'next' | 'bombas';
  n: string;
  titulo: string;
  resumo: string;
  status: 'ok' | 'dv';
  statusLabel: string;
  chips: string[];
  h2: string;
  h2Light: string;
  steps: { t: string; d: string }[];
  gainsLabel: string;
  gains: string[];
}

export const projetos: Projeto[] = [
  {
    id: 'condominio',
    icone: icoCondominio,
    n: '01',
    titulo: 'Gestor de Condomínio',
    resumo: 'Síndicos, moradores e porteiros, no computador e no celular',
    status: 'ok',
    statusLabel: 'Entregue',
    chips: ['Condomínio'],
    h2: 'O condomínio inteiro,',
    h2Light: 'no computador e no celular.',
    steps: [
      { t: 'Moradores', d: 'Cadastro pelo celular, aprovado pelo síndico' },
      { t: 'Ocorrências', d: 'Quadro de status e um apoio por apartamento' },
      { t: 'Reservas', d: 'Salão, churrasqueira e quadra, sem conflito de horário' },
      { t: 'Avisos', d: 'Por prédio, bloco ou apartamento, com leitura confirmada' },
      { t: 'Portaria', d: 'Visita com QR Code e aviso de encomenda na hora' },
    ],
    gainsLabel: 'Resultados',
    gains: [
      '8 de 8 etapas, até estar no ar',
      'Teste com condomínio de 600 apartamentos',
      '8 reservas ao mesmo tempo, só 1 aceita',
    ],
  },
  {
    id: 'pesquisas',
    icone: icoPesquisas,
    n: '02',
    titulo: 'Gestor de Pesquisas',
    resumo: 'Professores acompanham alunos, metas e prazos',
    status: 'ok',
    statusLabel: 'Entregue',
    chips: ['Universidade'],
    h2: 'Cada aluno acompanhado,',
    h2Light: 'sem perder prazo.',
    steps: [
      { t: 'Cadastrar', d: 'O professor cadastra, o aluno completa o perfil' },
      { t: 'Planejar', d: 'Metas e prazos, liberados etapa por etapa' },
      { t: 'Entregar', d: 'Trabalhos em PDF ou link do repositório de código' },
      { t: 'Acompanhar', d: 'Semáforo verde, amarelo e vermelho por aluno' },
      { t: 'Relatar', d: 'Por aluno ou da turma, prontos em segundos' },
    ],
    gainsLabel: 'Resultados',
    gains: [
      '4 versões em 3 meses',
      'Vários professores, cada um com seus alunos',
      'Um aluno nunca vê os dados de outro, testado',
    ],
  },
  {
    id: 'next',
    n: '03',
    titulo: 'Gestor NEXT',
    resumo: 'Nosso próprio sistema de gestão, do cliente ao caixa',
    status: 'ok',
    statusLabel: 'Entregue',
    chips: ['Uso interno'],
    h2: 'Nosso próprio sistema,',
    h2Light: 'do primeiro contato ao caixa.',
    steps: [
      { t: 'Comercial', d: 'Do primeiro contato ao contrato, que já cria o projeto' },
      { t: 'Orçamentos', d: 'A IA sugere divisão, custo e margem; sai em PDF' },
      { t: 'Projetos', d: 'Quadros, prazos e agenda com convite por e-mail' },
      { t: 'Financeiro', d: 'Entradas, saídas, fluxo de caixa e previsão' },
      { t: 'Aprovações', d: 'Orçamentos, despesas e contratações por votação' },
    ],
    gainsLabel: 'Resultados',
    gains: ['10 de 12 etapas concluídas', 'Validado e aprovado entre os sócios'],
  },
  {
    id: 'bombas',
    icone: icoBombas,
    n: '04',
    titulo: 'Manutenção de bombas',
    resumo: 'Bombas de condomínio acompanhadas e com manutenção em dia',
    status: 'dv',
    statusLabel: 'Em desenvolvimento',
    chips: ['Condomínio'],
    h2: 'Manutenção de bombas',
    h2Light: 'para condomínios.',
    steps: [
      { t: 'Cadastrar', d: 'Os equipamentos do prédio, num só lugar' },
      { t: 'Prevenir', d: 'Aviso da preventiva pelas horas de uso ou pelo calendário' },
      { t: 'Monitorar', d: 'Sensores e chamado automático se algo sai do normal' },
      { t: 'Registrar', d: 'Laudos exigidos pela norma de manutenção predial' },
      { t: 'Acompanhar', d: 'Painel simples para o zelador, no dia a dia' },
    ],
    gainsLabel: 'O condomínio ganha',
    gains: ['Menos prédio sem água', 'Preventiva no prazo', 'Laudos em dia'],
  },
];

export const projetoCase = {
  icone: icoEstacao,
  n: '05',
  titulo: 'Supervisão Inteligente',
  resumo: 'Assistente com IA para uma estação de abastecimento na Paraíba',
  statusLabel: 'Em desenvolvimento',
  chips: ['Saneamento'],
};
