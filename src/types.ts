export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  description: string;
  priceText: string;
  priceSubtext: string;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
}

export interface PricingRecord {
  id: string;
  nome: string;
  custo: number;
  cliente: number;
  categoria?: string;
}

export interface ServiceRequest {
  id: string;
  nome: string;
  telefone: string;
  userEmail?: string;
  categoria: string;
  servicoId?: string;
  cidade: string;
  bairro: string;
  endereco?: string;
  descricao: string;
  urgencia?: 'normal' | 'urgente' | 'agendamento';
  dataCriacao: string;
  dataAgendada?: string;
  horarioAgendado?: string;
  tecnicoResponsavel?: string;
  status: 'Pendente' | 'Em Triagem' | 'Técnico Designado' | 'Concluído' | 'Cancelado';
  avaliacao?: {
    nota: number;
    comentario?: string;
    data: string;
  };
}

export interface Review {
  id: string;
  serviceId: string;
  serviceTitle: string;
  userName: string;
  userEmail: string;
  rating: number; // 1 to 5
  comment: string;
  bairro: string;
  cidade: string;
  data: string;
  recomenda: boolean;
  respostaResolve360?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  neighborhood: string;
  address?: string;
  cep?: string;
  notifications: {
    whatsapp: boolean;
    email: boolean;
    sms: boolean;
  };
  savedProperties?: {
    tipo: 'Casa' | 'Apartamento' | 'Comércio';
    voltagem: '110V' | '220V' | 'Bivolt';
    possuiSolar: boolean;
    tipoInternet: string;
  };
  createdAt: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  category: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "08:30 - 11:30 (Manhã)"
  address: string;
  neighborhood: string;
  city: string;
  notes?: string;
  status: 'Confirmado' | 'A caminho' | 'Concluído' | 'Cancelado';
  technicianName: string;
  technicianPhone: string;
  estimatedPrice: number;
  createdAt: string;
  rating?: number;
  reviewComment?: string;
}

