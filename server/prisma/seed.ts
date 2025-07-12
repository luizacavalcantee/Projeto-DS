import { PrismaClient, TeachingStage, ChallengeCategory } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

type ChallengeSeedData = {
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
  idealAge: TeachingStage[];
  neededResources: string;
  category: ChallengeCategory; 
  photoUrl: string;
  ongId: number;
  managerId: number;
  checkpoint1Title: string;
  checkpoint2Title: string;
  checkpoint3Title: string;
};

async function seed() {
  const saltRounds = 6;

  //  ---------------- SEED SCHOOL MANAGERS ---------------------

  await prisma.checkpoint.deleteMany();
  console.log('Deleted existing checkpoints.');

  await prisma.challenge.deleteMany();
  console.log('Deleted existing challenges.');

  await prisma.schoolManager.deleteMany();
  console.log('Deleted existing school managers.');

  await prisma.ong.deleteMany();
  console.log('Deleted existing ONGs.');

  await prisma.schoolManager.createMany({
    data: [
      {
        id: 1,
        fullName: 'ROSANGELA GUSMAO DE SOUZA CORDEIRO',
        phoneNumber: '(81) 91234-5678',
        email: 'rosangela.gusmao@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'MILTON ALMEIDA DOS SANTOS',
        teachingStages: [TeachingStage.ENSINO_FUNDAMENTAL_I],
        estimatedStudents: 144,
        inepCode: '26419726',
        cep: '51200-000',
        address: 'ITAUBA 2',
        addressNumber: '227',
        addressComplement: 'Bloco A',
        schoolNumber: '424',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-1.jpg',
      },
      {
        id: 2,
        fullName: 'ALEXANDRA LIMA DA PAIXAO STURIALE',
        phoneNumber: '(81) 98765-4321',
        email: 'alexandra.lima@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'NOSSA SENHORA DA PENHA',
        teachingStages: [TeachingStage.EDUCACAO_INFANTIL],
        estimatedStudents: 225,
        inepCode: '26134049',
        cep: '51020-100',
        address: 'FRANCISCO DE BARROS BARRETO',
        addressNumber: '109',
        addressComplement: 'Sala 2',
        schoolNumber: '150',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-2.jpg',
      },
      {
        id: 3,
        fullName: 'WALESKA BASTOS BARROS',
        phoneNumber: '(81) 99888-1122',
        email: 'waleska.barros@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'NOVO PINA',
        teachingStages: [
          TeachingStage.ENSINO_FUNDAMENTAL_I,
          TeachingStage.ENSINO_FUNDAMENTAL_II,
        ],
        estimatedStudents: 455,
        inepCode: '26119994',
        cep: '51011-000',
        address: 'EURICO VITRUVIO',
        addressNumber: '236',
        addressComplement: 'Prédio novo',
        schoolNumber: '112',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-3.jpg',
      },
      {
        id: 4,
        fullName: 'ELMA MARIA DOS PRAZERES MOTA CAVALCANTI',
        phoneNumber: '(81) 99111-2233',
        email: 'elma.mota@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'OSWALDO LIMA FILHO',
        teachingStages: [TeachingStage.ENSINO_FUNDAMENTAL_II],
        estimatedStudents: 624,
        inepCode: '26125510',
        cep: '51011-001',
        address: 'ENGENHEIRO DOMINGOS FERREIRA',
        addressNumber: '1040',
        addressComplement: 'Subsolo',
        schoolNumber: '121',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-4.jpg',
      },
      {
        id: 5,
        fullName: 'EVELINE BEZERRIL CAMPOS FELL',
        phoneNumber: '(81) 99222-3344',
        email: 'eveline.fell@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'PAIS E FILHOS',
        teachingStages: [TeachingStage.EDUCACAO_INFANTIL],
        estimatedStudents: 351,
        inepCode: '26125528',
        cep: '51200-001',
        address: 'DANCING DAYS',
        addressNumber: '21',
        schoolNumber: '070',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-5.jpg',
      },
      {
        id: 6,
        fullName: 'ROSINALVA MONTEIRO DA SILVA',
        phoneNumber: '(81) 99333-4455',
        email: 'rosinalva.silva@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'PASTOR JOSE MUNGUBA SOBRINHO',
        teachingStages: [TeachingStage.ENSINO_FUNDAMENTAL_I],
        estimatedStudents: 295,
        inepCode: '26157888',
        cep: '51190-000',
        address: 'SILVA JARDIM',
        addressNumber: '145',
        schoolNumber: '348',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-6.jpg',
      },
      {
        id: 7,
        fullName: 'OZANIRA MARIA PEREIRA GOMES DA SILVA',
        phoneNumber: '(81) 99444-5566',
        email: 'ozanira.silva@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'PAZ E AMOR',
        teachingStages: [TeachingStage.EDUCACAO_INFANTIL],
        estimatedStudents: 134,
        inepCode: '26187957',
        cep: '51210-000',
        address: 'JORNALISTA EDSOU REGIS',
        addressNumber: '216',
        schoolNumber: '491',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-7.jpg',
      },
      {
        id: 8,
        fullName: 'FLORISMAM LIMA DE OLIVEIRA',
        phoneNumber: '(81) 99555-6677',
        email: 'florismam.lima@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'PINTOR LULA CARDOSO AYRES',
        teachingStages: [TeachingStage.ENSINO_FUNDAMENTAL_II],
        estimatedStudents: 299,
        inepCode: '26132249',
        cep: '51191-000',
        address: 'DR ALVARO FERRAZ',
        addressNumber: '594',
        schoolNumber: '106',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-8.jpg',
      },
      {
        id: 9,
        fullName: 'CINTHIA FERREIRA DA SILVA',
        phoneNumber: '(81) 99666-7788',
        email: 'cinthia.ferreira@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'POETA JOAO CABRAL DE MELO NETO',
        teachingStages: [TeachingStage.ENSINO_FUNDAMENTAL_I],
        estimatedStudents: 305,
        inepCode: '26168138',
        cep: '51012-000',
        address: 'ENCANTA MOCA',
        addressNumber: '377',
        schoolNumber: '928',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-9.jpg',
      },
      {
        id: 10,
        fullName: 'MARIA ANDREZA CABRAL DA SILVA',
        phoneNumber: '(81) 99777-8899',
        email: 'andreza.cabral@escola.pe.gov.br',
        password: await hash('senha123', saltRounds),
        schoolName: 'POETA PAULO BANDEIRA DA CRUZ',
        teachingStages: [
          TeachingStage.EDUCACAO_INFANTIL,
          TeachingStage.ENSINO_FUNDAMENTAL_I,
          TeachingStage.ENSINO_FUNDAMENTAL_II,
        ],
        estimatedStudents: 485,
        inepCode: '26125544',
        cep: '51500-000',
        address: 'DAS PANELAS',
        addressNumber: '28',
        schoolNumber: '164',
        schoolImageUrl: 'https://exemplo.com/imagem-escola-10.jpg',
      },
    ],
  });
  console.log('School Managers created successfully');

  //   ---------------- SEED ONGs --------------------------------

  await prisma.ong.createMany({
    data: [
      {
        id: 1,
        name: 'ONG Verde Futuro',
        email: 'ong1@gmail.com',
        password: await hash('123456', saltRounds),
        description:
          'Promove a conservação ambiental e educação sustentável em comunidades urbanas.',
        contactPhone: null,
        instagramLink: null,
        facebookLink: null,
        site: null,
        coverPhotoUrl: null,
        logoPhotoUrl: null,
      },
      {
        id: 2,
        name: 'Ong Água Boa',
        email: 'ong3@gmail.com',
        password: await hash('123456', saltRounds),
        description: 'Somos uma ONG que preza pelo cuidado da água.',
        contactPhone: null,
        instagramLink: null,
        facebookLink: null,
        site: null,
        coverPhotoUrl: null,
        logoPhotoUrl: null,
      },
    ],
  });
  console.log('ONGs created successfully');

  //   ---------------- SEED Challenges --------------------------

  const challengesToCreate : ChallengeSeedData[] = [
    {
      title: 'Horta Escolar Comunitária',
      description:
        'Criar e manter uma horta orgânica na escola, ensinando sobre segurança alimentar, compostagem e trabalho em equipe. Os alimentos colhidos serão doados para a comunidade.',
      location: 'Área externa da Escola Municipal Ariano Suassuna',
      startDate: new Date('2025-08-01T09:00:00.000Z'),
      endDate: new Date('2025-12-15T17:00:00.000Z'),
      idealAge: ['ENSINO_FUNDAMENTAL_I'],
      neededResources:
        'Sementes de hortaliças, terra adubada, pás, rastelos, regadores, material para composteira.',
      category: 'MEIO_AMBIENTE',
      photoUrl:
        'https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg',
      ongId: 1,
      managerId: 1,
      checkpoint1Title: 'Planejamento e Preparação dos Canteiros',
      checkpoint2Title: 'Plantio das Sementes e Início da Compostagem',
      checkpoint3Title: 'Manutenção, Colheita e Distribuição dos Alimentos',
    },
    {
      title: 'Guardiões da Memória Local',
      description:
        'Projeto de pesquisa e documentação da história do bairro. Os alunos irão entrevistar moradores antigos, coletar fotos e criar um documentário ou exposição final.',
      location: 'Bairro de Santo Antônio, Recife',
      startDate: new Date('2025-09-02T09:00:00.000Z'),
      endDate: new Date('2025-11-28T17:00:00.000Z'),
      idealAge: ['ENSINO_MEDIO'],
      neededResources:
        'Gravadores de áudio/vídeo (pode ser celular), câmeras fotográficas, software de edição, espaço para exposição.',
      category: 'CULTURA',
      photoUrl:
        'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg',
      ongId: 2,
      managerId: 2,
      checkpoint1Title: 'Treinamento em Técnicas de Entrevista e Pesquisa',
      checkpoint2Title: 'Coleta de Depoimentos e Material Histórico em Campo',
      checkpoint3Title: 'Edição do Material e Montagem da Exposição Final',
    },
    {
      title: 'Olimpíada de Robótica Sustentável',
      description:
        'Construir robôs funcionais a partir de lixo eletrônico e materiais recicláveis para competir em desafios de agilidade e tarefas.',
      location:
        'Laboratório de Informática da Escola Técnica Estadual Cícero Dias',
      startDate: new Date('2025-08-15T14:00:00.000Z'),
      endDate: new Date('2025-11-20T18:00:00.000Z'),
      idealAge: ['ENSINO_MEDIO'],
      neededResources:
        'Sucata eletrônica (motores, fios, placas), kits de arduíno básicos, ferramentas (ferro de solda, alicates), baterias.',
      category: 'TECNOLOGIA',
      photoUrl:
        'https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg',
      ongId: 1,
      managerId: 3,
      checkpoint1Title:
        'Oficina de Eletrônica Básica e Desmontagem de Equipamentos',
      checkpoint2Title: 'Construção dos Protótipos dos Robôs',
      checkpoint3Title: 'Competição Final e Apresentação dos Projetos',
    },
    {
      title: 'Campanha de Saúde e Bem-Estar',
      description:
        'Criar e divulgar uma campanha de conscientização sobre saúde mental e hábitos saudáveis (alimentação e exercícios) para a comunidade escolar.',
      location: 'Escola de Referência em Ensino Médio Ginásio Pernambucano',
      startDate: new Date('2025-10-01T09:00:00.000Z'),
      endDate: new Date('2025-10-31T17:00:00.000Z'),
      idealAge: ['ENSINO_MEDIO'],
      neededResources:
        'Material de papelaria para cartazes, acesso a redes sociais, palestrates voluntários (nutricionistas, psicólogos).',
      category: 'SAUDE',
      photoUrl:
        'https://images.pexels.com/photos/4098150/pexels-photo-4098150.jpeg',
      ongId: 2,
      managerId: 4,
      checkpoint1Title: 'Pesquisa e Definição dos Temas da Campanha',
      checkpoint2Title: 'Criação do Material de Divulgação (Online e Offline)',
      checkpoint3Title: 'Semana da Saúde: Palestras e Atividades Práticas',
    },
    {
      title: 'Inclusão Digital para a Terceira Idade',
      description:
        'Alunos voluntários irão ensinar noções básicas de informática e uso de smartphones para idosos da comunidade, promovendo a cidadania e a conexão entre gerações.',
      location: 'Centro Comunitário do Pina',
      startDate: new Date('2025-08-05T14:00:00.000Z'),
      endDate: new Date('2025-10-28T16:00:00.000Z'),
      idealAge: ['ENSINO_MEDIO'],
      neededResources:
        'Laboratório de informática com acesso à internet, cartilha didática impressa, lanche para os participantes.',
      category: 'CIDADANIA',
      photoUrl:
        'https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg',
      ongId: 1,
      managerId: 1,
      checkpoint1Title: 'Capacitação dos Alunos Voluntários como Monitores',
      checkpoint2Title: 'Realização das Aulas Semanais de Informática',
      checkpoint3Title: 'Evento de Encerramento e Entrega de Certificados',
    },
    {
      title: 'Festival de Curtas com Celular',
      description:
        "Produzir curtas-metragens de até 5 minutos usando apenas celulares, com o tema 'Minha Realidade'. O festival visa estimular a criatividade e o olhar crítico dos jovens.",
      location: 'Online / Escola de Referência em Ensino Médio Oliveira Lima',
      startDate: new Date('2025-09-10T10:00:00.000Z'),
      endDate: new Date('2025-11-30T19:00:00.000Z'),
      idealAge: ['ENSINO_FUNDAMENTAL_II', 'ENSINO_MEDIO'],
      neededResources:
        'Celulares com câmera, aplicativos gratuitos de edição de vídeo, projetor para a noite de estreia.',
      category: 'CULTURA',
      photoUrl:
        'https://images.pexels.com/photos/7235899/pexels-photo-7235899.jpeg',
      ongId: 1,
      managerId: 5,
      checkpoint1Title: 'Oficina de Roteiro e Técnicas de Filmagem com Celular',
      checkpoint2Title: 'Período de Gravação e Edição dos Curtas',
      checkpoint3Title: 'Noite de Exibição e Premiação dos Melhores Filmes',
    },
    {
      title: 'Torneio Esportivo Interescolar Pela Paz',
      description:
        'Organizar um torneio de futsal e vôlei entre escolas da região para promover a integração, o respeito e o espírito esportivo.',
      location: 'Ginásio de Esportes Geraldo Magalhães (Geraldão)',
      startDate: new Date('2025-10-20T08:00:00.000Z'),
      endDate: new Date('2025-10-25T18:00:00.000Z'),
      idealAge: ['ENSINO_FUNDAMENTAL_I', 'ENSINO_MEDIO'],
      neededResources:
        'Uso da quadra, bolas, coletes, troféus e medalhas, equipe de arbitragem voluntária.',
      category: 'ESPORTE',
      photoUrl:
        'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
      ongId: 2,
      managerId: 6,
      checkpoint1Title: 'Inscrição das Equipes e Divulgação do Regulamento',
      checkpoint2Title: 'Sorteio das Chaves e Organização da Tabela de Jogos',
      checkpoint3Title: 'Realização dos Jogos e Cerimônia de Premiação',
    },
    {
      title: 'Alfabetização Financeira para Jovens',
      description:
        'Workshops interativos sobre como gerenciar o dinheiro, poupar, investir e evitar dívidas, preparando os jovens para a vida adulta.',
      location: 'Auditório da Faculdade de Administração do Recife (FAR)',
      startDate: new Date('2025-08-18T18:30:00.000Z'),
      endDate: new Date('2025-09-22T20:30:00.000Z'),
      idealAge: ['ENSINO_MEDIO', 'ENSINO_FUNDAMENTAL_II'],
      neededResources:
        'Sala de aula ou auditório, material didático (apostilas), palestrantes voluntários da área de finanças.',
      category: 'EDUCACAO',
      photoUrl:
        'https://images.pexels.com/photos/7821516/pexels-photo-7821516.jpeg',
      ongId: 1,
      managerId: 7,
      checkpoint1Title: 'Workshop 1: Orçamento Pessoal e Controle de Gastos',
      checkpoint2Title: 'Workshop 2: Poupança e Introdução a Investimentos',
      checkpoint3Title: 'Workshop 3: Consumo Consciente e Prevenção de Dívidas',
    },
    {
      title: 'Acessibilidade em Foco',
      description:
        'Mapear a acessibilidade (ou a falta dela) no entorno da escola, identificar problemas em calçadas, rampas e comércios e propor soluções para a subprefeitura.',
      location: 'Entorno da Escola Professor Cândido Duarte, Boa Viagem',
      startDate: new Date('2025-09-03T09:00:00.000Z'),
      endDate: new Date('2025-10-15T17:00:00.000Z'),
      idealAge: ['ENSINO_MEDIO'],
      neededResources:
        'Trena, pranchetas, celulares para fotos, software para elaboração de mapas e relatórios.',
      category: 'INCLUSAO',
      photoUrl:
        'https://images.pexels.com/photos/7718641/pexels-photo-7718641.jpeg',
      ongId: 2,
      managerId: 8,
      checkpoint1Title: 'Estudo sobre as Normas de Acessibilidade (NBR 9050)',
      checkpoint2Title: 'Mapeamento em Campo: Coleta de Dados e Fotos',
      checkpoint3Title:
        'Elaboração e Apresentação do Relatório Final de Sugestões',
    },
    {
      title: 'Recicla-Arte: Transformando Lixo em Luxo',
      description:
        'Oficinas de arte para criar esculturas, objetos de decoração e brinquedos a partir de materiais que seriam descartados, como garrafas PET, papelão e latas.',
      location: 'Pátio da Escola Municipal da Mangabeira',
      startDate: new Date('2025-08-20T13:00:00.000Z'),
      endDate: new Date('2025-10-22T15:00:00.000Z'),
      idealAge: ['ENSINO_FUNDAMENTAL_II'],
      neededResources:
        'Material reciclável coletado pelos alunos, cola quente, tesouras, tintas, pincéis.',
      category: 'SUSTENTABILIDADE',
      photoUrl:
        'https://images.pexels.com/photos/3913426/pexels-photo-3913426.jpeg',
      ongId: 1,
      managerId: 9,
      checkpoint1Title:
        'Campanha de Coleta e Separação de Materiais Recicláveis',
      checkpoint2Title: 'Oficinas de Criação e Produção das Peças de Arte',
      checkpoint3Title: 'Exposição Final das Obras para a Comunidade Escolar',
    },
  ];

  for (const challengeData of challengesToCreate) {
    const {
      checkpoint1Title,
      checkpoint2Title,
      checkpoint3Title,
      ongId,
      managerId,
      ...restOfChallengeData
    } = challengeData;

    await prisma.challenge.create({
      data: {
        ...restOfChallengeData,
        ong: {
          connect: { id: ongId }
        },
        schoolManager: {
          connect: { id: managerId }
        },
        checkpoints: {
          create: [
            { title: checkpoint1Title, checkpointNumber: 1 },
            { title: checkpoint2Title, checkpointNumber: 2 },
            { title: checkpoint3Title, checkpointNumber: 3 },
          ],
        },
      },
    });
  }

  console.log('Challenges created successfully');
}
seed().then(() => {
  console.log('Database successfully seeded');
  prisma.$disconnect();
});
