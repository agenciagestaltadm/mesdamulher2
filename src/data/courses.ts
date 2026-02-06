export type CourseCategory = 'Saúde' | 'Empreendedorismo' | 'Oficina' | 'Curso' | 'Palestra';

export interface Course {
  id: string;
  nome: string;
  categoria: CourseCategory;
  data: string;
  horario: string;
  local: string;
  cargaHoraria?: string;
  vagas?: number;
  facilitador?: string;
  descricao: string;
}

export const courses: Course[] = [
  {
    id: 'emp-1',
    nome: 'Como fidelizar suas clientes para voltar e indicar sua empresa',
    categoria: 'Empreendedorismo',
    data: '2026-03-02',
    horario: '13:00 - 17:00',
    local: 'Curionópolis',
    vagas: 20,
    descricao:
      'Estratégias práticas de fidelização (atendimento, pós-venda, experiência, mensagens no momento certo e programas de indicação) para transformar clientes em promotoras do negócio.',
  },
  {
    id: 'emp-2',
    nome: 'CRM para empresas',
    categoria: 'Empreendedorismo',
    data: '2026-03-02',
    horario: '18:00 - 22:00',
    local: 'Curionópolis',
    vagas: 20,
    descricao:
      'Organização do funil e do relacionamento com clientes usando CRM (cadastro, histórico, lembretes, segmentação e automações simples) para vender mais e perder menos oportunidades.',
  },
  {
    id: 'emp-3',
    nome: 'Instagram para Negócios Locais',
    categoria: 'Empreendedorismo',
    data: '2026-03-03',
    horario: '13:00 - 17:00',
    local: 'Curionópolis',
    vagas: 20,
    descricao:
      'Como usar o Instagram para atrair clientes na sua cidade (perfil que vende, conteúdo, Reels, Stories, localização, destaques, calendário e boas práticas) para aumentar alcance e conversões.',
  },
  {
    id: 'emp-4',
    nome: 'Canais de Aquisição de Clientes',
    categoria: 'Empreendedorismo',
    data: '2026-03-03',
    horario: '18:00 - 22:00',
    local: 'Curionópolis',
    vagas: 80,
    descricao:
      'Principais canais para conquistar clientes (orgânico, parcerias, indicação, mídia paga, WhatsApp e marketplace) e como montar um plano com metas, testes e métricas.',
  },
  {
    id: 'emp-5',
    nome: 'Como usar o Tráfego Pago de Maneira Correta',
    categoria: 'Empreendedorismo',
    data: '2026-03-04',
    horario: '13:00 - 17:00',
    local: 'Curionópolis',
    vagas: 40,
    descricao:
      'Fundamentos para anunciar com segurança (objetivos, público, criativos, orçamento, métricas e otimização), evitando erros comuns e melhorando resultados.',
  },
  {
    id: 'emp-6',
    nome: 'Treinamento de Vendas',
    categoria: 'Empreendedorismo',
    data: '2026-03-04',
    horario: '18:00 - 22:00',
    local: 'Curionópolis',
    vagas: 80,
    descricao:
      'Técnicas de venda do atendimento ao fechamento (abordagem, diagnóstico, proposta, objeções, follow-up e pós-venda), com prática de roteiros para aumentar conversão.',
  },
  {
    id: 'emp-7',
    nome: 'Como iniciar um negócio do Zero',
    categoria: 'Empreendedorismo',
    data: '2026-03-05',
    horario: '13:00 - 17:00',
    local: 'Curionópolis',
    vagas: 40,
    descricao:
      'Como tirar a ideia do papel (validação, público-alvo, proposta de valor, precificação, custos, canais de venda e um plano simples de ação) com clareza e menos risco.',
  },
  {
    id: 'emp-8',
    nome: 'Oficina de catálogos digitais para lojas',
    categoria: 'Empreendedorismo',
    data: '2026-03-05',
    horario: '18:00 - 22:00',
    local: 'Curionópolis',
    vagas: 40,
    descricao:
      'Criação de catálogos digitais que vendem (organização de produtos, fotos, descrições, preços, combos, link de pedido e divulgação no WhatsApp/Instagram).',
  },
  {
    id: 'emp-9',
    nome: 'Oficina de Cardápios digitais para Alimentação',
    categoria: 'Empreendedorismo',
    data: '2026-03-05',
    horario: '13:00 - 17:00',
    local: 'Curionópolis',
    vagas: 20,
    descricao:
      'Montagem de cardápio digital completo (categorias, itens, adicionais, fotos, preços, promoções e link de pedido) para agilizar atendimento e aumentar ticket médio.',
  },
  {
    id: 'emp-10',
    nome: 'Oficina de Edição de vídeo e planejamento para redes sociais (4h)',
    categoria: 'Empreendedorismo',
    data: '2026-03-05',
    horario: '18:00 - 22:00',
    local: 'Curionópolis',
    vagas: 40,
    descricao:
      'Planejamento de conteúdo e edição de vídeos curtos (roteiro, captação, cortes, legendas, trilhas, formatos e calendário) com foco em consistência e resultado.',
  },
  {
    id: 'emp-11',
    nome: 'Oficina de Edição de vídeo e planejamento para redes sociais (8h)',
    categoria: 'Empreendedorismo',
    data: '2026-03-07',
    horario: '13:00 - 21:00',
    local: 'Curionópolis',
    vagas: 40,
    descricao:
      'Versão intensiva do treinamento para planejar e editar vídeos curtos com prática (roteiro, captação, edição, legendas, trilhas, formatos e calendário).',
  },
];

export const categoryColors: Record<CourseCategory, string> = {
  'Saúde': 'bg-category-saude',
  'Empreendedorismo': 'bg-category-empreendedorismo',
  'Oficina': 'bg-category-oficina',
  'Curso': 'bg-category-curso',
  'Palestra': 'bg-category-palestra'
};
