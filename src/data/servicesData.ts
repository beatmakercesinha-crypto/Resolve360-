import { ServiceItem, PricingRecord } from '../types';

export const WHATSAPP_NUMBER = '5551982330934';
export const WHATSAPP_DISPLAY = '(51) 98233-0934';
export const DEFAULT_CITY = 'Pelotas';

export const SERVICES_CATALOG: ServiceItem[] = [
  {
    id: 'eletrica',
    title: 'Elétrica Residencial',
    category: 'Elétrica',
    iconName: 'Zap',
    description: 'Tomadas, interruptores, chuveiros, iluminação, disjuntores, troca de fiação e quadros elétricos.',
    priceText: 'A partir de R$ 99',
    priceSubtext: 'mão de obra estimada',
    tags: ['Tomadas', 'Chuveiro', 'Luminárias', 'Disjuntores']
  },
  {
    id: 'internet',
    title: 'Internet & Wi-Fi',
    category: 'Internet e Wi-Fi',
    iconName: 'Wifi',
    description: 'Configuração de roteadores, cabeamento estruturado CAT6, pontos de rede e sistemas Wi-Fi Mesh.',
    priceText: 'A partir de R$ 150',
    priceSubtext: 'conforme serviço',
    tags: ['Wi-Fi Mesh', 'Pontos de Rede', 'Roteador']
  },
  {
    id: 'telecom',
    title: 'Telecom & Interfonia',
    category: 'Telecom',
    iconName: 'Radio',
    description: 'Antenas digitais/satélite, interfone residencial e predial, fibra óptica e vídeo porteiro smart.',
    priceText: 'A partir de R$ 150',
    priceSubtext: 'instalação básica',
    tags: ['Interfone', 'Vídeo Porteiro', 'Antenas']
  },
  {
    id: 'seguranca',
    title: 'Segurança Eletrônica',
    category: 'Segurança',
    iconName: 'Video',
    description: 'Câmeras de monitoramento (CFTV/IP/Wi-Fi), centrais de alarme, sensores perimetrais e fechaduras digitais.',
    priceText: 'A partir de R$ 180',
    priceSubtext: 'por instalação',
    tags: ['Câmeras Wi-Fi', 'Fechadura Digital', 'Alarmes']
  },
  {
    id: 'solar',
    title: 'Energia Solar',
    category: 'Energia Solar',
    iconName: 'Sun',
    description: 'Projetos fotovoltaicos, instalação de painéis solares, homologação, manutenção preventiva e limpeza.',
    priceText: 'Sob orçamento',
    priceSubtext: 'avaliação técnica no local',
    tags: ['Fotovoltaico', 'Manutenção', 'Economia na Conta']
  },
  {
    id: 'automacao',
    title: 'Automação Residencial',
    category: 'Automação',
    iconName: 'Home',
    description: 'Tomadas e interruptores inteligentes, iluminação inteligente, sensores de presença e integração com Alexa/Google Home.',
    priceText: 'A partir de R$ 129',
    priceSubtext: 'por dispositivo configurado',
    tags: ['Alexa', 'Smart Home', 'Controle por Voz']
  },
  {
    id: 'carro-eletrico',
    title: 'Carregador de Carro Elétrico',
    category: 'Carregador de carro elétrico',
    iconName: 'BatteryCharging',
    description: 'Instalação de Wallbox, dimensionamento de carga, proteção DPS/DR e infraestrutura elétrica dedicada.',
    priceText: 'Sob orçamento',
    priceSubtext: 'avaliação técnica com laudo',
    tags: ['Wallbox', 'Carregador EV', 'Infraestrutura']
  },
  {
    id: 'tecnologia',
    title: 'Tecnologia & Áudio/Vídeo',
    category: 'Tecnologia',
    iconName: 'Tv',
    description: 'Instalação de TV na parede com suporte articulado, Home Theater, sonorização ambiente e projetores.',
    priceText: 'A partir de R$ 100',
    priceSubtext: 'instalação básica de suporte',
    tags: ['Suporte TV', 'Home Theater', 'Passagem de Cabos']
  },
  {
    id: 'geral',
    title: 'Chama que a gente resolve',
    category: 'Outro serviço',
    iconName: 'Wrench',
    description: 'Pequenos reparos residenciais, montagem especializada, diagnóstico de panes e serviços sob medida.',
    priceText: 'Sob avaliação',
    priceSubtext: 'conte seu problema para nós',
    tags: ['Pequenos Reparos', 'Diagnóstico', 'Soluções Gerais']
  }
];

export const INITIAL_PRECOS: Record<string, PricingRecord> = {
  tomada: {
    id: 'tomada',
    nome: 'Instalação de tomada',
    custo: 60,
    cliente: 119,
    categoria: 'Elétrica'
  },
  interruptor: {
    id: 'interruptor',
    nome: 'Instalação de interruptor',
    custo: 60,
    cliente: 119,
    categoria: 'Elétrica'
  },
  luminaria: {
    id: 'luminaria',
    nome: 'Instalação de luminária',
    custo: 80,
    cliente: 159,
    categoria: 'Elétrica'
  },
  disjuntor: {
    id: 'disjuntor',
    nome: 'Instalação/troca de disjuntor',
    custo: 90,
    cliente: 179,
    categoria: 'Elétrica'
  },
  chuveiro: {
    id: 'chuveiro',
    nome: 'Instalação de chuveiro',
    custo: 120,
    cliente: 229,
    categoria: 'Elétrica'
  },
  ventilador: {
    id: 'ventilador',
    nome: 'Instalação de ventilador de teto',
    custo: 120,
    cliente: 239,
    categoria: 'Elétrica'
  },
  wifi: {
    id: 'wifi',
    nome: 'Configuração Wi-Fi / Mesh',
    custo: 100,
    cliente: 199,
    categoria: 'Internet e Wi-Fi'
  },
  rede: {
    id: 'rede',
    nome: 'Ponto de rede cabeada CAT6',
    custo: 100,
    cliente: 199,
    categoria: 'Internet e Wi-Fi'
  },
  camera: {
    id: 'camera',
    nome: 'Instalação de câmera de segurança',
    custo: 150,
    cliente: 299,
    categoria: 'Segurança'
  },
  fechadura: {
    id: 'fechadura',
    nome: 'Instalação de fechadura digital smart',
    custo: 130,
    cliente: 249,
    categoria: 'Segurança'
  },
  automacao: {
    id: 'automacao',
    nome: 'Tomada / interruptor inteligente',
    custo: 70,
    cliente: 149,
    categoria: 'Automação'
  },
  suporte_tv: {
    id: 'suporte_tv',
    nome: 'Instalação de TV em suporte de parede',
    custo: 70,
    cliente: 149,
    categoria: 'Tecnologia'
  }
};

export function formatCurrencyBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

export function openWhatsAppChat(message: string): void {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}
