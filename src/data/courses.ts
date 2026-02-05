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
    id: '1',
    nome: 'Saúde Mental e Autocuidado',
    categoria: 'Saúde',
    data: '2025-03-05',
    horario: '09:00 - 12:00',
    local: 'Centro Comunitário de Curionópolis',
    cargaHoraria: '3 horas',
    vagas: 30,
    facilitador: 'Dra. Maria Santos',
    descricao: 'Aprenda técnicas de autocuidado e bem-estar emocional para o dia a dia.'
  },
  {
    id: '2',
    nome: 'Empreendedorismo Feminino: Primeiros Passos',
    categoria: 'Empreendedorismo',
    data: '2025-03-08',
    horario: '14:00 - 18:00',
    local: 'Secretaria da Mulher',
    cargaHoraria: '4 horas',
    vagas: 25,
    facilitador: 'Ana Paula Ferreira',
    descricao: 'Do sonho ao negócio: como iniciar sua jornada empreendedora.'
  },
  {
    id: '3',
    nome: 'Oficina de Artesanato em Crochê',
    categoria: 'Oficina',
    data: '2025-03-10',
    horario: '09:00 - 12:00',
    local: 'Casa da Cultura',
    cargaHoraria: '3 horas',
    vagas: 20,
    facilitador: 'Dona Francisca Oliveira',
    descricao: 'Aprenda as técnicas básicas de crochê e crie peças únicas.'
  },
  {
    id: '4',
    nome: 'Palestra: Direitos da Mulher',
    categoria: 'Palestra',
    data: '2025-03-12',
    horario: '19:00 - 21:00',
    local: 'Auditório Municipal',
    cargaHoraria: '2 horas',
    facilitador: 'Dra. Juliana Costa - OAB',
    descricao: 'Conheça seus direitos e os recursos de proteção disponíveis.'
  },
  {
    id: '5',
    nome: 'Curso de Informática Básica',
    categoria: 'Curso',
    data: '2025-03-15',
    horario: '08:00 - 12:00',
    local: 'Telecentro Municipal',
    cargaHoraria: '4 horas',
    vagas: 15,
    facilitador: 'Prof. Carlos Mendes',
    descricao: 'Aprenda a usar computadores, internet e ferramentas digitais.'
  },
  {
    id: '6',
    nome: 'Saúde da Mulher: Prevenção e Cuidados',
    categoria: 'Saúde',
    data: '2025-03-17',
    horario: '14:00 - 17:00',
    local: 'UBS Central',
    cargaHoraria: '3 horas',
    vagas: 40,
    facilitador: 'Equipe de Saúde Municipal',
    descricao: 'Orientações sobre prevenção de doenças e cuidados com a saúde feminina.'
  },
  {
    id: '7',
    nome: 'Oficina de Culinária Regional',
    categoria: 'Oficina',
    data: '2025-03-19',
    horario: '09:00 - 13:00',
    local: 'Cozinha Comunitária',
    cargaHoraria: '4 horas',
    vagas: 15,
    facilitador: 'Chef Mariana Ribeiro',
    descricao: 'Prepare pratos típicos da região com técnicas profissionais.'
  },
  {
    id: '8',
    nome: 'Finanças Pessoais para Mulheres',
    categoria: 'Empreendedorismo',
    data: '2025-03-22',
    horario: '14:00 - 17:00',
    local: 'Secretaria da Mulher',
    cargaHoraria: '3 horas',
    vagas: 30,
    facilitador: 'Economista Patrícia Almeida',
    descricao: 'Organize suas finanças, economize e planeje seu futuro financeiro.'
  },
  {
    id: '9',
    nome: 'Palestra: Empoderamento Feminino',
    categoria: 'Palestra',
    data: '2025-03-25',
    horario: '19:00 - 21:00',
    local: 'Auditório Municipal',
    cargaHoraria: '2 horas',
    facilitador: 'Palestrante Luciana Gomes',
    descricao: 'Uma conversa inspiradora sobre força, resiliência e conquistas femininas.'
  },
  {
    id: '10',
    nome: 'Oficina de Maquiagem e Autoestima',
    categoria: 'Oficina',
    data: '2025-03-27',
    horario: '14:00 - 17:00',
    local: 'Centro Comunitário de Curionópolis',
    cargaHoraria: '3 horas',
    vagas: 25,
    facilitador: 'Maquiadora Fernanda Silva',
    descricao: 'Técnicas de maquiagem para valorizar sua beleza natural.'
  },
  {
    id: '11',
    nome: 'Curso de Marketing Digital',
    categoria: 'Curso',
    data: '2025-03-29',
    horario: '08:00 - 12:00',
    local: 'Telecentro Municipal',
    cargaHoraria: '4 horas',
    vagas: 20,
    facilitador: 'Especialista Renata Souza',
    descricao: 'Aprenda a divulgar seu negócio nas redes sociais.'
  },
  {
    id: '12',
    nome: 'Encerramento: Celebração do Mês da Mulher',
    categoria: 'Palestra',
    data: '2025-03-31',
    horario: '18:00 - 21:00',
    local: 'Praça Central de Curionópolis',
    facilitador: 'Diversas convidadas',
    descricao: 'Show cultural, homenagens e celebração de todas as participantes.'
  }
];

export const categoryColors: Record<CourseCategory, string> = {
  'Saúde': 'bg-category-saude',
  'Empreendedorismo': 'bg-category-empreendedorismo',
  'Oficina': 'bg-category-oficina',
  'Curso': 'bg-category-curso',
  'Palestra': 'bg-category-palestra'
};
