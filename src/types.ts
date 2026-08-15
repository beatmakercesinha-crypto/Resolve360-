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

export interface AIDiagnosisResult {
  id: string;
  problemSummary: string;
  probableCause: string;
  riskLevel: 'Baixo' | 'Médio' | 'Alto' | 'Crítico';
  requiredParts: { name: string; estimatedPrice: number; category: string }[];
  suggestedAction: string;
  estimatedLaborCost: number;
  estimatedDuration: string;
  category: string;
  timestamp: string;
}

export interface TechnicianLocation {
  technicianId: string;
  name: string;
  photoUrl?: string;
  role: string;
  vehicle: string;
  plate: string;
  rating: number;
  phone: string;
  currentLat: number;
  currentLng: number;
  destinationLat: number;
  destinationLng: number;
  destinationNeighborhood: string;
  estimatedArrivalMinutes: number;
  status: 'A caminho' | 'Chegando em 5 min' | 'No local' | 'Em atendimento';
  currentRouteStep: string;
}

export interface CircuitLog {
  id: string;
  number: number;
  label: string;
  amperage: string;
  voltage: '220V' | '110V';
  status: 'Operacional' | 'Atenção' | 'Revisado';
  lastInspection: string;
}

export interface HomePassportData {
  propertyId: string;
  ownerName: string;
  address: string;
  neighborhood: string;
  city: string;
  propertyType: 'Casa' | 'Apartamento' | 'Comércio';
  qrCodeUrl: string;
  circuits: CircuitLog[];
  wifiNodes: { name: string; model: string; location: string; status: 'Excelente' | 'Bom' }[];
  securityDevices: { type: string; model: string; location: string }[];
  solarSystem?: { panelsCount: number; powerKwp: number; lastCleaning: string; healthPercent: number };
  warrantyExpiry: string;
  warrantyActive: boolean;
  serviceHistoryCount: number;
}

export interface MaintenancePlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  annualDiscountPrice: number;
  popular?: boolean;
  features: string[];
  seasonalPerks: string[];
  recommendedFor: string;
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

export interface WarrantyInspectionChecklist {
  bookingId: string;
  clientName: string;
  technicianName: string;
  date: string;
  items: { id: string; label: string; checked: boolean }[];
  clientSignatureName: string;
  signedAt?: string;
  warrantyCertificateCode: string;
  status: 'Pendente' | 'Assinado e Válido';
}

