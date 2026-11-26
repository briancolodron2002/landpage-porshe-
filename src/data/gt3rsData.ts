export interface HotspotItem {
  id: string;
  name: string;
  category: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  summary: string;
  specHighlight: string;
  detailImage: string;
  detailAlt: string;
}

export interface ShowroomAngle {
  id: 'three-quarter' | 'front' | 'side' | 'rear';
  label: string;
  shortLabel: string;
  image: string;
  alt: string;
  description: string;
  hotspots: HotspotItem[];
}

export interface InteriorHotspot {
  id: string;
  name: string;
  area: string;
  x: number;
  y: number;
  description: string;
  specNote: string;
}

export interface SpecRow {
  label: string;
  value: string;
  note?: string;
}

export interface SpecCategory {
  id: string;
  index: string;
  title: string;
  rows: SpecRow[];
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  category: 'exterior' | 'interior' | 'detalhes';
  categoryLabel: string;
  image: string;
  alt: string;
  aspect: 'wide' | 'square';
}

export const VEHICLE_IDENTITY = {
  brand: 'Porsche',
  model: '911 GT3 RS',
  generation: '992',
  version: 'Pacote Weissach',
  year: 2024,
  colorName: 'Ice Grey Metallic',
  colorPt: 'Cinza Gelo Metálico',
  colorHex: '#BCC3CA',
  accentColorHex: '#F2C94C',
};

export const IMAGES = {
  hero: '/src/assets/images/hero_gt3rs_studio_1795718286144.jpg',
  front: '/src/assets/images/angle_front_gt3rs_1795718287746.jpg',
  side: '/src/assets/images/angle_side_gt3rs_1795718288900.jpg',
  rear: '/src/assets/images/angle_rear_gt3rs_1795718289883.jpg',
  interior: '/src/assets/images/interior_cockpit_gt3rs_1795718290063.jpg',
  wheel: '/src/assets/images/detail_wheel_pccb_1795718291633.jpg',
  wing: '/src/assets/images/detail_wing_aero_1795718290529.jpg',
  engine: '/src/assets/images/detail_engine_boxer_1795718291275.jpg',
};

export const SHOWROOM_ANGLES: ShowroomAngle[] = [
  {
    id: 'three-quarter',
    label: 'Perspectiva Frontal 3/4',
    shortLabel: 'Frontal 3/4',
    image: IMAGES.hero,
    alt: 'Porsche 911 GT3 RS 2024 em Ice Grey Metallic na perspectiva frontal três quartos em estúdio escuro',
    description:
      'Proporções alargadas da geração 992 com capô em CFRP aparente, entradas NACA e asa traseira swan-neck.',
    hotspots: [
      {
        id: 'hood-sduct',
        name: 'Capô em CFRP e Conceito S-Duct',
        category: 'Aerodinâmica Dianteira',
        x: 66,
        y: 52,
        summary:
          'O radiador central inclinado ocupa o compartimento dianteiro tradicional e expele o ar quente por duas saídas em fibra de carbono aparente no capô.',
        specHighlight: 'Fluxo otimizado para radiador único central',
        detailImage: IMAGES.front,
        detailAlt: 'Vista frontal do capô em fibra de carbono e saídas de ar S-Duct do Porsche 911 GT3 RS',
      },
      {
        id: 'headlights-matrix',
        name: 'Faróis LED Matrix Escurecidos',
        category: 'Iluminação',
        x: 54,
        y: 56,
        summary:
          'Assinatura luminosa de quatro pontos integrada aos para-lamas alargados com facho adaptativo de alta precisão.',
        specHighlight: 'Tecnologia PDLS Plus em máscara negra',
        detailImage: IMAGES.front,
        detailAlt: 'Faróis LED Matrix de quatro pontos do Porsche 911 GT3 RS',
      },
      {
        id: 'front-wheel-pccb',
        name: 'Rodas Forjadas em Magnésio e Freios PCCB',
        category: 'Conjunto Rodante',
        x: 45,
        y: 67,
        summary:
          'Rodas forjadas de cubo rápido (center-lock) calçadas com pneus 275/35 ZR20 na dianteira, combinadas aos discos cerâmicos Porsche Ceramic Composite Brake.',
        specHighlight: 'Discos dianteiros de 410 mm · Pinças de 6 pistões',
        detailImage: IMAGES.wheel,
        detailAlt: 'Detalhe da roda forjada Satin Black com pinça amarela PCCB e extrator no para-lama',
      },
      {
        id: 'mirrors-aero',
        name: 'Retrovisores com Capa em Carbono',
        category: 'Acabamento Weissach',
        x: 34,
        y: 44,
        summary:
          'Carcaça superior em fibra de carbono entrelaçada aparente, desenhada para reduzir turbulência lateral junto às janelas.',
        specHighlight: 'Fibra de carbono aparente · Pacote Weissach',
        detailImage: IMAGES.side,
        detailAlt: 'Perfil dos retrovisores em carbono e linha lateral do Porsche 911 GT3 RS',
      },
    ],
  },
  {
    id: 'front',
    label: 'Vista Dianteira Direta',
    shortLabel: 'Dianteira',
    image: IMAGES.front,
    alt: 'Vista dianteira direta do Porsche 911 GT3 RS 2024 em Ice Grey Metallic',
    description:
      'Bitola dianteira de 1.630 mm, splitter frontal alargado e abertura contínua do radiador central.',
    hotspots: [
      {
        id: 'front-radiator-intake',
        name: 'Entrada Central do Radiador Único',
        category: 'Arrefecimento de Pista',
        x: 50,
        y: 68,
        summary:
          'Substitui o arranjo de três radiadores para liberar espaço lateral a elementos aerodinâmicos ativos dianteiros.',
        specHighlight: 'Largura total sem retrovisores: 1.900 mm',
        detailImage: IMAGES.front,
        detailAlt: 'Grade frontal inferior e splitter dianteiro do Porsche 911 GT3 RS',
      },
      {
        id: 'front-matrix-left',
        name: 'Conjunto Óptico LED Matrix',
        category: 'Iluminação',
        x: 33,
        y: 51,
        summary:
          'Módulos LED de quatro pontos integrados ao perfil aerodinâmico dos para-lamas dianteiros em CFRP.',
        specHighlight: 'Quatro pontos de rodagem diurna',
        detailImage: IMAGES.hero,
        detailAlt: 'Detalhe do farol LED Matrix no para-lama dianteiro',
      },
      {
        id: 'front-louvers-top',
        name: 'Extratores de Caixa de Roda',
        category: 'Aerodinâmica',
        x: 68,
        y: 41,
        summary:
          'Aletas funcionais sobre os para-lamas aliviam a sobrepressão gerada pelo giro das rodas dianteiras em alta velocidade.',
        specHighlight: 'Contribuição direta nos 409 kg a 200 km/h',
        detailImage: IMAGES.wheel,
        detailAlt: 'Extratores em fibra de carbono sobre a caixa de roda dianteira',
      },
    ],
  },
  {
    id: 'side',
    label: 'Perfil Lateral Completo',
    shortLabel: 'Lateral',
    image: IMAGES.side,
    alt: 'Perfil lateral completo do Porsche 911 GT3 RS 2024 em Ice Grey Metallic',
    description:
      'Silhueta 911 com aletas de teto para direcionamento térmico, entre-eixos de 2.457 mm e asa superior ao teto.',
    hotspots: [
      {
        id: 'side-fender-louver',
        name: 'Aletas Aerodinâmicas no Para-lama',
        category: 'Fluxo Lateral',
        x: 25,
        y: 44,
        summary:
          'Direcionam o fluxo de ar ao longo das laterais da carroceria com menor arrasto turbulento para os radiadores traseiros.',
        specHighlight: 'Aletas integradas em CFRP',
        detailImage: IMAGES.wheel,
        detailAlt: 'Extrator lateral do para-lama e conjunto roda/freio dianteiro',
      },
      {
        id: 'side-roof-fins',
        name: 'Defletores de Teto em CFRP',
        category: 'Gestão Térmica',
        x: 61,
        y: 35,
        summary:
          'Duas lâminas no teto em fibra de carbono desviam o ar aquecido que sai do capô dianteiro para fora da admissão do motor traseiro.',
        specHighlight: 'Teto leve em CFRP · Pacote Weissach',
        detailImage: IMAGES.wing,
        detailAlt: 'Detalhe do teto em carbono e suporte swan-neck da asa traseira',
      },
      {
        id: 'side-rear-wheel',
        name: 'Eixo Traseiro 21" e Esterçamento Ativo',
        category: 'Dinâmica de Chassi',
        x: 75,
        y: 66,
        summary:
          'Rodas traseiras de 21 polegadas com pneus 335/30 ZR21 e eixo traseiro direcional para máxima agilidade em curvas de alta.',
        specHighlight: 'Pneus 335/30 ZR21 · Discos traseiros 390 mm',
        detailImage: IMAGES.wheel,
        detailAlt: 'Conjunto de roda forjada Satin Black e freio PCCB',
      },
    ],
  },
  {
    id: 'rear',
    label: 'Perspectiva Traseira 3/4',
    shortLabel: 'Traseira 3/4',
    image: IMAGES.rear,
    alt: 'Perspectiva traseira três quartos do Porsche 911 GT3 RS 2024 em Ice Grey Metallic',
    description:
      'Asa traseira bipartida com sistema DRS hidráulico, faixa luminosa contínua e difusor traseiro em fibra de carbono.',
    hotspots: [
      {
        id: 'rear-drs-wing',
        name: 'Asa Traseira Swan-Neck com DRS',
        category: 'Aerodinâmica Ativa',
        x: 66,
        y: 25,
        summary:
          'Suportes em pescoço de cisne posicionados acima do perfil principal. O elemento superior ajusta hidraulicamente o ângulo (DRS) para reduzir arrasto em retas.',
        specHighlight: 'Até 860 kg de downforce total a 285 km/h',
        detailImage: IMAGES.wing,
        detailAlt: 'Detalhe do atuador hidráulico DRS e suportes swan-neck em alumínio e carbono',
      },
      {
        id: 'rear-lightbar',
        name: 'Lanterna Traseira Contínua LED',
        category: 'Assinatura Traseira',
        x: 62,
        y: 52,
        summary:
          'Faixa luminosa tridimensional integrada à carroceria larga traseira, emoldurando o emblema Porsche em acabamento escurecido.',
        specHighlight: 'Iluminação LED integral geração 992',
        detailImage: IMAGES.engine,
        detailAlt: 'Detalhe da lanterna traseira contínua e entrada de ar do motor',
      },
      {
        id: 'rear-titanium-exhaust',
        name: 'Escapamento Central em Titânio e Difusor',
        category: 'Powertrain & Aero',
        x: 70,
        y: 74,
        summary:
          'Saída dupla central leve sobre difusor em CFRP projetado para acelerar o fluxo sob o assoalho e estabilizar a traseira.',
        specHighlight: 'Motor Boxer 4.0L aspirado · 9.000 rpm',
        detailImage: IMAGES.engine,
        detailAlt: 'Saída dupla de escapamento central e difusor traseiro em carbono',
      },
    ],
  },
];

export const INTERIOR_HOTSPOTS: InteriorHotspot[] = [
  {
    id: 'steering-wheel',
    name: 'Volante GT em Race-Tex com 4 Seletores',
    area: 'Posto de Condução',
    x: 36,
    y: 54,
    description:
      'Revestido em Race-Tex com marcação central amarela às 12 horas e quatro comandos rotativos dedicados diretamente ao acerto de pista: modos de condução, amortecimento PASM, diferencial PTV+ e controle de tração/estabilidade (TC/ESC).',
    specNote: 'Botão dedicado DRS integrado ao volante',
  },
  {
    id: 'instrument-cluster',
    name: 'Painel com Tacômetro Central até 9.000 rpm',
    area: 'Instrumentação',
    x: 36,
    y: 34,
    description:
      'Conta-giros analógico central ladeado por duas telas digitais de alta definição com modo Track Screen, que exibe apenas pressão dos pneus, temperatura de óleo, água e marchas recomendadas.',
    specNote: 'Corte de giros a 9.000 rpm · Potência máxima a 8.500 rpm',
  },
  {
    id: 'pcm-display',
    name: 'Central Multimídia PCM e Telemetria',
    area: 'Conectividade & Pista',
    x: 58,
    y: 38,
    description:
      'Tela sensível ao toque de 10,9 polegadas integrada ao painel com Porsche Track Precision App para registro de voltas, setores e forças G em autódromos.',
    specNote: 'Cronômetro analógico Sport Chrono no topo do painel',
  },
  {
    id: 'center-console',
    name: 'Console em Carbono e Seletor PDK',
    area: 'Transmissão',
    x: 59,
    y: 66,
    description:
      'Alavanca mecânica específica da linha GT para acionamento manual ou automático da caixa de dupla embreagem PDK de 7 marchas com relações curtas.',
    specNote: 'Trocas sem interrupção de torque',
  },
  {
    id: 'bucket-seats',
    name: 'Bancos Concha Integrais em CFRP',
    area: 'Ergonomia & Segurança',
    x: 49,
    y: 86,
    description:
      'Estrutura em plástico reforçado com fibra de carbono (CFRP) com apoio lateral pronunciado, revestimento perfurado em Race-Tex e compatibilidade com cintos multiponto de competição.',
    specNote: 'Redução de peso estrutural na cabine',
  },
];

export const ENGINEERING_CHAPTERS = [
  {
    id: 'aero',
    index: '01',
    kicker: 'Aerodinâmica Ativa',
    title: 'Pressão aerodinâmica de competição sob controle hidráulico.',
    body: 'Com radiador central único no lugar do porta-malas dianteiro, o fluxo de ar alimenta aberturas ativas sob o assoalho e elementos móveis na asa traseira swan-neck. Em alta velocidade, o sistema atinge até 860 kg de downforce — o triplo de um 911 GT3 convencional.',
    metrics: [
      { label: 'Downforce a 200 km/h', value: '409 kg' },
      { label: 'Downforce a 285 km/h', value: '860 kg' },
      { label: 'Sistema DRS', value: 'Ativo' },
    ],
    image: IMAGES.wing,
    imageAlt: 'Asa traseira em fibra de carbono swan-neck com atuador DRS do Porsche 911 GT3 RS',
  },
  {
    id: 'powertrain',
    index: '02',
    kicker: 'Motorização & Transmissão',
    title: 'Seis cilindros contrapostos aspirados a 9.000 rpm.',
    body: 'O motor Boxer 4.0 litros naturalmente aspirado entrega resposta imediata com comandos de válvulas derivados das pistas e borboletas individuais de admissão. Acoplado ao câmbio PDK de 7 marchas com relação final encurtada, leva o GT3 RS de 0 a 100 km/h em 3,2 segundos.',
    metrics: [
      { label: 'Potência Máxima', value: '525 cv @ 8.500 rpm' },
      { label: 'Torque Máximo', value: '465 Nm @ 6.300 rpm' },
      { label: '0–100 km/h', value: '3,2 s' },
    ],
    image: IMAGES.engine,
    imageAlt: 'Admissão de motor traseira e escapamento central em titânio do Porsche 911 GT3 RS',
  },
  {
    id: 'chassis-safety',
    index: '03',
    kicker: 'Chassi, Freios & Segurança',
    title: 'Precisão de suspensão com braços aerodinâmicos.',
    body: 'A suspensão dianteira double-wishbone utiliza braços em formato de gota que contribuem com 40 kg adicionais de carga aerodinâmica no eixo frontal. A frenagem fica a cargo dos discos cerâmicos PCCB de 410 mm na dianteira e 390 mm na traseira, combinados ao eixo traseiro direcional e ao Porsche Stability Management (PSM) ajustável.',
    metrics: [
      { label: 'Discos Dianteiros PCCB', value: '410 mm · 6 pistões' },
      { label: 'Discos Traseiros PCCB', value: '390 mm · 4 pistões' },
      { label: 'Peso em Ordem de Marcha (DIN)', value: '1.450 kg' },
    ],
    image: IMAGES.wheel,
    imageAlt: 'Roda forjada em magnésio e freio cerâmico PCCB com pinça amarela de 6 pistões',
  },
];

export const HERO_METRICS = [
  { target: 525, decimals: 0, suffix: ' cv', label: 'Potência a 8.500 rpm' },
  { target: 3.2, decimals: 1, suffix: ' s', label: 'Aceleração 0–100 km/h' },
  { target: 860, decimals: 0, suffix: ' kg', label: 'Downforce a 285 km/h' },
  { target: 9000, decimals: 0, suffix: ' rpm', label: 'Rotação máxima do Boxer' },
];

export const SPEC_CATEGORIES: SpecCategory[] = [
  {
    id: 'engine',
    index: '01',
    title: 'Motorização & Transmissão',
    rows: [
      { label: 'Arquitetura', value: '6 cilindros Boxer, naturalmente aspirado' },
      { label: 'Cilindrada', value: '3.996 cm³ (4,0 litros)' },
      { label: 'Potência máxima', value: '525 cv (386 kW) @ 8.500 rpm' },
      { label: 'Torque máximo', value: '465 Nm @ 6.300 rpm' },
      { label: 'Rotação máxima (corte)', value: '9.000 rpm' },
      { label: 'Transmissão', value: 'PDK de 7 marchas (dupla embreagem)' },
      { label: 'Tração', value: 'Traseira (RWD) com PTV Plus' },
    ],
  },
  {
    id: 'performance',
    index: '02',
    title: 'Desempenho & Aerodinâmica',
    rows: [
      { label: 'Aceleração 0–100 km/h', value: '3,2 segundos' },
      { label: 'Velocidade máxima', value: '296 km/h (em pista)' },
      { label: 'Downforce a 200 km/h', value: '409 kg' },
      { label: 'Downforce a 285 km/h', value: '860 kg' },
      { label: 'Asa traseira', value: 'Bipartida swan-neck com DRS hidráulico' },
      { label: 'Pneus dianteiros', value: '275/35 ZR20' },
      { label: 'Pneus traseiros', value: '335/30 ZR21' },
    ],
  },
  {
    id: 'dimensions',
    index: '03',
    title: 'Dimensões, Peso & Capacidades',
    rows: [
      { label: 'Comprimento', value: '4.572 mm' },
      { label: 'Largura (sem / com espelhos)', value: '1.900 mm / 2.027 mm' },
      { label: 'Altura', value: '1.322 mm' },
      { label: 'Entre-eixos', value: '2.457 mm' },
      { label: 'Bitola (dianteira / traseira)', value: '1.630 mm / 1.582 mm' },
      { label: 'Peso em ordem de marcha (DIN / EU)', value: '1.450 kg / 1.525 kg' },
      { label: 'Tanque de combustível', value: '64 litros' },
      {
        label: 'Porta-malas dianteiro',
        value: 'Ocupado pelo radiador central S-Duct',
        note: 'Armazenamento interno disponível atrás dos bancos dianteiros.',
      },
    ],
  },
  {
    id: 'efficiency-safety',
    index: '04',
    title: 'Consumo, Equipamentos & Segurança',
    rows: [
      { label: 'Combustível recomendado', value: 'Gasolina Premium (98 RON / Super Plus)' },
      { label: 'Consumo combinado (WLTP)', value: '13,4 L/100 km' },
      { label: 'Consumo combinado (NEDC)', value: '12,7 L/100 km' },
      { label: 'Emissões de CO₂ (WLTP)', value: '305 g/km (Euro 6d-ISC-FCM)' },
      {
        label: 'Sistema de freios (PCCB)',
        value: 'Discos cerâmicos 410 mm (diant.) / 390 mm (tras.)',
      },
      {
        label: 'Segurança e assistência',
        value: 'PSM calibrável, PTV+, eixo traseiro direcional, células em CFRP/alumínio e 6 airbags',
      },
      {
        label: 'Pacote Weissach',
        value: 'Capô, teto, asa e barras estabilizadoras em CFRP; rodas forjadas em magnésio',
      },
    ],
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-hero',
    title: 'Perspectiva 3/4 em Estúdio',
    caption: 'Ice Grey Metallic com pacote aerodinâmico integral Weissach.',
    category: 'exterior',
    categoryLabel: 'Exterior',
    image: IMAGES.hero,
    alt: 'Porsche 911 GT3 RS 2024 em perspectiva três quartos dianteira',
    aspect: 'wide',
  },
  {
    id: 'gal-front',
    title: 'Arquitetura Frontal & S-Duct',
    caption: 'Fluxo central de arrefecimento e assinatura LED Matrix.',
    category: 'exterior',
    categoryLabel: 'Exterior',
    image: IMAGES.front,
    alt: 'Vista frontal simétrica do Porsche 911 GT3 RS 2024',
    aspect: 'square',
  },
  {
    id: 'gal-side',
    title: 'Perfil Aerodinâmico 992',
    caption: 'Linha de teto com defletores térmicos e proporções alargadas.',
    category: 'exterior',
    categoryLabel: 'Exterior',
    image: IMAGES.side,
    alt: 'Perfil lateral completo do Porsche 911 GT3 RS 2024',
    aspect: 'square',
  },
  {
    id: 'gal-rear',
    title: 'Traseira Larga & Asa DRS',
    caption: 'Faixa LED contínua sob o conjunto bipartido swan-neck.',
    category: 'exterior',
    categoryLabel: 'Exterior',
    image: IMAGES.rear,
    alt: 'Vista traseira três quartos do Porsche 911 GT3 RS 2024',
    aspect: 'wide',
  },
  {
    id: 'gal-interior',
    title: 'Cabine Race-Tex & Fibra de Carbono',
    caption: 'Posto de condução com 4 seletores de chassi diretamente no volante.',
    category: 'interior',
    categoryLabel: 'Interior',
    image: IMAGES.interior,
    alt: 'Cabine completa do Porsche 911 GT3 RS com volante Race-Tex e painel central',
    aspect: 'wide',
  },
  {
    id: 'gal-wheel',
    title: 'Magnésio Forjado & Freio PCCB',
    caption: 'Pinças de 6 pistões em discos cerâmicos de 410 mm com cubo rápido.',
    category: 'detalhes',
    categoryLabel: 'Detalhes',
    image: IMAGES.wheel,
    alt: 'Close-up da roda forjada Satin Black e freio cerâmico amarelo PCCB',
    aspect: 'square',
  },
  {
    id: 'gal-wing',
    title: 'Atuador Hidráulico DRS',
    caption: 'Suportes swan-neck usinados em alumínio e lâminas em CFRP.',
    category: 'detalhes',
    categoryLabel: 'Detalhes',
    image: IMAGES.wing,
    alt: 'Detalhe estrutural da asa traseira swan-neck com atuador hidráulico DRS',
    aspect: 'square',
  },
  {
    id: 'gal-engine',
    title: 'Escapamento em Titânio & Difusor',
    caption: 'Saída central dupla e aletas traseiras em fibra de carbono.',
    category: 'detalhes',
    categoryLabel: 'Detalhes',
    image: IMAGES.engine,
    alt: 'Detalhe do difusor traseiro em carbono e escapamento central em titânio',
    aspect: 'square',
  },
];
